import { navigate } from "gatsby";
import { action, observable } from "mobx";
import { parse } from "query-string";

import { getRedirect, getUser, setUser, signOut as so } from "/@utils/auth";
import { CAS_LOGOUT_URL } from "/@utils/constants";
import http from "/@utils/http";

/*
 * Auth related actions
 */
export class AuthStore {
  isCSR = typeof location !== "undefined";
  @observable user = getUser();

  @action
  continue() {
    if (this.isCSR) {
      if (parse(location.search).ticket) {
        this.pingAll();
        http
          .get(`${process.env.ENDPOINT_USER}/me`)
          .then(r => {
            this.user = r.data;
            setUser(r.data);
            navigate(getRedirect());
          })
          .catch(e => {
            alert(`Error Occurred`);
          });
      } else {
        console.log("No ticket found");
      }
    }
  }

  pingAll() {
    http.get(`${process.env.ENDPOINT_USER}/ping`);
    http.get(`${process.env.ENDPOINT_ENTITY}/ping`);
    http.get(`${process.env.ENDPOINT_TRACEABILITY}/ping`);
  }

  @action
  signOut() {
    so(() => {
      http.get(`${CAS_LOGOUT_URL}`).then(r => {
        navigate("/");
      });
    });
  }
}
