import { DataTable, InlineLoading, Tabs, Tab } from "carbon-components-react";
import { Observer, useObservable } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { FIELDS_DRY, FIELDS_WET } from "./header.constants";
import { BatchingStore } from "/@stores/batching.store";
import BatchListCell from "./batch-list-cell";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
} = DataTable;

export default function BatchListComponent() {
  const batchingStore = useObservable(new BatchingStore());
  const [batchType, setBatchType] = useState("DRY");
  const [headerFields, setHeaderFields] = useState(FIELDS_DRY);

  useEffect(() => {
    batchingStore.lazyList(true, batchType);
  }, [batchType]);

  const renderDataTable = ({
    rows,
    headers,
    getHeaderProps,
    getSelectionProps,
    getRowProps,
  }) => (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => {
        rows.length > 0 ? batchingStore.lazyList(false, batchType) : null;
      }}
      hasMore={batchingStore.lazyListHasMore}
      loader={<InlineLoading key={rows.length} description="Loading data..." />}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll {...getSelectionProps()} />
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
                  <TableRow {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map(cell => BatchListCell(cell))}
                  </TableRow>
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
          <Tabs>
            <Tab
              label="Dry"
              onClick={() => {
                setBatchType("DRY");
                setHeaderFields(FIELDS_DRY);
              }}
            />
            <Tab
              label="Wet"
              onClick={() => {
                setBatchType("WET");
                setHeaderFields(FIELDS_WET);
              }}
            />
          </Tabs>
          <DataTable
            rows={batchingStore.batches || []}
            headers={headerFields}
            render={renderDataTable}
          />
        </>
      )}
    </Observer>
  );
}
