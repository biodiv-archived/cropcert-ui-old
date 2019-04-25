import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE, GLOBAL_LIMIT } from "/@utils/constants";
import http from "/@utils/http";

export class BatchingStore {
  @observable lazyListHasMore = true;
  _offset = 0;
  _limit = GLOBAL_LIMIT;
  @observable batches: any[] = [];
  @observable batchCollections = new Map();

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

  @action
  lazyList(reset) {
    http
      .get(`${process.env.ENDPOINT_TRACEABILITY}/batch/all`, {
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
  getCollectionInfoFrombatchId(collectionId) {
    this.batchCollections.set(collectionId, { response: collectionId });
  }

  private transformCollections = (data, reset) => {
    const rows = data.map(o => {
      return { ...o, id: o.batchId.toString() };
    });
    this.batches = reset ? rows : [...this.batches, ...rows];
  };
}
