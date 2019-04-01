import "/@styles/slate.scss";

import React, { Component } from "react";

export default class PageUnauthorized extends Component {
  render() {
    return (
      <div className="slate">
        <div className="emoji">✋</div>
        <h1>
          <span>401</span> UNAUTHORIZED
        </h1>
        <p>Please login or switch user to access page</p>
      </div>
    );
  }
}
