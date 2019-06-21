import { navigate } from "gatsby";
import { action } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

export class QualityStore {
  @action
  createQualityReport(params) {
    http
      .post(`${process.env.ENDPOINT_TRACEABILITY}/report`, params)
      .then(response => {
        notify.show(
          `✅ Quality Report #${response.data.id} Created Successfully`,
          TOAST_TYPE.SUCCESS
        );
        navigate("/cooperative");
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while Quality Report",
          TOAST_TYPE.ERROR
        );
      });
  }

  @action
  createCuppingReport(params) {
    http
      .post(`${process.env.ENDPOINT_TRACEABILITY}/cupping`, params)
      .then(response => {
        notify.show(
          `✅ Cupping Report #${response.data.id} Created Successfully`,
          TOAST_TYPE.SUCCESS
        );
        navigate("/cooperative");
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while Cupping Report",
          TOAST_TYPE.ERROR
        );
      });
  }
}
