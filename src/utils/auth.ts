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

export const setPages = pages => {
  window.localStorage.pages = JSON.stringify(pages);
};

export const getPages = () => {
  if (isBrowser) {
    if (window.localStorage.pages) {
      return JSON.parse(window.localStorage.pages);
    }
  }
  return [];
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
    console.info("❌ Session expired");
    navigate("/auth/sign-out");
  }
};

export const getCurrentUser = () => (isBrowser ? getUser() : {});

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
    case ROLES.COOPERATIVE:
      return "/cooperative";
    case ROLES.UNION:
      return "/union";
    default:
      return "/401";
  }
};
