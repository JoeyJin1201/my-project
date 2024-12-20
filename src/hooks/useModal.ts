import { useState } from 'react';

const useModal = (initData: any) => {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState(initData);

  const openModal = (data: any) => {
    setVisible(true);
    setModalData(data);
  };

  const closeModal = () => {
    setVisible(false);
    setModalData(initData);
  };

  return {
    visible,
    modalData,
    openModal,
    closeModal,
  };
};

export default useModal;
