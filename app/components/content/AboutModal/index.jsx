import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getLastYear, getIntroMessage } from "lib/remote";
import momImage from "images/mom.png";
import careImage from "images/care2.png";
import careMomImage from "images/caremom.png";

import "./style.scss";

class AboutContent extends React.Component {

  static propTypes = {
    handleClose: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = {
      year: "",
      message: "",
    };
  }

  componentDidMount() {
    getLastYear()
      .then(year =>
        getIntroMessage(year)
        .then(message => this.setState({
          message, year })));
  }

  render() {
    const { year, message } = this.state;
    const { handleClose } = this.props;

    return (<div id="about">
      <div className="left">
        <img src={momImage} alt="Mom" className="img-mom" />
      </div>
      <div className="right">
        <div className="wrapper">
          <img src={careImage} alt="CARE" className="img-care" />
          <img src={careMomImage} alt="CARE" className="img-care-mom" />
          <div dangerouslySetInnerHTML={{__html: message}} />
        </div>
        <button className="primary" onClick={handleClose}>
          <Link to={`/reach/countries/${year}?`}>
              Discover more data
          </Link>
        </button>
      </div>
    </div>);
  }
}

export default AboutContent;
