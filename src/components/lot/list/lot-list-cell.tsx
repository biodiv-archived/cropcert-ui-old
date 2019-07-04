import Edit from "@carbon/icons-react/es/edit/16";
import { DataTable } from "carbon-components-react";
import React from "react";

import { MODAL_TYPES } from "/@utils/constants";
import { toFriendlyCellValue } from "/@utils/basic";
import { LOT_LINK_ACTIONS } from "./header.constants";
import { Link } from "gatsby";

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
  ) : Object.keys(LOT_LINK_ACTIONS).includes(cell.info.header) ? (
    <TableCell key={cell.id}>
      <Link to={LOT_LINK_ACTIONS[cell.info.header] + id}>
        {cell.info.header} &rarr;
      </Link>
    </TableCell>
  ) : (
    <TableCell key={cell.id}>{cell.value}</TableCell>
  );
}
