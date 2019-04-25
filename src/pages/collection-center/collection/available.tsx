import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import CollectionsListTable from "/@components/collection-center/collection/list/batching-table";
import { ROLES } from "/@utils/constants";

export default class CollectionsAvailablePage extends Component {
  render() {
    return (
      <Layout roles={[ROLES.AUTHORIZED]}>
        <CollectionsListTable isAvailableOnly={true} />
      </Layout>
    );
  }
}
