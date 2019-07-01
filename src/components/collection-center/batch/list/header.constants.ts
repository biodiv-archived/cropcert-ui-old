export const FIELDS_DRY = [
  {
    key: "id",
    header: "Batch Id",
  },
  {
    key: "batchName",
    header: "Batch Name",
  },
  // {
  //   key: "date",
  //   header: "Batched On",
  // },
  {
    key: "quantity",
    header: "Total Quantity",
  },
];

export const FIELDS_WET = [
  {
    key: "id",
    header: "Batch Id",
  },
  {
    key: "batchName",
    header: "Batch Name",
  },
  {
    key: "quantity",
    header: "Total Quantity",
  },
  // {
  //   key: "date",
  //   header: "Batched On",
  // },
  {
    key: "startTime",
    header: "Start Time",
  },
  {
    key: "fermentationEndTime",
    header: "Fermentation Ended on",
  },
  {
    key: "dryingEndTime",
    header: "Drying Ended on",
  },
  {
    key: "perchmentQuantity",
    header: "Perchment Quantity",
  },
];

export const TABLE_HEADER_EXPAND = [
  {
    key: "id",
    header: "Batch Id",
  },
  {
    key: "quantity",
    header: "Total Quantity",
  },
  {
    key: "transferTimestamp",
    header: "Timestamp",
  },
  {
    key: "quality",
    header: "Quality",
  },
];

export const MODAL_TYPE = {
  START_TIME: "startTime",
  FERMENTATION_END_TIME: "fermentationEndTime",
  DRYING_END_TIME: "dryingEndTime",
  PERCHMENT_QUANTITY: "perchmentQuantity",
};
