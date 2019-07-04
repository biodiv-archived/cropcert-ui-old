import { parse } from "query-string";
import React from "react";

import Layout from "/@components/@core/layout.component";
import MessageComponent from "/@components/@core/message";
import { ROLES } from "/@utils/constants";

export default function LotCreateDonePage() {
  const id = parse(location.search).id || -1;
  const type = parse(location.search).type || "error";
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <MessageComponent
        type={type}
        message="Lot created with ID"
        id={id}
        backLink="/collection-center/batch/list/"
        backLinkTitle="Create Another Lot"
      />
    </Layout>
  );
}
