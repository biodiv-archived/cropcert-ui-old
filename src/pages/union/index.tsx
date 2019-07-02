import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import Tile from "/@components/@core/tile";
import { ROLES } from "/@utils/constants";

export default function FactoryIndexPage() {
  return (
    <Layout roles={[ROLES.UNION]}>
      <SEO title="Factory" />
      <h1 className="eco--title">Factory Actions</h1>
      <div className="bx--row">
        <Tile
          title="Milling Lots"
          description="Milling lots from factories"
          to="factory"
        />
      </div>
      <h1 className="eco--title">Union Actions</h1>
      <div className="bx--row">
        <Tile
          title="Union XYZ"
          description="Milling lots from factories"
          to="lots/list"
        />
      </div>
    </Layout>
  );
}
