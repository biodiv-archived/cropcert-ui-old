import { parse } from "query-string";
import React from "react";

import Layout from "/@components/@core/layout.component";
import MessageComponent from "/@components/@core/message";
import { ROLES } from "/@utils/constants";

export default function LotCreateDonePage() {
  const isCSR = typeof location !== "undefined";
  const type = isCSR ? parse(location.search).type || "error" : "";
  const to = isCSR ? parse(location.search).to || "" : "";
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <MessageComponent
        type={type}
        message={`Lot(s) dispatched to ${to}`}
        id=""
        backLink="/cooperative/lot/dispatch-lots"
        backLinkTitle="Dispatch Other Lot(s)"
      />
    </Layout>
  );
}
