import React from "react";

import Layout from "/@components/@core/layout.component";
import CCTable from "/@components/collection-center/cc-table";
import { ROLES } from "/@utils/constants";

export default function CCList() {
  return (
    <Layout roles={[ROLES.COLLECTION_CENTER]}>
      <CCTable />
    </Layout>
  );
}
