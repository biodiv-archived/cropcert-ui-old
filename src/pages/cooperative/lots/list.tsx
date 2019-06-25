import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import CoopLotListComponent from "/@components/cooperative/lot/list";
import { ROLES } from "/@utils/constants";

export default class ProcessedLotsList extends Component {
  render() {
    return (
      <Layout roles={[ROLES.COOPERATIVE]}>
        <SEO title="Processed Lots" />
        <CoopLotListComponent />
      </Layout>
    );
  }
}
