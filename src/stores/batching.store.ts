import { navigate } from "gatsby";
import { action } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

export class BatchingStore {
  @action
  createBatchfromCollections(collectionsData) {
    http
      .post(`${process.env.ENDPOINT_TRACEABILITY}/batch`, collectionsData)
      .then(response => {
        notify.show(
          `✅ Batch #${response.data.batchId} Created Successfully`,
          TOAST_TYPE.SUCCESS
        );
        navigate("/collection-center/collection/list");
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while creating Batch",
          TOAST_TYPE.ERROR
        );
      });
  }
}
