import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { GLOBAL_LIMIT, TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

export class CollectionStore {
  @observable collections: any[] = [];
  @observable collectionsBatch = new Map();
  @observable lazyListHasMore = true;
  _offset = 0;
  _limit = GLOBAL_LIMIT;

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
  lazyList(reset = false) {
    console.log(reset);
    http
      .get(`${process.env.ENDPOINT_TRACEABILITY}/collection/all`, {
        params: {
          limit: this._limit,
          offset: this._offset,
        },
      })
      .then(r => {
        if (Array.isArray(r.data)) {
          if (r.data.length === 0 || r.data.length < this._limit) {
            this.lazyListHasMore = false;
          }
          this.transformCollections(r.data, reset);
          this._offset += this._limit;
        }
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while listing batches",
          TOAST_TYPE.ERROR
        );
      });
  }

  @action
  getBatchInfoFromCollectionId(collectionId) {
    http
      .get(
        `${
          process.env.ENDPOINT_TRACEABILITY
        }/batching/collection/${collectionId}`
      )
      .then(r => {
        const data = r.data.map(ci => ({ ...ci, id: ci.batchId.toString() }));
        this.collectionsBatch.set(collectionId, data);
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while listing batches",
          TOAST_TYPE.ERROR
        );
      });
  }

  private transformCollections = (data, reset) => {
    const rows = data
      .map(o => ({ ...o, id: o.collectionId.toString() }))
      .reverse();
    this.collections = reset ? rows : [...this.collections, ...rows];
  };
}
