import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import Tile from "/@components/@core/tile";
import { ROLES } from "/@utils/constants";

export default class IndexPage extends Component {
  render() {
    return (
      <Layout roles={[ROLES.FARMER]}>
        <SEO title="Farmer" />
        <h1 className="eco--title">Actions</h1>
        <div className="bx--row">
          <Tile title="Collect" description="Example" to="" />
        </div>
      </Layout>
    );
  }
}
