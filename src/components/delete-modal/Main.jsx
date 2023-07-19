import React from 'react';
import { Modal, ModalBody, Lucide } from '@/base-components';

function Main({ message, show, setShow, onOk }) {
  return (
    <Modal
      show={show}
      onHidden={() => {
        setShow(false);
      }}>
      <ModalBody>
        <div className="flex items-center justify-center w-full">
          <Lucide icon="AlertCircle" className="w-16 h-16 text-center text-warning" />
        </div>
        <p className="w-full py-2 text-base text-center">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => {
              setShow(false);
            }}
            className="w-32 mr-1 btn btn-outline-secondary">
            Cancel
          </button>
          <button onClick={onOk} type="button" className="w-32 text-white btn bg-danger">
            Delete Record
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default Main;
