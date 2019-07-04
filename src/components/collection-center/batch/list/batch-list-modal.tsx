import { ComposedModal, ModalHeader } from "carbon-components-react";
import React, { Component } from "react";

import {
  BatchListModalFormDate,
  BatchListModalFormNumber,
} from "./batch-list-modal-forms";
import { MODAL_TYPE } from "./header.constants";

interface IProps {
  isModalOpen;
  closeModal;
  handleSubmit;
  modalData;
}

export default class BatchListModal extends Component<IProps> {
  render() {
    return (
      <>
        <ComposedModal
          id="1324"
          open={this.props.isModalOpen}
          onClose={this.props.closeModal}
        >
          <ModalHeader
            label="Update Information"
            title={this.props.modalData.title}
            closeModal={this.props.closeModal}
          />
          {this.props.modalData.modalType !== MODAL_TYPE.PERCHMENT_QUANTITY ? (
            <BatchListModalFormDate
              modalData={this.props.modalData}
              handleSubmit={this.props.handleSubmit}
            />
          ) : (
            <BatchListModalFormNumber
              modalData={this.props.modalData}
              handleSubmit={this.props.handleSubmit}
            />
          )}
        </ComposedModal>
      </>
    );
  }
}
