import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import BatchCreateComponent from "/@components/collection-center/batch/create/batch-create";
import { ROLES } from "/@utils/constants";

export default function BatchCreatePage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Create Batch" />
      <BatchCreateComponent />
    </Layout>
  );
}
