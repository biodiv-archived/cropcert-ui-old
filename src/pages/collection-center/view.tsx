import Map from "@carbon/icons-react/es/map/32";
import { Tab, Tabs } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";

import Layout from "/@components/@core/layout.component";
import FarmerListTable from "/@components/collection-center/farmer-list-table";
import { CCStore } from "/@stores/cc.store";
import { ROLES } from "/@utils/constants";

@observer
class CCView extends Component {
  ccstore = new CCStore();

  componentDidMount = () => {
    this.ccstore.get();
  };

  render() {
    return (
      <Layout roles={[ROLES.COLLECTION_CENTER]}>
        <pre />
        <h1 className="eco--title">
          <a
            style={{ float: "right" }}
            target="_blank"
            href={`https://maps.google.com/?q=${
              this.ccstore.ccOne["latitude"]
            },${this.ccstore.ccOne["longitude"]}`}
          >
            <Map />
          </a>
          {this.ccstore.ccOne["ccName"]}{" "}
          <span>#{this.ccstore.ccOne["ccCode"]}</span>
        </h1>
        <div className="eco--spacing-bottom">
          <strong>Village: </strong>
          {this.ccstore.ccOne["village"]}
        </div>
        <Tabs>
          <Tab label="Farmers">
            <FarmerListTable />
          </Tab>
          <Tab label="Transactions">Here be dragons 🐉</Tab>
        </Tabs>
        <div className="eco--spacer" />
      </Layout>
    );
  }
}

export default CCView;
