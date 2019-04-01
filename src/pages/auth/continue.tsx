import React, { Component } from "react";

import { AuthStore } from "/@stores/auth.store";

export default class AuthContinue extends Component {
  authStore = new AuthStore();
  render() {
    this.authStore.continue();
    return <h3>Please wait...</h3>;
  }
}
