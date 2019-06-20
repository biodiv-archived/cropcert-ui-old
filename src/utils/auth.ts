import { navigate } from "gatsby";

import { ROLES } from "./constants";

const isBrowser = typeof window !== `undefined`;

export const getUser = () => {
  if (isBrowser) {
    if (window.localStorage.ecoUser) {
      return JSON.parse(window.localStorage.ecoUser);
    }
  }
  return {};
};

export const setUser = user => {
  window.localStorage.ecoUser = JSON.stringify({
    ...user,
    lts: new Date().getTime(),
  });
};

export const getToken = () => {
  return getUser().token || "";
};

export const hasAccess = (roles: string[]) => {
  if (!isBrowser) {
    return false;
  }
  if (roles.includes(ROLES.UNAUTHORIZED)) {
    return true;
  } else {
    const user = getUser();
    if (user.hasOwnProperty("role")) {
      checkSessionExpired(user.lts);
      if (roles.includes(ROLES.AUTHORIZED) || roles.includes(user.role)) {
        return true;
      }
    }
  }
  return false;
};

/*
 * Temp Fix for session expiration after 2 Hours
 */
const checkSessionExpired = (lts = 0) => {
  const diff = (new Date().getTime() - lts) / 60000;
  if (diff > 120) {
    alert("❌ Session expired");
    navigate("/auth/sign-out");
  }
};

export const getCurrentUser = () => {
  if (isBrowser) {
    return getUser();
  }
};

export const signOut = callback => {
  if (!isBrowser) {
    return;
  }
  console.info(`Ensuring the \`ecoUser\` property exists.`);
  setUser({});
  callback();
};

export const getRedirect = () => {
  switch (getUser().role) {
    case ROLES.FARMER:
      return "/farmer";
    case ROLES.ADMIN:
      return "/admin";
    case ROLES.COLLECTION_CENTER:
      return "/collection-center";
    case ROLES.FACTORY:
      return "/factory";
    case ROLES.COOPERATIVE:
      return "/cooperative";
    default:
      return "/401";
  }
};
