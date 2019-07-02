import { ComposedModal, ModalHeader } from "carbon-components-react";
import React, { Component } from "react";

import {
  LotListModalFormDate,
  LotListModalFormNumber,
} from "./lot-list-modal-forms";
import { MODAL_TYPES } from "/@utils/constants";

interface IProps {
  isModalOpen;
  closeModal;
  handleSubmit;
  modalData;
}

export default class LotListModal extends Component<IProps> {
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
          {this.props.modalData.modalType !== MODAL_TYPES.OUTTURN ? (
            <LotListModalFormDate
              modalData={this.props.modalData}
              handleSubmit={this.props.handleSubmit}
            />
          ) : (
            <LotListModalFormNumber
              modalData={this.props.modalData}
              handleSubmit={this.props.handleSubmit}
            />
          )}
        </ComposedModal>
      </>
    );
  }
}
