import React from "react";

import CircleSVG from "components/svg/Circle";
import buckets from "resources/buckets.json";

import "./style.scss";
import "../style.scss";

class ImpactLegend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.toggleLegend = this.toggleLegend.bind(this);
  }

  toggleLegend() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (<div id="legend-impact">
      <button className="legend-collapse" onClick={this.toggleLegend}>{this.state.collapse ? 'Show legend' : 'Hide legend'}</button>
      {!this.state.collapse && <ul>
        <li>Areas of impacts</li>
        {/*<li>
          <ul>
            <li>
              <CircleSVG size={15} /> Qualitative
            </li>
            <li>
              <CircleSVG size={15} /> Quantitative
            </li>
          </ul>
        </li>*/}
        <li>
          <ul className="vertical-legend">
            <li><CircleSVG program="hum" size={15} /><span>Humanitarian response</span></li>
            <li><CircleSVG program="wee" size={15} /><span>Women's economic empowerment</span></li>
            <li><CircleSVG program="srmh" size={15} /><span>The right to sexual, reproductive and maternal health</span></li>
            <li><CircleSVG program="lffv" size={15} /><span>The right to a life free from violence</span></li>
            <li><CircleSVG program="fnscc" size={15} /><span>Food and nutrition security and climate change resilience</span></li>
          </ul>
        </li>
        <li>Population impacted (quantitative)</li>
        <li>
          <ul className="legend">
            <li>
              1
            </li>
            {buckets.impact.map((bucket, n) => (<li key={n}>
              <CircleSVG size={bucket[2]/2} />
            </li>))}
            <li>
              1M population impacted
            </li>
          </ul>
        </li>
        <li>Number of impact stories</li>
        <li>
          <ul className="legend-cluster">
            <li>
              <div className="marker-icon -less"></div> Less than 10
            </li>
            <li>
              <div className="marker-icon -more"></div> 10 or more
            </li>
          </ul>
        </li>
        <li className="about-button">
          <button className="secondary" onClick={this.props.handleAboutClick}>
            About Data
          </button>
        </li>
      </ul>}
    </div>);
  }
}

export default ImpactLegend;
