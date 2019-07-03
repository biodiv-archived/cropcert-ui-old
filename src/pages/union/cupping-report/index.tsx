import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import DispatchLotComponent from "/@components/factory/lot/dispatch/list";
import { ROLES, LOT_STATUS, LOT_ACTIONS } from "/@utils/constants";

export default function LotCuppingPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Lots Cupping" />
      <DispatchLotComponent
        {...LOT_ACTIONS.AT_UNION_CUPPING}
        lotStatus={LOT_STATUS.AT_UNION}
      />
    </Layout>
  );
}
