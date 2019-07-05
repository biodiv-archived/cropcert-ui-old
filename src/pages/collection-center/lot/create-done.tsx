import { parse } from "query-string";
import React from "react";

import Layout from "/@components/@core/layout.component";
import MessageComponent from "/@components/@core/message";
import { ROLES } from "/@utils/constants";

export default function LotCreateDonePage() {
  const isCSR = typeof location !== "undefined";
  const id = isCSR ? parse(location.search).id || "" : "";
  const type = isCSR ? parse(location.search).type || "error" : "";
  const operationType = isCSR ? parse(location.search).operationType : "";

  const options =
    operationType === "readyForLot"
      ? {
          message: "Wet batch(s) are finalized and ready for Lot",
          backLink: "/collection-center/batch/wetbatch-list",
          backLinkTitle: "Update Another Batch",
        }
      : {
          message: "Lot created with Name →",
          backLink: "/collection-center/batch/list/",
          backLinkTitle: "Create Another Lot",
        };

  return (
    <Layout roles={[ROLES.AUTHORIZED]}>
      <MessageComponent type={type} id={id} {...options} />
    </Layout>
  );
}
