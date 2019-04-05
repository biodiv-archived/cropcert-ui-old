import { DataTable, Pagination } from "carbon-components-react";
import { If } from "control-statements";
import React, { Component } from "react";
import { Link } from "gatsby";

import { TABLE_HEADER_FIELDS } from "./header.constants";

interface IProps {
  resources;
}

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

export default class TableSub extends Component<IProps> {
  componentDidMount = () => {};

  renderDataTable = ({ rows, headers, getHeaderProps, getRowProps }) => {
    return (
      <TableContainer>
        <Table className="eco--cctable">
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
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
                  <Link to={`/collection-center/view?ccId=${row.id}`}>
                    View &rarr;
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  render() {
    return (
      <DataTable
        rows={this.props.resources || []}
        headers={TABLE_HEADER_FIELDS}
        render={this.renderDataTable}
      />
    );
  }
}
