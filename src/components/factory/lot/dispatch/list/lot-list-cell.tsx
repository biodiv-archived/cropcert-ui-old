import Edit from "@carbon/icons-react/es/edit/16";
import { DataTable } from "carbon-components-react";
import React from "react";

import { MODAL_TYPES } from "/@utils/constants";
import { toFriendlyCellValue } from "/@utils/basic";

const { TableCell } = DataTable;

export default function LotListCell(cell, id, openModal) {
  return Object.values(MODAL_TYPES).includes(cell.info.header) ? (
    <TableCell key={cell.id}>
      {toFriendlyCellValue(cell)}
      &emsp;
      <button
        className="eco--btn-transparent"
        aria-label="Edit"
        onClick={() => {
          openModal(cell.info.header, id, cell.value || 0);
        }}
      >
        <Edit />
      </button>
    </TableCell>
  ) : (
    <TableCell key={cell.id}>{cell.value}</TableCell>
  );
}