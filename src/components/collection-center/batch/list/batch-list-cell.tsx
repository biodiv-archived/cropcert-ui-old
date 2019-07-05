import Edit from "@carbon/icons-react/es/edit/16";
import { DataTable } from "carbon-components-react";
import React from "react";

import { MODAL_TYPE } from "./header.constants";
import { toFriendlyCellValue, camelCaseToStartCase } from "/@utils/basic";
import { toJS } from "mobx";

const { TableCell } = DataTable;

export default function BatchListCell(
  cell,
  id,
  openModal,
  actualRow,
  isWetBatchOnly
) {
  return Object.values(MODAL_TYPE).includes(cell.info.header) &&
    isWetBatchOnly ? (
    <TableCell key={cell.id}>
      {toFriendlyCellValue(cell)}
      &emsp;
      <button
        className="eco--btn-transparent"
        aria-label="Edit"
        onClick={() => {
          openModal(
            cell.info.header,
            id,
            cell.value,
            actualRow.quantity,
            camelCaseToStartCase(cell.info.header)
          );
        }}
      >
        <Edit />
      </button>
    </TableCell>
  ) : (
    <TableCell key={cell.id}>{toFriendlyCellValue(cell)}</TableCell>
  );
}
