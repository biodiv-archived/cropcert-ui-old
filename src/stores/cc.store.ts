import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE } from "/@utils/constants";
import { parse } from "query-string";
import http from "/@utils/http";

export class CCStore {
  @observable cc: any[] = [];
  @observable ccOne: any = {};

  @action
  list(reset) {
    http
      .get(`${process.env.ENDPOINT_ENTITY}/cc/all`)
      .then(r => {
        if (Array.isArray(r.data)) {
          this.transformCollections(r.data, reset);
        }
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while listing collection centers",
          TOAST_TYPE.ERROR
        );
      });
  }

  @action
  get() {
    const ccId = parse(location.search).ccId;
    http
      .get(`${process.env.ENDPOINT_ENTITY}/cc/${ccId}`)
      .then(r => {
        this.ccOne = r.data;
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while loading collection center info",
          TOAST_TYPE.ERROR
        );
      });
  }

  private transformCollections = (data, reset) => {
    const rows = data.map(o => {
      return { ...o, id: o.ccId.toString() };
    });
    this.cc = reset ? rows : [...this.cc, ...rows];
  };
}
