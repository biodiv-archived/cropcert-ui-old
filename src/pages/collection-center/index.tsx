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
          title="Create Batch"
          description="Create batch from collections"
          to="batch/collect"
        />
        <Tile
          title="View/Update Batch"
          description="View/Update Batch"
          to="batch/list"
        />
      </div>
    </Layout>
  );
}
