import { If } from "control-statements";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { parse } from "query-string";

import Layout from "/@components/@core/layout.component";
import { FarmerStore } from "/@stores/farmer.store";
import { ROLES } from "/@utils/constants";

interface IProps {}

@observer
export default class FarmerViewPage extends Component<IProps> {
  isCSR = typeof location !== "undefined";
  farmerStore = new FarmerStore();
  farmerId: any = "0";
  farmers = { "0": {} };

  constructor(props) {
    super(props);
    if (this.isCSR) {
      this.farmerId = parse(location.search).farmerId;
      this.farmerStore.get(this.farmerId);
    }
  }

  render() {
    return (
      <Layout roles={[ROLES.COLLECTION_CENTER]}>
        <h1 className="eco--title">Farmer #{this.farmerId}</h1>
        <If condition={this.farmerStore.singleFarmer}>
          <pre className="code">
            {JSON.stringify(this.farmerStore.singleFarmer, null, 2)}
          </pre>
        </If>
        <If condition={!this.farmerStore.singleFarmer}>
          Farmer not found with Id
        </If>
      </Layout>
    );
  }
}
