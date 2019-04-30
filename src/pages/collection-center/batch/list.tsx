import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import BatchListComponent from "/@components/collection-center/batch/list/batch-list";
import { ROLES } from "/@utils/constants";

export default function BatchListPage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Batch List" />
      <BatchListComponent />
    </Layout>
  );
}
