const w =
  typeof window !== "undefined" && window
    ? window
    : { location: { origin: "", pathname: "" } };
export const HEADERS = {
  "Content-Type": "application/json",
};

export const TOAST_TYPE = {
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};
export const ROLES = {
  UNAUTHORIZED: "role_unauthorized",
  AUTHORIZED: "authorized",
  FARMER: "farmer",
  COLLECTION_CENTER: "manager",
  ADMIN: "admin",
};
export const CAS_AUTH_URL =
  process.env.ENDPOINT_CAS +
  "/login?service=" +
  w.location.origin +
  "/auth/continue";
export const CAS_LOGOUT_URL = process.env.ENDPOINT_CAS + "/logout";
