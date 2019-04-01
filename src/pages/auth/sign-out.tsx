import React, { Component } from "react";

import { AuthStore } from "/@stores/auth.store";

export default class SignOutPage extends Component {
  authStore = new AuthStore();

  componentDidMount() {
    this.authStore.signOut();
  }
  render() {
    return <div>Signing out...</div>;
  }
}
