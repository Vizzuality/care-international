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
    const { program } = this.props;

    return (<div id="legend-impact">
      <button className="legend-collapse" onClick={this.toggleLegend}>{this.state.collapse ? 'Show legend' : 'Hide legend'}</button>
      {!this.state.collapse && <ul>
        <li>Areas of impacts stories</li>
        <li>
          <ul className="legend-cluster -vertical">
            {(program === 'overall' || program === 'hum') &&
              <li><div className={`marker-icon -one hum`}></div><span>Humanitarian response stories</span></li>}
            {(program === 'overall' || program === 'wee') &&
              <li><div className={`marker-icon -one wee`}></div><span>Women's economic empowerment stories</span></li>}
            {(program === 'overall' || program === 'srmh') &&
              <li><div className={`marker-icon -one srmh`}></div><span>The right to sexual, reproductive and maternal health stories</span></li>}
            {(program === 'overall' || program === 'lffv') &&
              <li><div className={`marker-icon -one lffv`}></div><span>The right to a life free from violence stories</span></li>}
            {(program === 'overall' || program === 'fnscc') &&
              <li><div className={`marker-icon -one fnscc`}></div><span>Food and nutrition security and climate change resilience stories</span></li>}
            <li>
              <div className="marker-icon -less"></div> More than 1 story
            </li>
          </ul>
        </li>
        {/*<li>Areas of impacts stories</li>
        <li>
          <ul className="vertical-legend">
            {(program === 'overall' || program === 'hum') && <li><CircleSVG program="hum" size={15} /><span>Humanitarian response stories</span></li>}
            {(program === 'overall' || program === 'wee') && <li><CircleSVG program="wee" size={15} /><span>Women's economic empowerment stories</span></li>}
            {(program === 'overall' || program === 'srmh') && <li><CircleSVG program="srmh" size={15} /><span>The right to sexual, reproductive and maternal health stories</span></li>}
            {(program === 'overall' || program === 'lffv') && <li><CircleSVG program="lffv" size={15} /><span>The right to a life free from violence stories</span></li>}
            {(program === 'overall' || program === 'fnscc') && <li><CircleSVG program="fnscc" size={15} /><span>Food and nutrition security and climate change resilience stories</span></li>}
          </ul>
        </li>*/}
        <li>Population impacted (quantitative)</li>
        <li>
          <ul className="legend">
            <li>
              1
            </li>
            {buckets.impact.map((bucket, n) => (<li key={n}>
              <CircleSVG program={program} size={bucket[2]/2} />
            </li>))}
            <li>
              1M population impacted
            </li>
          </ul>
        </li>
        {/*<li>Number of impact stories</li>
        <li>
          <ul className="legend-cluster">
            <li>
              <div className={`marker-icon -one ${program}`}></div> Story
            </li>
            <li>
              <div className="marker-icon -less"></div> More than 1
            </li>
          </ul>
        </li>*/}
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
