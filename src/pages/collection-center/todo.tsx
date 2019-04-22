import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import { ROLES } from "/@utils/constants";

export default class TodoPage extends Component {
  render() {
    return (
      <Layout roles={[ROLES.UNAUTHORIZED]}>
        <h1 className="eco--title">TODO</h1>
      </Layout>
    );
  }
}
