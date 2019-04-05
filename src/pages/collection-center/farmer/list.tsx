import { Button } from "carbon-components-react";
import { navigate } from "gatsby";
import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import FarmerListTable from "/@components/collection-center/farmer-list-table";
import { ROLES } from "/@utils/constants";

export default class FarmerListPage extends Component {
  createFarmer() {
    navigate("/collection-center/farmer/create");
  }

  render() {
    return (
      <Layout roles={[ROLES.AUTHORIZED]}>
        <Button
          kind="primary"
          className="eco--button-table-primary"
          onClick={this.createFarmer}
        >
          Create Farmer
        </Button>
        <h1 className="eco--title">Collections</h1>
        <FarmerListTable />
      </Layout>
    );
  }
}
