import "./farmer-table.component.scss";

import { Button, DataTable } from "carbon-components-react";
import { If } from "control-statements";
import { Link, navigate } from "gatsby";
import { observer } from "mobx-react";
import { parse } from "query-string";
import React, { Component } from "react";
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
export default class CreateBatchingTableComponent extends Component {
  farmerStore = new FarmerStore();
  isCSR = typeof location !== "undefined";

  collectForm = FormBuilder.group({
    statusCollected: true,
    statusTransferred: true,
  });

  componentDidMount = () => {
    if (this.isCSR) {
      const ccId = parse(location.search).ccId || undefined;
      this.farmerStore.list(true, ccId);
    }
  };

  createFarmer() {
    navigate("/collection-center/farmer/create");
  }

  renderDataTable = ({ rows, headers, getHeaderProps, getRowProps }) => {
    return (
      <>
        <Button
          kind="primary"
          className="eco--button-table-primary"
          onClick={this.createFarmer}
        >
          Create Farmer
        </Button>
        <h1 className="eco--title">Collections</h1>
        <div className="bx--row">
          <div className="bx--col-lg-12">
            <If condition={rows.length > 0}>
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
            </If>
            <If condition={rows.length < 1}>
              No farmers found in this collection center
            </If>
          </div>
        </div>
      </>
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
