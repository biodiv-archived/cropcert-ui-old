import "./batching-table.component.scss";

import { DataTable } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";

import { TABLE_HEADER_FIELDS } from "./header.constants";
import { CollectionStore } from "/@stores/collections.store";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableSelectRow,
  TableSelectAll,
} = DataTable;

@observer
export default class CollectionsListTableComponent extends Component {
  collectionStore = new CollectionStore();

  componentDidMount = () => {
    this.collectionStore.list(true);
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  renderDataTable = ({
    rows,
    headers,
    getHeaderProps,
    getSelectionProps,
    selectedRows,
  }) => {
    return (
      <>
        <h1 className="eco--title">Collections</h1>
        <div className="bx--row">
          <div className="bx--col-lg-12 bx--col-sm-12">
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
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <DataTable
        rows={this.collectionStore.collections || []}
        headers={TABLE_HEADER_FIELDS}
        render={this.renderDataTable}
      />
    );
  }
}
