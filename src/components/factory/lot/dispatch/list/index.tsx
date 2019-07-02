import { Button, DataTable, InlineLoading } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import ExpandRow from "./expandrow";
import { LOT_BASIC } from "./header.constants";
import { LotStore } from "/@stores/lot.store";
import { LOT_STATUS } from "/@utils/constants";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
  TableExpandHeader,
  TableExpandRow,
} = DataTable;

@observer
export default class DispatchLotComponent extends Component {
  lotStore = new LotStore();

  componentDidMount() {
    this.lotStore.lazyListLot(true, LOT_STATUS.AT_CO_OPERATIVE);
  }

  dispatchLotSummery(selectedRows) {
    const _sRows = selectedRows.map(r => r.id);
    navigate("/cooperative/lot/dispatch-summery", {
      state: {
        rows: toJS(this.lotStore.lots).filter(lot => {
          return _sRows.includes(lot.id.toString());
        }),
        header: LOT_BASIC,
        lotIDs: _sRows,
      },
    });
  }

  renderDataTable = ({
    rows,
    headers,
    getHeaderProps,
    getSelectionProps,
    selectedRows,
    getRowProps,
  }) => (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Lots</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="eco--button-table-primary"
            disabled={selectedRows.length <= 0}
            onClick={() => {
              this.dispatchLotSummery(selectedRows);
            }}
          >
            Disatch
          </Button>
        </div>
      </div>
      <br />
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          rows.length > 0
            ? this.lotStore.lazyListLot(false, LOT_STATUS.AT_CO_OPERATIVE)
            : null;
        }}
        hasMore={this.lotStore.lazyListHasMore}
        loader={
          <InlineLoading key={rows.length} description="Loading data..." />
        }
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableExpandHeader />
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
                    <TableExpandRow {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableExpandRow>
                    {row.isExpanded && (
                      <ExpandRow
                        lotStore={this.lotStore}
                        colSpan={headers.length + 2}
                        lotId={row.id}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </>
  );

  render() {
    return (
      <>
        <DataTable
          rows={this.lotStore.lots || []}
          headers={LOT_BASIC}
          render={this.renderDataTable}
        />
      </>
    );
  }
}
