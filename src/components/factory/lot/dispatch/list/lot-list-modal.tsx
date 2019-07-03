import { ComposedModal, ModalHeader } from "carbon-components-react";
import React, { Component } from "react";

import {
  LotListModalFormDate,
  LotListModalFormNumber,
  LotListModalFormString,
} from "./lot-list-modal-forms";
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
          <LotListModalFormNumber
            modalData={this.props.modalData}
            handleSubmit={this.props.handleSubmit}
          />
        );

      case MODAL_TYPES.GRN_NUMBER:
        return (
          <LotListModalFormString
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
            title={this.props.modalData.modalType}
            closeModal={this.props.closeModal}
          />
          {this.renderModal()}
        </ComposedModal>
      </>
    );
  }
}
