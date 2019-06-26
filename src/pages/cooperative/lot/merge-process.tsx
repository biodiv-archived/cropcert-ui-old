import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import MergeLotListComponent from "/@components/factory/lot/merge/list";
import { ROLES } from "/@utils/constants";

export default function LotListPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Merge Lots" />
      <MergeLotListComponent />
    </Layout>
  );
}
