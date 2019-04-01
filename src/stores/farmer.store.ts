import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import { getRedirect } from "/@utils/auth";
import { TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

export class FarmerStore {
  @observable farmers: any[] = [];
  @observable singleFarmer;

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

  private transformCollections = (data, reset) => {
    const rows = data
      .map(o => {
        return { ...o, id: o.id.toString() };
      })
      .reverse();
    this.farmers = reset ? rows : [...this.farmers, ...rows];
  };
}
