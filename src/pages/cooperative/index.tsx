import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import Tile from "/@components/@core/tile";
import { ROLES } from "/@utils/constants";

export default function FactoryIndexPage() {
  return (
    <Layout roles={[ROLES.COOPERATIVE]}>
      <SEO title="Collection Center" />
      <h1 className="eco--title">Collection Center Actions</h1>
      <div className="bx--row">
        <Tile
          title="Create Batch"
          description="Create batch from collections"
          to="../collection-center/batch/collect"
        />
        <Tile
          title="Update Wet Batch"
          description="Update wet batch data"
          to="../collection-center/batch/wetbatch-list"
        />
      </div>
      <h1 className="eco--title">Cooperative Actions</h1>
      <div className="bx--row">
        <Tile
          title="Create Lot"
          description="Create lot from batches"
          to="../collection-center/batch/list"
        />
        <Tile
          title="Dispatch Lots"
          description="Dispatch Lots to Factory"
          to="lot/dispatch-lots"
        />
      </div>
    </Layout>
  );
}
