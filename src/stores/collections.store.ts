import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

export class CollectionStore {
  @observable collections: any[] = [];
  @observable collectionsBatch = new Map();

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

  @action
  getBatchInfoFromCollectionId(collectionId) {
    this.collectionsBatch.set(collectionId, { response: collectionId });
  }

  private transformCollections = (data, reset) => {
    const rows = data
      .map(o => ({ ...o, id: o.collectionId.toString() }))
      .reverse();
    this.collections = reset ? rows : [...this.collections, ...rows];
  };
}
