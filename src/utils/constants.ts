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
  COLLECTION_CENTER: "cc",
  COOPERATIVE: "co",
  FACTORY: "factory",
  UNION: "union",
  ADMIN: "admin",
};
export const CAS_AUTH_URL =
  process.env.ENDPOINT_CAS +
  "/login?service=" +
  w.location.origin +
  "/auth/continue";
export const CAS_LOGOUT_URL = process.env.ENDPOINT_CAS + "/logout";

export const LCS = {
  NOT_CREATED: "not_created",
  CREATING: "creating",
  CREATED: "created",
  ERROR: "error",
};

export const LOT_STATUS = {
  AT_COLLECTION_CENTER: "AtCollectionCenter",
  AT_CO_OPERATIVE: "AtCoOperative",
  IN_TRANSPORT: "InTransport",
  AT_FACTORY: "AtFactory",
  AT_UNION: "AtUnion",
};

export const LOT_ACTIONS = {
  AT_CO_OPERATIVE: {
    title: "Lots",
    action: "Dispatch",
    endpoint: "/cooperative/lot/dispatch-summery",
  },
  AT_FACTORY: {
    title: "Milling Lots",
    action: "Done Milling",
    endpoint: "/cooperative/lot/milling-summery",
  },
  AT_UNION_GRN: {
    title: "Add GRN",
    action: "NA",
    endpoint: "NA",
  },
  AT_UNION_GREEN: {
    title: "Add Green Report",
    action: "NA",
    endpoint: "NA",
  },
  AT_UNION_CUPPING: {
    title: "Add Cupping Report",
    action: "NA",
    endpoint: "NA",
  },
};

export const MODAL_TYPES = {
  MILLING_TIME: "millingTime",
  OUTTURN: "outTurn",
  PERCHMENT_QUANTITY: "perchmentQuantity",
};

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
