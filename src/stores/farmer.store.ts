import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { getRedirect } from "/@utils/auth";
import { TOAST_TYPE, GLOBAL_LIMIT } from "/@utils/constants";
import http from "/@utils/http";

export class FarmerStore {
  @observable farmers: any[] = [];
  @observable singleFarmer;
  @observable singleFarmerCC;
  @observable lazyListHasMore = true;
  _offset = 0;
  _limit = GLOBAL_LIMIT;

  @action
  create(payload) {
    http
      .post(`${process.env.ENDPOINT_USER}/farmer`, payload)
      .then(response => {
        console.info(response);
        notify.show("🎉 Farmer added successfully", TOAST_TYPE.SUCCESS);
        navigate(getRedirect());
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while adding farmer",
          TOAST_TYPE.ERROR
        );
      });
  }

  @action
  get(farmerId) {
    http.get(`${process.env.ENDPOINT_USER}/farmer/${farmerId}`).then(r => {
      this.singleFarmer = r.data;
      http
        .get(`${process.env.ENDPOINT_USER}/cc/${r.data.ccCode}`)
        .then(r1 => {
          this.singleFarmerCC = r1.data;
        });
    });
  }

  @action
  list(reset, ccId?) {
    const linkSuffix = ccId ? `collection?ccCode=${ccId}` : "all";
    http
      .get(`${process.env.ENDPOINT_USER}/farmer/${linkSuffix}`)
      .then(r => {
        if (Array.isArray(r.data)) {
          this.transformCollections(r.data, reset);
        }
      })
      .catch(error => {
        console.error(error);
        notify.show(
          "❌ There was some error while listing farmers",
          TOAST_TYPE.ERROR
        );
      });
  }

  @action
  lazyList(reset, ccId?) {
    http
      .get(`${process.env.ENDPOINT_USER}/farmer/${this.getSuffix(ccId)}`)
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
          "❌ There was some error while listing farmers",
          TOAST_TYPE.ERROR
        );
      });
  }

  private transformCollections = (data, reset) => {
    const rows = data.map(o => {
      return { ...o, id: o.id.toString() };
    });
    this.farmers = reset ? rows : [...this.farmers, ...rows];
  };

  private getSuffix = (ccId?) => {
    let linkSuffix = ccId ? `collection?ccCode=${ccId}&` : "all?";
    linkSuffix = `${linkSuffix}limit=${this._limit}&offset=${this._offset}`;
    return linkSuffix;
  };
}
