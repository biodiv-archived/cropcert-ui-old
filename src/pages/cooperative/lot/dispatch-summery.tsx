import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import DispatchSummeryComponent from "/@components/factory/lot/dispatch/summery";
import { ROLES } from "/@utils/constants";

export default function DispatchLotSummeryPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Dispatch Summery" />
      <DispatchSummeryComponent />
    </Layout>
  );
}
