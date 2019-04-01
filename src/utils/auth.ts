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
  window.localStorage.ecoUser = JSON.stringify(user);
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
      if (roles.includes(ROLES.AUTHORIZED) || roles.includes(user.role)) {
        return true;
      }
    }
  }
  return false;
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
    default:
      return "/401";
  }
};
