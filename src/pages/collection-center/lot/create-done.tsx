import { parse } from "query-string";
import React from "react";

import Layout from "/@components/@core/layout.component";
import MessageComponent from "/@components/@core/message";
import { ROLES } from "/@utils/constants";

export default function LotCreateDonePage() {
  const isCSR = typeof location !== "undefined";
  const id = isCSR ? parse(location.search).id || "" : "";
  const type = isCSR ? parse(location.search).type || "error" : "";
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
