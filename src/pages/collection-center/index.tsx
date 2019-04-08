import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import Tile from "/@components/@core/tile";
import { ROLES } from "/@utils/constants";

export default function CCIndexPage() {
  return (
    <Layout roles={[ROLES.COLLECTION_CENTER]}>
      <SEO title="Collection Center" />
      <h1 className="eco--title">Traceability</h1>
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
        <Tile
          title="Collection Centers"
          description="List all Collection Centers"
          to="list"
        />
      </div>
      <h1 className="eco--title">Manage Users</h1>
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
