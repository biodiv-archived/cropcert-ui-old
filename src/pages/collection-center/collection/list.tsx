import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import BatchingTable from "/@components/collection-center/batching-table";
import { ROLES } from "/@utils/constants";

export default class CollectionsListPage extends Component {
  render() {
    return (
      <Layout roles={[ROLES.AUTHORIZED]}>
        <BatchingTable />
      </Layout>
    );
  }
}
