import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

export class COStore {
  @observable coOne: any = {};

  @action
  getByCoId(coId) {
    http
      .get(`${process.env.ENDPOINT_ENTITY}/co/coCode?coCode=${coId}`)
      .then(r => {
        this.coOne = r.data;
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while loading collection center info",
          TOAST_TYPE.ERROR
        );
      });
  }
}
