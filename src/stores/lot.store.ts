import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { formattedTimeStamp } from "/@utils/basic";
import { GLOBAL_LIMIT, TOAST_TYPE, MODAL_TYPES } from "/@utils/constants";
import http from "/@utils/http";
import { navigate } from "gatsby";

export class LotStore {
  @observable lazyListHasMore = true;
  @observable lotsBatch = new Map();
  @observable lotsOrigins = new Map();
  @observable lotsBatches = new Map();
  _offset = 0;
  _limit = GLOBAL_LIMIT;
  @observable lots: any[] = [];

  @action
  createLotfromBatches(batchData) {
    http
      .post(`${process.env.ENDPOINT_TRACEABILITY}/lotCreation`, batchData)
      .then(r => {
        navigate(
          `/collection-center/lot/create-done?id=${r.data.lotName}&type=success`
        );
      })
      .catch(error => {
        navigate("/collection-center/lot/create-done");
      });
  }

  @action
  lazyListLot(reset, status, type = "lot") {
    if (reset) {
      this._offset = 0;
    }
    http
      .get(`${process.env.ENDPOINT_TRACEABILITY}/${type}/all/${status}`, {
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
  getOriginByLotId(lotId) {
    http
      .get(
        `${process.env.ENDPOINT_TRACEABILITY}/lotCreation/lot/origin?lotId=${lotId}`
      )
      .then(r => {
        http
          .get(
            `${
              process.env.ENDPOINT_USER
            }/cc/origin?ccCodes=${r.data.toString()}`
          )
          .then(o => {
            this.lotsOrigins.set(lotId, o.data);
          });
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
  getBatchsByLotId(lotId) {
    http
      .get(
        `${process.env.ENDPOINT_TRACEABILITY}/lotCreation/lotId?lotId=${lotId}`
      )
      .then(r => {
        this.lotsBatches.set(
          lotId,
          r.data.map(o => ({ ...o, id: o.batchId.toString() }))
        );
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
  dispatchLot(lotIDs, timeKey, to = "factory") {
    http
      .put(`${process.env.ENDPOINT_TRACEABILITY}/lot/dispatch/${to}`, {
        ids: lotIDs,
        [timeKey]: formattedTimeStamp(),
      })
      .then(r => {
        navigate(`/cooperative/lot/dispatch-done?type=success&to=${to}`);
      })
      .catch(error => {
        console.error(error);
        navigate(`/cooperative/lot/dispatch-done`);
      });
  }

  processUpdateLotInfo(modalType, modalData) {
    switch (modalType) {
      case MODAL_TYPES.MILLING_TIME:
        return {
          id: modalData.id,
          millingTime: `${modalData.date} ${modalData.time}:00`,
        };

      case MODAL_TYPES.OUTTURN:
        return { id: modalData.id, outTurn: modalData.value };

      case MODAL_TYPES.GRN_NUMBER:
        return { id: modalData.id, grnNumber: modalData.value };
    }
  }

  @action
  updateLotInfo(modalType, modalData, lotStatus) {
    http
      .put(
        `${process.env.ENDPOINT_TRACEABILITY}/lot/${modalType}`,
        this.processUpdateLotInfo(modalType, modalData)
      )
      .then(r => {
        console.info(lotStatus, r);
        this.lazyListLot(true, lotStatus);
        notify.show(`✅ Lot(s) Updated Successfully`, TOAST_TYPE.SUCCESS);
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while updating lot(s)",
          TOAST_TYPE.ERROR
        );
      });
  }

  private transformBatches = (data, reset) => {
    const rows = data.map(o => {
      return { ...o, id: o.id.toString(), processingTime: null, outturn: 0 };
    });
    this.lots = reset ? rows : [...this.lots, ...rows];
  };
}
