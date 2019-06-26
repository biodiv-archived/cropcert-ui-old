import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import Tile from "/@components/@core/tile";
import { ROLES } from "/@utils/constants";

export default function FactoryIndexPage() {
  return (
    <Layout roles={[ROLES.FACTORY]}>
      <SEO title="Collection Center" />
      <h1 className="eco--title">My Dashboard</h1>
      <div className="bx--row">
        <Tile
          title="Create Batch"
          description="Create batch from collections"
          to="../collection-center/batch/collect"
        />
        <Tile
          title="Batches"
          description="List all Batches"
          to="../collection-center/batch/list"
        />
      </div>
      <div className="bx--row">
        <Tile
          title="Dispatch Lots"
          description="Dispatch Lots to Factory/Union"
          to="lot/merge-process"
        />
        <Tile
          title="Process Lots"
          description="Lots from Collection Center"
          to="lot/list"
        />
      </div>
    </Layout>
  );
}
