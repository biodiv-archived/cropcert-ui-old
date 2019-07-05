import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import LotSummery from "/@components/lot/summery";
import { ROLES } from "/@utils/constants";

export default function MillingLotSummeryPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Milling Summery" />
      <LotSummery />
    </Layout>
  );
}
