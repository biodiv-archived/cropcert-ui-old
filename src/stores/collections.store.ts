import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

export class CollectionStore {
  @observable collections: any[] = [];
  @observable nonSelectable: number[] = [];

  @action
  collect(data) {
    http
      .post(`${process.env.ENDPOINT_TRACEABILITY}/collection`, data)
      .then(response => {
        console.info(response);
        notify.show("✅ Collection done successfully", TOAST_TYPE.SUCCESS);
        navigate("/collection-center/collection/list");
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while collecting",
          TOAST_TYPE.ERROR
        );
      });
  }

  @action
  list(reset = false) {
    http
      .get(`${process.env.ENDPOINT_TRACEABILITY}/collection/all`)
      .then(r => {
        this.transformCollections(r.data, reset);
      })
      .catch(e => {
        console.error(e);
      });
  }

  private transformCollections = (data, reset) => {
    const nonSelectable: any = [];
    const rows = data
      .map(o => {
        if (o.status !== "COLLECTED") {
          nonSelectable.push(o.collectionId.toString());
        }
        return {
          id: o.collectionId.toString(),
          membershipId: o.membershipId,
          ccCode: o.ccCode,
          quantity: o.quantity,
          date: o.date,
          batchId: o.batchId,
        };
      })
      .reverse();
    this.nonSelectable = reset
      ? nonSelectable
      : [...this.nonSelectable, ...nonSelectable];
    this.collections = reset ? rows : [...this.collections, ...rows];
  };
}
