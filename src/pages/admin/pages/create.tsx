import React from "react";

import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import { ROLES } from "/@utils/constants";
import ManagePage from "/@components/pages/manage";

export default function CreatePage() {
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <SEO title="Manage Pages" />
      <h1 className="eco--title">Create Batch</h1>
      <ManagePage />
    </Layout>
  );
}
