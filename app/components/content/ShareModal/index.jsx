import React from "react";
import copy from "copy-to-clipboard";

import { logEvent } from "utils/analytics";

import "./style.scss";
import "../style.scss";

class ShareContent extends React.Component {

  constructor(...args) {
    super(...args);
    this.url = window.location;
  }
  componentDidMount() {
    logEvent('Share', 'Share url', this.url);
  }
  copyTextArea() {
    copy(this.url);
  }

  render() {
    return (<div id="share" className="modal-content">
      <h1>
        Share Content
      </h1>
      <hr />
      <p>
        Copy the link below to share it
      </p>
      <div className="container">
        <textarea value={this.url} readOnly />
        <button className="primary" onClick={this.copyTextArea.bind(this)}>
          share
        </button>
      </div>
    </div>);
  }
}

export default ShareContent;
