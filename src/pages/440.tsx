import { Link } from "gatsby";
import React, { Component } from "react";

export default class SessionExpired extends Component {
  render() {
    return (
      <div className="slate">
        <div className="emoji">🙁</div>
        <h1>
          <span>440</span> SESSION EXPIRED
        </h1>
        <p>
          Your session ended because there was no activity, Click
          <Link to="/auth/sign-out"> here</Link> to go back to home page
        </p>
      </div>
    );
  }
}
