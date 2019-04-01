import { navigate } from "gatsby";
import { action } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE } from "../utils/constants";
import http from "../utils/http";

export class BatchingStore {
  @action
  createBatchfromCollections(collectionsData) {
    http
      .post(`batch`, collectionsData)
      .then(response => {
        console.info(response);
        notify.show("✅ Batch Created Successfully", TOAST_TYPE.SUCCESS);
        navigate("/collection-center/collection/list");
      })
      .catch(error => {
        console.error(error);
        notify.show("❌ There was some error while creating Batch", TOAST_TYPE.ERROR);
      });
  }
}
