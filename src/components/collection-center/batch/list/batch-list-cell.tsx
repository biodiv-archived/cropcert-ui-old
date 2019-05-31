import { DataTable } from "carbon-components-react";
import React from "react";

import { MODAL_TYPE } from "./header.constants";
import { toFriendlyCellValue } from "/@utils/basic";

const { TableCell } = DataTable;

export default function BatchListCell(cell, id, openModal) {
  return Object.values(MODAL_TYPE).includes(cell.info.header) ? (
    <TableCell key={cell.id}>
      {toFriendlyCellValue(cell)}
      &emsp;
      <button
        onClick={() => {
          openModal(cell.info.header, id, cell.value);
        }}
      >
        Edit
      </button>
    </TableCell>
  ) : (
    <TableCell key={cell.id}>{cell.value}</TableCell>
  );
}
