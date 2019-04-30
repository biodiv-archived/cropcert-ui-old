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

export default function ExpandRow({ colSpan, batchId, batchingStore }) {
  const cs = useObservable(batchingStore);

  useEffect(() => {
    cs.getCollectionInfoFrombatchId(batchId);
  }, []);

  return (
    <Observer>
      {() => (
        <TableExpandedRow colSpan={colSpan}>
          <If condition={!!cs.batchCollections.has(batchId)}>
            <DataTable
              rows={cs.batchCollections.get(batchId) || []}
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
          </If>
          <If condition={!cs.batchCollections.has(batchId)}>Loading...</If>
        </TableExpandedRow>
      )}
    </Observer>
  );
}
