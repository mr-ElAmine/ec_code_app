import React, { useState } from "react";
import { Button, Modal } from "antd";
import ReadingForm from "../form/ReadingForm"; // Adjust the import path based on your project structure

const ReadingModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Ajouter une lecture
      </Button>
      <Modal
        title="Ajouter une lecture"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <ReadingForm />
      </Modal>
    </>
  );
};

export default ReadingModal;
