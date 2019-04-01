import React, { Component } from "react";

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="slate">
        <div className="emoji">🙁</div>
        <h1>
          <span>404</span> NOT FOUND
        </h1>
        <p>Sorry, We couldn't find that page.</p>
      </div>
    );
  }
}
