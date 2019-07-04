import { ComposedModal, ModalHeader } from "carbon-components-react";
import React, { Component } from "react";

import { LotListModalFormDate, LotListModalForm } from "./lot-list-modal-forms";
import { MODAL_TYPES } from "/@utils/constants";

interface IProps {
  isModalOpen;
  closeModal;
  handleSubmit;
  modalData;
}

export default class LotListModal extends Component<IProps> {
  renderModal = () => {
    switch (this.props.modalData.modalType) {
      case MODAL_TYPES.OUTTURN:
        return (
          <LotListModalForm
            modalDataType={"number"}
            modalData={this.props.modalData}
            handleSubmit={this.props.handleSubmit}
          />
        );

      case MODAL_TYPES.GRN_NUMBER:
        return (
          <LotListModalForm
            modalDataType={"text"}
            modalData={this.props.modalData}
            handleSubmit={this.props.handleSubmit}
          />
        );

      default:
        return (
          <LotListModalFormDate
            modalData={this.props.modalData}
            handleSubmit={this.props.handleSubmit}
          />
        );
    }
  };

  render() {
    return (
      <>
        <ComposedModal
          id="132456"
          open={this.props.isModalOpen}
          onClose={this.props.closeModal}
        >
          <ModalHeader
            label="Update Lot Information"
            title={this.props.modalData.title}
            closeModal={this.props.closeModal}
          />
          {console.log(this.props.modalData.modalType)}
          {this.renderModal()}
        </ComposedModal>
      </>
    );
  }
}
