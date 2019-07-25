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
          title="Add GRN Number"
          description="Add GRN Number to Lots"
          to="grn"
        />
        <Tile
          title="Add Green Report"
          description="Add Green report for Lot(s)"
          to="green-report"
        />
        <Tile
          title="Add Cupping Report"
          description="Add Cupping report for Lot(s)"
          to="cupping-report"
        />
        <Tile
          title="Pages"
          description="Manage Static Pages"
          to="../admin/pages/list"
        />
      </div>
    </Layout>
  );
}
