import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const MyModal = ({showModal,setShowModal,correctOrder,handleClose}) => {
  return (
    <div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Here's the correct order!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              The correct order is: {correctOrder.join(", ")}
            </Modal.Body>
            <Modal.Footer>
              <Button id="closeModal" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}

export default MyModal
