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

export default function ExpandRow({ colSpan, collectionId, collectionStore }) {
  const cs = useObservable(collectionStore);
  useEffect(() => {
    cs.getBatchInfoFromCollectionId(collectionId);
  }, []);

  return (
    <Observer>
      {() => (
        <TableExpandedRow colSpan={colSpan}>
          <If condition={!!cs.collectionsBatch.has(collectionId)}>
            <DataTable
              rows={cs.collectionsBatch.get(collectionId) || []}
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
                      {rows.length == 0 && (
                        <TableRow>
                          <TableCell
                            style={{ textAlign: "center" }}
                            colSpan={colSpan}
                          >
                            Not batched yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            />
          </If>
          <If condition={!cs.collectionsBatch.has(collectionId)}>Loading...</If>
        </TableExpandedRow>
      )}
    </Observer>
  );
}
