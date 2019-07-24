import { action, observable } from "mobx";

import http from "/@utils/http";

export class PagesStore {
  @observable pages: any[] = [];

  @action
  getAllPages() {
    http
      .get(`${process.env.ENDPOINT_PAGES}/page/all`)
      .then(r => {
        this.pages = r.data;
      })
      .catch(console.error);
  }

  createPage(payload) {
    http
      .post(`${process.env.ENDPOINT_PAGES}/page`, payload)
      .then(r => {
        console.log(r);
      })
      .catch(console.error);
  }
}
