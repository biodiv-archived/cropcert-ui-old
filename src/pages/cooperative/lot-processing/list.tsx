import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import LotListComponent from "/@components/factory/lot/list";
import { ROLES } from "/@utils/constants";

export default function LotListPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Unprocessed Lots" />
      <LotListComponent />
    </Layout>
  );
}
