import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import LotCreateComponent from "/@components/lot/create";
import { ROLES } from "/@utils/constants";

export default function LotCreatePage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Create Lot" />
      <LotCreateComponent />
    </Layout>
  );
}
