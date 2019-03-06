import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";

import ImpactLegend from "components/content/ImpactLegend";
import StorySummary from "components/elements/StorySummary";
import CircleSVG from "components/svg/Circle";
// import RhombusSVG from "components/svg/Rhombus";
import { PruneCluster, PruneClusterForLeaflet } from 'exports-loader?PruneCluster,PruneClusterForLeaflet!prunecluster/dist/PruneCluster.js';
import { logEvent } from 'utils/analytics';

const getSVGIcon = (SVGComponent, props) => {
  let { value, program, size, hideLabel } = props;
  let label = value && value.toLocaleString();
  let component = (<SVGComponent shadow program={program} label={label} hideLabel={hideLabel} size={size} />);
  let html = ReactDOMServer.renderToString(component);

  return window.L.divIcon({
    html: html,
    iconSize: size,
    iconAnchor: [size / 2, size / 2],
  });
};

const getSVGStoryIcon = (SVGComponent, props) => {
  let { value, program, size, hideLabel } = props;
  let label = value && value.toLocaleString();
  let component = (<SVGComponent shadow program={program} label={label} hideLabel={hideLabel} size={size} bordered />);
  let html = ReactDOMServer.renderToString(component);

  return window.L.divIcon({
    html: html,
    iconSize: size,
    iconAnchor: [size / 2, size / 2],
  });
};

class ImpactMapArea extends React.Component {

  static propTypes = {
    program: PropTypes.string,
    regions: PropTypes.array,
    storiesByCountry: PropTypes.array,
    handleMapChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    program: "overall",
    regions: [],
    storiesByCountry: [],
  }

  static contextTypes = {
    map: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      tooltip: null,
    };
  }

  getPopup(story) {
    const component = (<StorySummary story={story} router={this.context.router} />);
    const html = ReactDOMServer.renderToString(component);
    // return html;
    logEvent('Impact', 'story', story.country);

    return window.L.popup({
      minWidth: 290,
      minHeight: 100,
      className: "custom-tooltip",
    }).setContent(html);
  }


  initMarkers() {
    const {
      program,
      story: currentStory,
      region,
      country,
      regions,
      storiesByCountry,
      handleMapChange,
    } = this.props;

    // Quantitative Markers
    this.quantitativeMarkers = window.L.layerGroup(
      regions
      .filter((region) => region[`${program}_impact`] && !currentStory)
      .map((region) => {
        let marker =  window.L.marker([region.region_center_y, region.region_center_x], {
          icon: getSVGIcon(CircleSVG, {
            value: region[`${program}_impact`],
            program: program,
            size: region[`${program}_size`],
            label: region.region || region.country,
          }),
          zIndexOffset: -200,
        }).on("click", () => {
          handleMapChange(region.region, region.country);
        });

        marker.on("mouseover", (e) => {
          let target = e.originalEvent.target;
          if (target.tagName === "circle") {
            let {
              left,
              top,
              width,
            } = target.parentNode.parentNode.getBoundingClientRect();

            this.setState({
              tooltip: {
                left: left + width / 2,
                top: top,
                label: `${region.region || region.country}: ${region[`${program}_impact`].toLocaleString()}`,
              },
            });
          }
        });

        marker.on("mouseout", (e) => {
          let target = e.originalEvent.target;
          if (target.tagName === "circle") {
            this.setState({
              tooltip: null,
            });
          }
        });

        return marker;
      })
    );

    // Qualitative Markers
    const pruneCluster = new PruneClusterForLeaflet();

    this.pruneCluster = pruneCluster;

    pruneCluster.Cluster.Size = 50;

    // Open cluster on click and avoid to bounds on zoom
    pruneCluster.BuildLeafletCluster = function(cluster, position) {
      var m = new L.Marker(position, {
        icon: pruneCluster.BuildLeafletClusterIcon(cluster)
      });

      m.on('click', function(e) {
        // Compute the  cluster bounds (it's slow : O(n))
        var markersArea = pruneCluster.Cluster.FindMarkersInArea(cluster.bounds);

        if (!region && !country) return handleMapChange(markersArea[0].data.region);

        // Open spider
        pruneCluster._map.fire('overlappingmarkers', {
          cluster: pruneCluster,
          markers: markersArea,
          center: m.getLatLng(),
          marker: m
        });
      });

      return m;
    };

    storiesByCountry
      .filter((story) => (program === "overall" || story.outcomes.includes(program)) && (!currentStory || currentStory === story.story_number))
      .filter((story) => {
        if (region && !country) return story.region === region;
        if (country) return story.country === country;
        return true;
      })
      .forEach((story) => {
        const regionsCoordinates = regions.find(r => r.region === story.region) || {};
        const { coordinates } = (!region && !country) ?
          { coordinates: [regionsCoordinates.region_center_x, regionsCoordinates.region_center_y] } :
          JSON.parse(story.country_centroid);
        const marker = new PruneCluster.Marker(coordinates[1], coordinates[0]);
        const popUpHtml = this.getPopup(story) || '';
        marker.data.region = story.region;
        marker.data.country = story.country;
        marker.data.icon = getSVGStoryIcon(CircleSVG, {
          program: program === 'overall' ? story.outcomes[0] : program,
          size: 18,
        });
        marker.data.popup = popUpHtml;
        pruneCluster.RegisterMarker(marker);
      });

    this.qualitativeMarkers = window.L.layerGroup([pruneCluster]);

    // Adding to map
    this.context.map.addLayer(this.quantitativeMarkers);
    this.context.map.addLayer(this.qualitativeMarkers);
  }

  destroyMarkers() {
    if (this.pruneCluster) this.pruneCluster.RemoveMarkers();

    this.context.map.removeLayer(this.quantitativeMarkers);
    this.quantitativeMarkers = null;

    this.context.map.removeLayer(this.qualitativeMarkers);
    this.qualitativeMarkers = null;
  }

  componentDidMount() {
    this.initMarkers();

    // Fix for pop-up in zoom level change
    this.context.map.on('zoomend', () => {
      this.destroyMarkers();
      this.initMarkers();
    });
  }

  componentWillUnmount() {
    this.destroyMarkers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.regions !== this.props.regions) {
      this.destroyMarkers();
      this.initMarkers();
    }
  }

  componentWillReceiveProps() {
    this.setState({
      tooltip: null,
    });
  }

  render() {
    return (<div className="map-area-content">
      <div id="legend" className="impact">
        <ImpactLegend program={this.props.program} />
      </div>
      {this.state.tooltip && (<div className="custom-tooltip-wrapper" style={{
        left: this.state.tooltip.left,
        top: this.state.tooltip.top,
      }}>
        <div className="custom-tooltip">
          {this.state.tooltip.label}
          <div className="leaflet-popup-tip-container">
            <div className="leaflet-popup-tip" />
          </div>
        </div>
      </div>)}
    </div>);
  }

}

export default ImpactMapArea;
