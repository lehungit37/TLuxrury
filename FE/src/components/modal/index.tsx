import React from 'react';

import { useAppSelector } from 'src/redux_store';

const ModalController = () => {
  const modalState = useAppSelector((state) => state.modalSlice);

  const modalOutput = [];

  for (const modalId in modalState) {
    const modal = modalState[modalId];
    if (modal.open) {
      modalOutput.push(modal.modalComponent);
    }
  }

  return (
    <React.Fragment>
      {modalOutput.length
        ? modalOutput.map((modal, index) => <React.Fragment key={index}>{modal}</React.Fragment>)
        : null}
    </React.Fragment>
  );
};

export default ModalController;
