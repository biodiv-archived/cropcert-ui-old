import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import LotList from "/@components/lot/list";
import { ROLES, LOT_STATUS, LOT_ACTIONS } from "/@utils/constants";

export default function LotGreenReportPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Lots Green Report" />
      <LotList
        {...LOT_ACTIONS.AT_UNION_GREEN}
        lotStatus={LOT_STATUS.AT_UNION}
      />
    </Layout>
  );
}
