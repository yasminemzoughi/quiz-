import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import "../../Pages/Select/Select.css"
const MyModal = ({ showModal, correctAnswer, setShowModal }) => {
  return (
    <div>
       <Modal className="correctmodal" show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title className='modalTitle'>Here's the correct order!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              The correct answer is: {correctAnswer.join(", ")}
            </Modal.Body>
            <Modal.Footer>
              <Button id="closeModal" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}

export default MyModal
