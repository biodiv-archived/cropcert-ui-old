import { DataTable, InlineLoading } from "carbon-components-react";
import { Observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";

import ExpandRow from "./expandrow";
import { TABLE_HEADER_FIELDS } from "./header.constants";
import { BatchingStore } from "/@stores/batching.store";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableExpandRow,
  TableExpandHeader,
} = DataTable;

export default function BatchListComponent() {
  const batchingStore = useObservable(new BatchingStore());

  useEffect(() => {
    batchingStore.lazyList(true);
  }, []);

  const renderDataTable = ({ rows, headers, getHeaderProps, getRowProps }) => (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => {
        rows.length > 0 ? batchingStore.lazyList(false) : null;
      }}
      hasMore={batchingStore.lazyListHasMore}
      loader={<InlineLoading key={rows.length} description="Loading data..." />}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableExpandHeader />
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  {row.isExpanded && (
                    <ExpandRow
                      batchingStore={batchingStore}
                      colSpan={headers.length + 1}
                      batchId={row.id}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );

  return (
    <Observer>
      {() => (
        <>
          <h1 className="eco--title">Batches</h1>
          <DataTable
            rows={batchingStore.batches || []}
            headers={TABLE_HEADER_FIELDS}
            render={renderDataTable}
          />
        </>
      )}
    </Observer>
  );
}
