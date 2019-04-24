import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import BatchingTableAvailable from "/@components/collection-center/collection/available/batching-table";
import { ROLES } from "/@utils/constants";

export default class CollectionsAvailablePage extends Component {
  render() {
    return (
      <Layout roles={[ROLES.AUTHORIZED]}>
        <BatchingTableAvailable />
      </Layout>
    );
  }
}
