import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import DispatchLotComponent from "/@components/factory/lot/dispatch/list";
import { ROLES } from "/@utils/constants";

export default function DispatchLotPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Dispatch Lots" />
      <DispatchLotComponent />
    </Layout>
  );
}
