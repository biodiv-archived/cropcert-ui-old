import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { TOAST_TYPE, GLOBAL_LIMIT } from "/@utils/constants";
import http from "/@utils/http";
import { getRedirect } from "/@utils/auth";

export class LotStore {
  @observable lazyListHasMore = true;
  @observable lotsBatch = new Map();
  _offset = 0;
  _limit = GLOBAL_LIMIT;
  @observable lots: any[] = [];

  @action
  createLotfromBatches(batchData) {
    http
      .post(`${process.env.ENDPOINT_TRACEABILITY}/lotcreation`, batchData)
      .then(response => {
        notify.show(
          `✅ Lot #${response.data.id} Created Successfully`,
          TOAST_TYPE.SUCCESS
        );
        navigate(getRedirect());
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while creating Lot",
          TOAST_TYPE.ERROR
        );
      });
  }

  @action
  lazyListLot(reset, type = "lot") {
    if (reset) {
      this._offset = 0;
    }
    http
      .get(`${process.env.ENDPOINT_TRACEABILITY}/${type}/all`, {
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
          this.transformBatches(r.data, reset);
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
  getLotById(lotId) {
    http
      .get(`${process.env.ENDPOINT_TRACEABILITY}/lot/${lotId}`)
      .then(r => {
        this.lotsBatch.set(lotId, r.data);
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while getting lot information",
          TOAST_TYPE.ERROR
        );
      });
  }

  @action
  processLot(rows) {
    const _requests = rows.map(r =>
      http.post(`${process.env.ENDPOINT_TRACEABILITY}/processing`, {
        lotName: r.cells[1].value,
        ids: [r.id],
      })
    );
    Promise.all(_requests)
      .then(r => {
        console.log(r);
        notify.show(`✅ Lot(s) Processed Successfully`, TOAST_TYPE.SUCCESS);
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while processing lots",
          TOAST_TYPE.ERROR
        );
      });
  }

  @action
  updateLotInfo(modalType, modalData) {
    console.log(modalType, modalData);
    alert("TODO");
  }

  private transformBatches = (data, reset) => {
    const rows = data.map(o => {
      return { ...o, id: o.id.toString(), processingTime: null, outturn: 0 };
    });
    this.lots = reset ? rows : [...this.lots, ...rows];
  };
}
