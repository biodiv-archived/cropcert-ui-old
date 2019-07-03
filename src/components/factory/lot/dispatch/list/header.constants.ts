import { MODAL_TYPES } from "/@utils/constants";

export const LOT_LINK_ACTIONS = {
  green: "/union/green-report/report?id=",
  cupping: "/union/cupping-report/report?id=",
};

export const LOT_BASIC = [
  {
    key: "id",
    header: "Lot Id",
  },
  {
    key: "lotName",
    header: "Lot Name",
  },
  {
    key: "quantity",
    header: "Quantity",
  },
  {
    key: "type",
    header: "Type",
  },
];

export const LOT_FACTORY = [
  ...LOT_BASIC,
  {
    key: MODAL_TYPES.MILLING_TIME,
    header: "Milling Time",
  },
  {
    key: MODAL_TYPES.OUTTURN,
    header: "Out Turn",
  },
];

export const LOT_UNION_GREEN = [
  ...LOT_BASIC,
  {
    key: "green",
    header: "Green Report",
  },
];

export const LOT_UNION_CUPPING = [
  ...LOT_BASIC,
  {
    key: "cupping",
    header: "Cupping",
  },
];

export const LOT_UNION_GRN = [
  ...LOT_BASIC,
  {
    key: MODAL_TYPES.GRN_NUMBER,
    header: "GRN Number",
  },
];

export const TABLE_HEADER_EXPAND = [
  {
    key: "id",
    header: "Batch Id",
  },
  {
    key: "batchName",
    header: "Batch Name",
  },
  {
    key: "type",
    header: "Type",
  },
  {
    key: "quantity",
    header: "Quantity",
  },
  {
    key: "date",
    header: "Date",
  },
];
