import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import Tile from "/@components/@core/tile";
import { ROLES } from "/@utils/constants";

export default function CCIndexPage() {
  return (
    <Layout roles={[ROLES.COLLECTION_CENTER]}>
      <SEO title="Collection Center" />
      <h1 className="eco--title">My Dashboard</h1>
      <div className="bx--row">
        <Tile
          title="Collect"
          description="Coffee from farmers"
          to="collection/collect"
        />
        <Tile
          title="Collections"
          description="List all collections"
          to="collection/list"
        />
      </div>
      <div className="bx--row">
        <Tile
          title="Create Batch"
          description="Create batch from collections"
          to="list"
        />
        <Tile
          title="Batches"
          description="List all Batches"
          to="list"
        />
      </div>
      <div className="bx--row">
        <Tile
          title="Add Farmer"
          description="Create farmer Id"
          to="farmer/create"
        />
        <Tile title="Farmers" description="List all farmers" to="farmer/list" />
      </div>
    </Layout>
  );
}
