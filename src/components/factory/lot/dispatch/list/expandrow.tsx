import { DataTable } from "carbon-components-react";
import { If } from "control-statements";
import { Observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";

import { TABLE_HEADER_EXPAND } from "./header.constants";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableExpandedRow,
} = DataTable;

export default function ExpandRow({ colSpan, lotId, lotStore }) {
  const ls = useObservable(lotStore);

  useEffect(() => {
    ls.getBatchsByLotId(lotId);
  }, []);

  return (
    <Observer>
      {() => (
        <TableExpandedRow colSpan={colSpan}>
          {ls.lotsBatches.has(lotId) ? (
            <DataTable
              rows={ls.lotsBatches.get(lotId) || []}
              headers={TABLE_HEADER_EXPAND}
              render={({ rows, headers, getHeaderProps }) => (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {headers.map(header => (
                          <TableHeader {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id}>
                          {row.cells.map(cell => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            />
          ) : (
            <>Loading...</>
          )}
        </TableExpandedRow>
      )}
    </Observer>
  );
}
