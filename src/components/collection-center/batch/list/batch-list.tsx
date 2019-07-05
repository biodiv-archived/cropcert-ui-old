import MultiSelect from "@khanacademy/react-multi-select";
import {
  Button,
  ContentSwitcher,
  DataTable,
  Loading,
  Switch,
} from "carbon-components-react";
import { navigate } from "gatsby";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import BatchListCell from "./batch-list-cell";
import BatchListModal from "./batch-list-modal";
import { FIELDS_DRY, FIELDS_WET } from "./header.constants";
import { BatchingStore } from "/@stores/batching.store";
import { COStore } from "/@stores/co.store";
import { getCurrentUser, hasAccess } from "/@utils/auth";
import { ROLES } from "/@utils/constants";
import { toJS } from "mobx";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
} = DataTable;

interface IState {
  batchType;
  modalData;
  isModalOpen;
  ccCodes;
}

interface IProps {
  accessibleCCs;
  title;
  isWetBatchOnly;
}

@observer
export default class BatchListComponent extends Component<IProps, IState> {
  batchingStore = new BatchingStore();
  coStore = new COStore();

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      batchType: "WET",
      ccCodes: this.props.accessibleCCs.map(i => i.id),
      modalData: { type: null, id: null, value: null },
    };
  }

  componentDidMount() {
    const _user = getCurrentUser();
    if (!hasAccess([ROLES.COLLECTION_CENTER])) {
      this.coStore.getByCoId(_user["coCode"]);
    }
    this.batchingStore.lazyList(
      true,
      this.state.batchType,
      this.state.ccCodes,
      !this.props.isWetBatchOnly
    );
  }

  handleSubmit = (modalType, form) => {
    this.batchingStore.updateBatchInfo(modalType, form);
    this.closeModal();
  };

  generateLotName = selectedRows => {
    const selectedRowsIds = selectedRows.map(r => r.id);
    const selectedBatchCCIds = this.batchingStore.batches.reduce(
      (array, item) =>
        selectedRowsIds.includes(item.id) ? [...array, item.ccCode] : array,
      []
    );
    const _ccs = this.props.accessibleCCs
      .filter(cc => selectedBatchCCIds.includes(cc.id))
      .map(c => c.ccName);
    return _ccs.length > 1 ? this.coStore.coOne["coName"] : _ccs[0];
  };

  onPrimaryAction = selectedRows => {
    console.log(this.props.isWetBatchOnly);
    navigate("/collection-center/lot/create", {
      state: {
        selectedRows,
        isWetBatchFirstStep: this.props.isWetBatchOnly,
        lotType: this.state.batchType,
        ccCode: this.state.ccCodes,
        ccName: this.generateLotName(selectedRows),
      },
    });
  };

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
          <h1 className="eco--title">{this.props.title}</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="eco--button-table-primary"
            disabled={selectedRows.length <= 0}
            onClick={() => {
              this.onPrimaryAction(selectedRows);
            }}
          >
            {this.props.isWetBatchOnly ? "Finalize Wetbatch" : "Create Lot"}
          </Button>
        </div>
      </div>

      <div className="bx--row">
        {!this.props.isWetBatchOnly && (
          <div className="bx--col-lg-2">
            <ContentSwitcher
              className="eco--button-switcher"
              onChange={({ name }) => {
                this.setState({ batchType: name });
                this.batchingStore.lazyList(
                  true,
                  name,
                  this.state.ccCodes,
                  !this.props.isWetBatchOnly
                );
              }}
            >
              <Switch name="WET" text="WET" />
              <Switch name="DRY" text="DRY" />
            </ContentSwitcher>
          </div>
        )}
        <div className="bx--col-lg-4 bx--col-md-12">
          <MultiSelect
            options={this.props.accessibleCCs}
            selected={this.state.ccCodes}
            onSelectedChanged={selected => {
              this.setState({
                ccCodes: selected,
              });
              this.batchingStore.lazyList(
                true,
                this.state.batchType,
                selected,
                !this.props.isWetBatchOnly
              );
            }}
          />
        </div>
      </div>

      <br />

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          rows.length > 0
            ? this.batchingStore.lazyList(
                false,
                this.state.batchType,
                this.state.ccCodes,
                !this.props.isWetBatchOnly
              )
            : null;
        }}
        hasMore={this.batchingStore.lazyListHasMore}
        loader={
          <Loading
            key={rows.length}
            withOverlay={false}
            description="Loading data..."
          />
        }
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
                      {this.preRenderRow(row)}
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </>
  );

  preRenderRow = row => {
    const actualRow = this.batchingStore.batches.find(r => r.id === row.id);
    return row.cells.map(cell =>
      BatchListCell(
        cell,
        row.id,
        this.openModal,
        toJS(actualRow),
        this.props.isWetBatchOnly
      )
    );
  };

  openModal = (modalType, id, value, max, title) => {
    this.setState({
      modalData: {
        modalType,
        id,
        value,
        max,
        title,
      },
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <>
        <BatchListModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          handleSubmit={this.handleSubmit}
          modalData={this.state.modalData}
        />
        <DataTable
          rows={this.batchingStore.batches || []}
          headers={this.state.batchType === "DRY" ? FIELDS_DRY : FIELDS_WET}
          render={this.renderDataTable}
        />
      </>
    );
  }
}
