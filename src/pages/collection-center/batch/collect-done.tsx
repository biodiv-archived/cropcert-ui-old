import { parse } from "query-string";
import React from "react";

import Layout from "/@components/@core/layout.component";
import MessageComponent from "/@components/@core/message";
import { ROLES } from "/@utils/constants";

export default function BatchCreateDonePage() {
  const id = parse(location.search).id || -1;
  const type = parse(location.search).type || "error";
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <MessageComponent
        type={type}
        message="Batch created with Name"
        id={id}
        backLink="/collection-center/batch/collect"
        backLinkTitle="Create Another Batch"
      />
    </Layout>
  );
}
