import "./farmer-table.component.scss";

import { DataTable, InlineLoading } from "carbon-components-react";
import { If } from "control-statements";
import { Link } from "gatsby";
import { observer } from "mobx-react";
import { parse } from "query-string";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { FormBuilder } from "react-reactive-form";

import { TABLE_HEADER_FIELDS } from "./header.constants";
import { FarmerStore } from "/@stores/farmer.store";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

@observer
export default class FarmerListTable extends Component {
  farmerStore = new FarmerStore();
  isCSR = typeof location !== "undefined";
  ccId;

  collectForm = FormBuilder.group({
    statusCollected: true,
    statusTransferred: true,
  });

  componentDidMount = () => {
    if (this.isCSR) {
      this.ccId = parse(location.search).ccId || undefined;
      this.lazyListFarmers(true);
    }
  };

  lazyListFarmers = reset => {
    this.farmerStore.lazyList(reset, this.ccId);
  };

  renderDataTable = ({ rows, headers, getHeaderProps, getRowProps }) => {
    return (
      <div className="bx--row">
        <div className="bx--col-lg-12">
          <If condition={rows.length > 0}>
            <InfiniteScroll
              pageStart={0}
              loadMore={() => {
                this.lazyListFarmers(false);
              }}
              hasMore={this.farmerStore.lazyListHasMore}
              loader={<InlineLoading description="Loading data..." />}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers.map(header => (
                        <TableHeader
                          key={header.key}
                          {...getHeaderProps({ header })}
                        >
                          {header.header}
                        </TableHeader>
                      ))}
                      <TableHeader />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow {...getRowProps({ row })}>
                        {row.cells.map(cell => (
                          <If condition={true} key={cell.id}>
                            <TableCell>{cell.value}</TableCell>
                          </If>
                        ))}
                        <TableCell>
                          <Link
                            to={`/collection-center/farmer/view?farmerId=${
                              row.id
                            }`}
                          >
                            View &rarr;
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </InfiniteScroll>
          </If>
          <If condition={rows.length < 1}>
            <If condition={this.farmerStore.lazyListHasMore}>
              <InlineLoading description="Loading data..." />
            </If>
            <If condition={!this.farmerStore.lazyListHasMore}>
              No Farmer found!
            </If>
          </If>
        </div>
      </div>
    );
  };

  render() {
    return (
      <DataTable
        rows={this.farmerStore.farmers || []}
        headers={TABLE_HEADER_FIELDS}
        render={this.renderDataTable}
      />
    );
  }
}
