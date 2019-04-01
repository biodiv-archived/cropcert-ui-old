import { DataTable, Pagination } from "carbon-components-react";
import { If } from "control-statements";
import React, { Component } from "react";
import { Link } from "gatsby";

import { TABLE_HEADER_FIELDS } from "./header.constants";

interface IState {
  resourcesSubset;
}

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

export default class TableSub extends Component<IProps, IState> {
  PAGINATION_PAGE_SIZE_DEFAULT = 6;
  PAGINATION_PAGE_SIZE_OPTIONS_DEFAULT = [6, this.props.resources.length];

  constructor(props) {
    super(props);
    this.state = { resourcesSubset: [] };
  }

  componentDidMount = () => {
    this.loadSubSet();
  };

  loadSubSet() {
    this.setState({
      resourcesSubset: this.props.resources.slice(
        0,
        this.PAGINATION_PAGE_SIZE_DEFAULT
      ),
    });
  }

  handlePaginationChange = e => {
    const pageNumber = e.page;
    const pageSize = e.pageSize;
    const start = (pageNumber - 1) * pageSize;
    const end = pageNumber * pageSize;
    this.setState({ resourcesSubset: this.props.resources.slice(start, end) });
  };

  renderDataTable = ({ rows, headers, getHeaderProps, getRowProps }) => {
    return (
      <>
        <TableContainer>
          <Table>
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
                    <Link to={`/collection-center/farmer/list?ccId=${row.id}`}>View Farmers &rarr;</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            totalItems={this.props.resources.length}
            pageSize={this.PAGINATION_PAGE_SIZE_DEFAULT}
            pageSizes={this.PAGINATION_PAGE_SIZE_OPTIONS_DEFAULT}
            onChange={this.handlePaginationChange}
          />
        </TableContainer>
      </>
    );
  };

  render() {
    return (
      <DataTable
        rows={this.state.resourcesSubset || []}
        headers={TABLE_HEADER_FIELDS}
        render={this.renderDataTable}
      />
    );
  }
}
