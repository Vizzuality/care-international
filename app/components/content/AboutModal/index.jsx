import React from "react";
import PropTypes from "prop-types";

import momImage from "images/mom.png";
import careImage from "images/care2.png";
import careMomImage from "images/caremom.png";

import "./style.scss";

class AboutContent extends React.Component {

  static propTypes= {
    handleClose: PropTypes.func.isRequired,
  };

  render() {
    return (<div id="about">
      <div className="left">
        <img src={momImage} alt="Mom" className="img-mom" />
      </div>
      <div className="right">
        <div className="wrapper">
          <img src={careImage} alt="CARE" className="img-care" />
          <img src={careMomImage} alt="CARE" className="img-care-mom" />
          <p>
            In 2017, CARE and partners worked in 93 countries around the world to reach nearly 63 million people directly through 950 development and humanitarian aid projects. CARE also reached 216 million people indirectly through its advocacy efforts, the replication of successful programs and scale-up of innovations.
          </p>
          <p>
            As part of our <a target="_blank" href="https://insights.careinternational.org.uk/media/k2/attachments/CARE_2020_Program_Strategy-English.pdf">2020 Program Strategy goals</a>, CARE is committed to gathering evidence on lasting changes taking place in the lives of people living in poverty. To do this, we are tracking a set of 25 global indicators of change between 2014 and 2020. At present, we have been able to gather evidence in 72 countries so far. The data shows that CARE has contributed to significant improvements for over 34 million people in those countries.
          </p>
          <p>
            CARE is one of the leaders among international NGOs in comprehensively reporting the impact of its work around the world. Despite our best efforts to gather information across more than 1,000 projects in over 90 countries, some of the data presented may be incomplete.
          </p>
        </div>
        <button className="primary" onClick={this.props.handleClose}>
          Discover more data
        </button>
      </div>
    </div>);
  }
}

export default AboutContent;
