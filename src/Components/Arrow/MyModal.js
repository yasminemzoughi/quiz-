import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../../Pages/Arrow/File.css";
const MyModal = ({ modalShow, correctAnswer, setModalShow }) => {
  return (
    <div>
      <Modal
        className="correctmodal"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">
            oups, Here's the correct order!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The correct answer is : {correctAnswer.join(" => ")}
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeModal" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyModal;
