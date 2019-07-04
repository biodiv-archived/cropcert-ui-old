import { parse } from "query-string";
import React from "react";

import Layout from "/@components/@core/layout.component";
import MessageComponent from "/@components/@core/message";
import { ROLES } from "/@utils/constants";

export default function LotCreateDonePage() {
  const type = parse(location.search).type || "error";
  const to = parse(location.search).to || "";
  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <MessageComponent
        type={type}
        message={`Lot(s) dispatched to ${to}`}
        id={-1}
        backLink="/cooperative/lot/dispatch-lots"
        backLinkTitle="Dispatch Other Lot(s)"
      />
    </Layout>
  );
}
