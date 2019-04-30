const w =
  typeof window !== "undefined" && window
    ? window
    : { location: { origin: "", pathname: "" } };
export const HEADERS = {
  "Content-Type": "application/json",
};

export const GLOBAL_LIMIT = 20;

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

export const MAP: { MAP_CENTER: [number, number]; [key: string]: any } = {
  MAP_CENTER: [0.4363, 30.1675],
  MARKER_MERGEOPTIONS: {
    iconRetinaUrl: "/assets/marker-default@2x.png",
    iconUrl: "/assets/marker-default.png",
    iconSize: [30, 70],
    shadowSize: [0, 0],
    shadowAnchor: [0, 0],
    popupAnchor: [3, -40],
  },
  TILE: {
    URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    ATTRIBUTION: `&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
  },
};
