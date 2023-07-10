import { Modal } from "react-bootstrap";
import { useState } from "react";
import "./Style.css";
// import { useHistory } from "react-router-dom";

const NewQuizModal = ({ children }) => {
  // const history = useHistory();
  // const handleGoBack = () => {
  //   history.goBack()
  // };
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
 

  return (
    <div className="CreateQuiz-modal">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        aria-labelledby="example-custom-modal-styling-title"
        fullscreen="true"
        size="xl"
        
      >
        <Modal.Body>{children}</Modal.Body>

        <Modal.Footer style={{maxHeight:"15vh"}}>
          <button className="modal-buttons-form"  >
            Go back
          </button>
<button className="modal-buttons-form" >
           save and Close
          </button> 
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewQuizModal;
