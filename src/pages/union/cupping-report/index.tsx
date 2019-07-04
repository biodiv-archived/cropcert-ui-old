import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import LotsList from "/@components/lot/list";
import { ROLES, LOT_STATUS, LOT_ACTIONS } from "/@utils/constants";

export default function LotCuppingPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Lots Cupping" />
      <LotsList
        {...LOT_ACTIONS.AT_UNION_CUPPING}
        lotStatus={LOT_STATUS.AT_UNION}
      />
    </Layout>
  );
}
