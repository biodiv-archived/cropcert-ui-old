import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import Tile from "/@components/@core/tile";
import { ROLES } from "/@utils/constants";

export default function FactoryIndexPage() {
  return (
    <Layout roles={[ROLES.UNION]}>
      <SEO title="Factory" />
      <h1 className="eco--title">My Dashboard</h1>
      <div className="bx--row">
        <Tile
          title="Milling Lots"
          description="Milling lots from factories"
          to="lots/list"
        />
      </div>
    </Layout>
  );
}
