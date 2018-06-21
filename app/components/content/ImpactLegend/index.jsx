import React from "react";

import CircleSVG from "components/svg/Circle";
import buckets from "resources/buckets.json";

import "./style.scss";
import "../style.scss";

const colors = {
  overall: "#F9781C",
  hum: "#DB1469",
  wee: "#129EAD",
  srmh: "#FF595A",
  lffv: "#FFB403",
  fnscc: "#99B74D",
  default: "#B3B1AF",
};

class ImpactLegend extends React.Component {
  render() {
    return (<div id="legend-impact">
      <ul>
        <li>Number of impacts</li>
        <li>
          <ul className="legend-cluster">
            <li>
              <div className="marker-icon -less">0</div> Less than 10
            </li>
            <li>
              <div className="marker-icon -more">10</div> 10 or more
            </li>
          </ul>
        </li>
        <li>Type of impacts</li>
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
        <li className="about-button">
          <button className="secondary" onClick={this.props.handleAboutClick}>
            About Data
          </button>
        </li>
      </ul>
    </div>);
  }
}

export default ImpactLegend;
