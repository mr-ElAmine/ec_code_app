import React, { useState } from "react";
import { Modal, Button } from "antd";
import UpdateReadingForm from "../form/UpdateReadingForm";

const UpdateReadingFormModal = ({
  bookReadId,
  bookId,
  notes,
  rating,
  isFinished,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Modifier
      </Button>
      <Modal
        title="Modifier la lecture"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <UpdateReadingForm
          bookReadId={bookReadId}
          bookId={bookId}
          notes={notes}
          rating={rating}
          isFinished={isFinished}
        />
      </Modal>
    </>
  );
};

export default UpdateReadingFormModal;
