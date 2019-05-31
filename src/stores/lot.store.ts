import { navigate } from "gatsby";
import { action } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

export class LotStore {
  @action
  createLotfromBatches(batchData) {
    http
      .post(`${process.env.ENDPOINT_TRACEABILITY}/lotcreation`, batchData)
      .then(response => {
        notify.show(
          `✅ Lot #${response.data.id} Created Successfully`,
          TOAST_TYPE.SUCCESS
        );
        navigate("/collection-center");
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while creating Lot",
          TOAST_TYPE.ERROR
        );
      });
  }
}
