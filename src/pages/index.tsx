import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import { ROLES } from "/@utils/constants";

export default class IndexPage extends Component {
  render() {
    return (
      <Layout roles={[ROLES.UNAUTHORIZED]}>
        <h1 className="eco--title">🏠 Cropcert Landing Page</h1>
      </Layout>
    );
  }
}
