import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import FarmerListTable from "/@components/collection-center/farmer-list-table";
import { ROLES } from "/@utils/constants";

export default class FarmerListPage extends Component {
  render() {
    return (
      <Layout roles={[ROLES.AUTHORIZED]}>
        <FarmerListTable />
      </Layout>
    );
  }
}
