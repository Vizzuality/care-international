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
      {!this.state.collapse && <div className="legend-impact-wrapper">
        <ul>
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
          <li>Areas of impacts stories</li>
          <li>
            <ul className="legend-cluster -vertical">
              {/*{(program === 'overall' || program === 'hum') &&
                <li><div className={`marker-icon -one hum`}></div><span>Humanitarian response story</span></li>}
              {(program === 'overall' || program === 'wee') &&
                <li><div className={`marker-icon -one wee`}></div><span>Women's economic empowerment story</span></li>}
              {(program === 'overall' || program === 'srmh') &&
                <li><div className={`marker-icon -one srmh`}></div><span>The right to sexual, reproductive and maternal health story</span></li>}
              {(program === 'overall' || program === 'lffv') &&
                <li><div className={`marker-icon -one lffv`}></div><span>The right to a life free from violence story</span></li>}
              {(program === 'overall' || program === 'fnscc') &&
                <li><div className={`marker-icon -one fnscc`}></div><span>Food and nutrition security and climate change resilience story</span></li>}*/}
              <li>
                <div className="marker-icon -less"></div> More than 1 story
              </li>
            </ul>
          </li>
          <li className="about-button">
            <button className="secondary" onClick={this.props.handleAboutClick}>
              About Data
            </button>
          </li>
        </ul>
      </div>}
    </div>);
  }
}

export default ImpactLegend;
