import "./farmer-profile.scss";

import { Tab, Tabs } from "carbon-components-react";
import { If } from "control-statements";
import { observer } from "mobx-react";
import { parse } from "query-string";
import React, { Component } from "react";

import FarmerProfileDataTable from "/@components/farmer/farmer-profile/data-tables";
import FarmerProfileMap from "/@components/farmer/farmer-profile/map";
import FarmerProfileSideBar from "/@components/farmer/farmer-profile/sidebar";
import { FarmerStore } from "/@stores/farmer.store";

interface IProps {}

@observer
export default class FarmerProfileView extends Component<IProps> {
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
    const farmer = this.farmerStore.singleFarmer || {};
    const farmerCC = this.farmerStore.singleFarmerCC || {};
    return (
      <>
        <If condition={!!farmer}>
          <div className="bx--row eco--profile">
            <FarmerProfileSideBar farmer={farmer} />
            <div className="bx--col-lg-10 bx--col-sm-12">
              <Tabs>
                <Tab label="About">
                  <div className="bx--row">
                    <FarmerProfileMap farmerCC={farmerCC} />
                    <FarmerProfileDataTable farmer={farmer} />
                  </div>
                </Tab>
                <Tab label="Transactions">TODO 🐉</Tab>
              </Tabs>
            </div>
          </div>
        </If>
        <If condition={!farmer}>Farmer not found with Id</If>
        <div className="eco--spacer" />
      </>
    );
  }
}
