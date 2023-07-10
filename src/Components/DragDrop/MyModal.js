import React from "react";
import { Modal } from "react-bootstrap";
import "../../Pages/Dragdrop/Dragdrop.css"

const MyModal = ({ showModal, correctAnswer, handleClose }) => {
  return (
    <Modal className="correctmodal" show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modal">Here's the correct answer!</Modal.Title>
      </Modal.Header>
      <Modal.Body>The correct answer is:<strong> {correctAnswer.join(", ")}</strong></Modal.Body>
      <Modal.Footer>
        <button id="quiz-dnd-next" onClick={handleClose}>
          got it!
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
