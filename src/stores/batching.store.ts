import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { MODAL_TYPE } from "/@components/collection-center/batch/list/header.constants";
import { getRedirect } from "/@utils/auth";
import { toUTCDateTime } from "/@utils/basic";
import { GLOBAL_LIMIT, TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

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
        navigate(
          `/collection-center/batch/collect-done?id=${response.data.batchName}&type=success`
        );
      })
      .catch(error => {
        console.error(error);
        navigate(`/collection-center/batch/collect-done`);
      });
  }

  @action
  updateBatchInfo(modalType, modalData) {
    http
      .put(`${process.env.ENDPOINT_TRACEABILITY}/wetbatch/${modalType}`, {
        id: modalData.id,
        [modalType]:
          modalType !== MODAL_TYPE.PERCHMENT_QUANTITY
            ? toUTCDateTime(modalData)
            : modalData.qty,
      })
      .then(r => {
        this.batches = this.batches.map(_ =>
          _.batchId === r.data.batchId
            ? {
                ...r.data,
                id: r.data.batchId.toString(),
                disabled: this.isRowDisabled(r.data),
              }
            : _
        );
        notify.show(
          `✅ Batch #${r.data.batchId} Updated Successfully`,
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
  lazyList(reset, type, ccCodes, isReadyForLot = true) {
    if (reset) {
      this._offset = 0;
    }
    http
      .get(
        `${process.env.ENDPOINT_TRACEABILITY}/${this.getEndpoint(type)}/cc`,
        {
          params: {
            ccCodes: ccCodes.toString() || "-1",
            limit: this._limit,
            offset: this._offset,
            ...(type === "WET" ? { isReadyForLot } : {}),
          },
        }
      )
      .then(r => {
        if (Array.isArray(r.data)) {
          if (r.data.length === 0 || r.data.length < this._limit) {
            this.lazyListHasMore = false;
          }
          this.transformBatches(
            r.data.filter(o => o.type === type),
            reset,
            type
          );
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

  private transformBatches = (data, reset, type) => {
    const rows = data.map(o => {
      return {
        ...o,
        id: o.batchId.toString(),
        disabled: this.isRowDisabled(o),
      };
    });
    this.batches = reset ? rows : [...this.batches, ...rows];
  };

  private isRowDisabled = o => {
    return o.type === "DRY" ||
      (o.startTime &&
        o.fermentationEndTime &&
        o.dryingEndTime &&
        o.perchmentQuantity > 0)
      ? false
      : true;
  };

  private getEndpoint = type => {
    return type === "WET" ? "wetbatch" : "batch";
  };
}
