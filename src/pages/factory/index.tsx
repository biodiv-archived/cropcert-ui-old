import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import Tile from "/@components/@core/tile";
import { ROLES } from "/@utils/constants";

export default function FactoryIndexPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Collection Center" />
      <h1 className="eco--title">My Dashboard</h1>
      <div className="bx--row">
        <Tile title="Merge Lots" description="Merge Lots" to="lot/merge" />
        <Tile
          title="Process Lots"
          description="Lots from Collection Center"
          to="lot/list"
        />
      </div>
    </Layout>
  );
}
