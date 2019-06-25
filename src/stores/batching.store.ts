import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE, GLOBAL_LIMIT } from "/@utils/constants";
import http from "/@utils/http";
import { MODAL_TYPE } from "/@components/collection-center/batch/list/header.constants";
import { getRedirect } from "/@utils/auth";

export class BatchingStore {
  @observable lazyListHasMore = true;
  _offset = 0;
  _limit = GLOBAL_LIMIT;
  @observable batches: any[] = [];
  @observable batchCollections = new Map();

  @action
  collect(data) {
    const { type, ..._payload } = data;
    http
      .post(
        `${process.env.ENDPOINT_TRACEABILITY}/${this.getEndpoint(type)}`,
        _payload
      )
      .then(response => {
        console.info(response);
        notify.show(
          "✅ Batch Collection done successfully",
          TOAST_TYPE.SUCCESS
        );
        navigate(getRedirect());
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
  updateBatchInfo(modalType, modalData) {
    http
      .put(`${process.env.ENDPOINT_TRACEABILITY}/wetbatch/${modalType}`, {
        id: modalData.id,
        [modalType]:
          modalType !== MODAL_TYPE.PERCHMENT_QUANTITY
            ? `${modalData.date} ${modalData.time}:00`
            : modalData.qty,
      })
      .then(response => {
        this.batches = this.batches.map(_ =>
          _.batchId === response.data.batchId
            ? { ...response.data, id: response.data.batchId.toString() }
            : _
        );
        notify.show(
          `✅ Batch #${response.data.batchId} Updated Successfully`,
          TOAST_TYPE.SUCCESS
        );
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
  createBatchfromCollections(collectionsData) {
    http
      .post(`${process.env.ENDPOINT_TRACEABILITY}/batch`, collectionsData)
      .then(response => {
        notify.show(
          `✅ Batch #${response.data.batchId} Created Successfully`,
          TOAST_TYPE.SUCCESS
        );
        navigate(getRedirect());
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
  lazyList(reset, type, ccCode) {
    if (reset) {
      this._offset = 0;
    }
    http
      .get(
        `${process.env.ENDPOINT_TRACEABILITY}/${this.getEndpoint(type)}/cc`,
        {
          params: {
            ccCode,
            limit: this._limit,
            offset: this._offset,
          },
        }
      )
      .then(r => {
        if (Array.isArray(r.data)) {
          if (r.data.length === 0 || r.data.length < this._limit) {
            this.lazyListHasMore = false;
          }
          this.transformBatches(r.data.filter(o => o.type === type), reset);
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
  getCollectionInfoFrombatchId(batchId) {
    http
      .get(`${process.env.ENDPOINT_TRACEABILITY}/batching/batch/${batchId}`)
      .then(r => {
        const data = r.data.map(ci => ({
          ...ci,
          id: ci.collectionId.toString(),
        }));
        this.batchCollections.set(batchId, data);
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while listing batches",
          TOAST_TYPE.ERROR
        );
      });
  }

  private transformBatches = (data, reset) => {
    const rows = data.map(o => {
      return { ...o, id: o.batchId.toString() };
    });
    this.batches = reset ? rows : [...this.batches, ...rows];
  };

  private getEndpoint = type => {
    return type === "WET" ? "wetbatch" : "batch";
  };
}
