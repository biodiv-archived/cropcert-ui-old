import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE, ROLES } from "/@utils/constants";
import { parse } from "query-string";
import http from "/@utils/http";
import { hasAccess, getCurrentUser } from "/@utils/auth";

export class CCStore {
  @observable cc: any[] = [];
  @observable ccOne: any = {};
  @observable accessibleCCs: any[] = [];

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

  /*
   * if user is loggedin as `CollectionCenter` then show only that collection center
   * otherwise if logged in as `Factory` then list collection centers under that factory
   */
  @action
  listAccessibleCCs() {
    if (this.accessibleCCs.length > 0) {
      return;
    }

    const _user = getCurrentUser();
    const _endpoint = hasAccess([ROLES.COOPERATIVE])
      ? `cc/coOperativeId/${_user["coCode"]}` // As of now key is wrong but code is of CoOperative
      : `cc/${_user["ccCode"]}`;
    http
      .get(`${process.env.ENDPOINT_ENTITY}/${_endpoint}`)
      .then(r => {
        let _list = Array.isArray(r.data) ? r.data : [r.data];
        this.accessibleCCs = _list.map(c => ({
          name: `${c.ccId} - ${c.ccName}`,
          label: `${c.ccId} - ${c.ccName}`,
          value: c.ccId,
          id: c.ccId,
          ccName: c.ccName,
        }));
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while listing accessible collection centers",
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
