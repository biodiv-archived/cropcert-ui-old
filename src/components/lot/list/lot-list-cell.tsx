import Add from "@carbon/icons-react/es/add/16";
import Edit from "@carbon/icons-react/es/edit/16";
import { DataTable } from "carbon-components-react";
import { Link } from "gatsby";
import React from "react";

import { LOT_LINK_ACTIONS } from "./header.constants";
import { camelCaseToStartCase, toFriendlyCellValue } from "/@utils/basic";
import { MODAL_TYPES } from "/@utils/constants";

const { TableCell } = DataTable;

export default function LotListCell(cell, id, openModal, actualRow) {
  return Object.values(MODAL_TYPES).includes(cell.info.header) ? (
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
            cell.value || 0,
            actualRow.quantity,
            camelCaseToStartCase(cell.info.header)
          );
        }}
      >
        <Edit />
      </button>
    </TableCell>
  ) : Object.keys(LOT_LINK_ACTIONS).includes(cell.info.header) ? (
    <TableCell key={cell.id}>
      <Link to={LOT_LINK_ACTIONS[cell.info.header] + id}>
        Add {camelCaseToStartCase(cell.info.header)} Report <Add />
      </Link>
    </TableCell>
  ) : (
    <TableCell key={cell.id}>{cell.value}</TableCell>
  );
}
