import Map from "@carbon/icons-react/es/map/32";
import { Tab, Tabs } from "carbon-components-react";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import Layout from "/@components/@core/layout.component";
import FarmerListTable from "/@components/collection-center/farmer-list-table";
import { CCStore } from "/@stores/cc.store";
import { ROLES } from "/@utils/constants";

const CCViewPage = observer(() => {
  const ccstore = new CCStore();

  useEffect(() => {
    ccstore.get();
  }, []);

  return (
    <Layout roles={[ROLES.COLLECTION_CENTER]}>
      <h1 className="eco--title">
        <a
          style={{ float: "right" }}
          target="_blank"
          href={`https://maps.google.com/?q=${ccstore.ccOne["latitude"]},${
            ccstore.ccOne["longitude"]
          }`}
        >
          <Map />
        </a>
        {ccstore.ccOne["ccName"]} <span>#{ccstore.ccOne["ccCode"]}</span>
      </h1>
      <div className="eco--spacing-bottom">
        <strong>Village: </strong>
        {ccstore.ccOne["village"]}
      </div>
      <Tabs>
        <Tab label="Farmers">
          <FarmerListTable />
        </Tab>
        <Tab label="Transactions">TODO 🐉</Tab>
      </Tabs>
      <div className="eco--spacer" />
    </Layout>
  );
});

export default CCViewPage;
