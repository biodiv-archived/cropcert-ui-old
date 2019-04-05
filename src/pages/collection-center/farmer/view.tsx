import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import FarmerProfileView from "/@components/farmer/farmer-profile";
import { ROLES } from "/@utils/constants";

export default class FarmerProfilePage extends Component {
  render() {
    return (
      <Layout roles={[ROLES.COLLECTION_CENTER]}>
        <FarmerProfileView />
      </Layout>
    );
  }
}
