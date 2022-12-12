import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const BootstrapModal = ({ heading, body, show, closeModal,enlaceOk,enlaceCancel }) => {
  return (
    <Modal
      show={show}
      onHide={closeModal}
      animation={false}
      style={{ opacity: 1 }}
      centered
      //   custom class name defined in src/index.css
      dialogClassName="border-radius-2"
    >
      <Modal.Header>
        <Modal.Title>
          <h3>{heading}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={closeModal} href={enlaceOk}>
          OK
        </Button>
        <Button variant="primary" onClick={closeModal} href={enlaceCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
