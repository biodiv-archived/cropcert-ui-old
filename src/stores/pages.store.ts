import { navigate } from "@reach/router";
import { action, observable } from "mobx";
import { notify } from "react-notify-toast";

import flatToTree from "/@components/pages/flatToTree";
import { getCurrentUser, setPages } from "/@utils/auth";
import { TOAST_TYPE } from "/@utils/constants";
import http from "/@utils/http";

export class PagesStore {
  @observable pages: any[] = [];
  @observable singlePage: any = {
    id: -1,
    parentId: -1,
    title: "",
    authorId: getCurrentUser().id,
    authorName: getCurrentUser().authorName,
    content: "",
    isDeleted: false,
  };

  @action
  getAllPages() {
    http
      .get(`${process.env.ENDPOINT_PAGES}/page/all`)
      .then(r => {
        const tree = flatToTree(r.data);
        setPages(tree);
        this.pages = tree;
      })
      .catch(console.error);
  }

  @action
  getPageById(pageId) {
    http
      .get(`${process.env.ENDPOINT_PAGES}/page/${pageId}`)
      .then(r => {
        this.singlePage = r.data;
      })
      .catch(console.error);
  }

  @action
  createOrUpdatePage(payload) {
    const req = payload.id === -1 ? http.post : http.put;
    req(`${process.env.ENDPOINT_PAGES}/page`, payload)
      .then(r => {
        notify.show(`✅ Page Created/Updated Successfully`, TOAST_TYPE.SUCCESS);
        navigate(`/admin/pages/list`);
        console.log(r);
      })
      .catch(console.error);
  }
}
