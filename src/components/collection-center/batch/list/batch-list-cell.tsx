import { DataTable } from "carbon-components-react";
import React from "react";

const { TableCell } = DataTable;

export default function BatchListCell(cell) {
  switch (cell.info.header) {
    case "dryingEndTime":
      return <TableCell key={cell.id}>x{cell.value}</TableCell>;

    case "fermentationEndTime":
      return <TableCell key={cell.id}>y{cell.value}</TableCell>;

    case "perchmentQuantity":
      return <TableCell key={cell.id}>z{cell.value}</TableCell>;

    default:
      return <TableCell key={cell.id}>{cell.value}</TableCell>;
  }
}
