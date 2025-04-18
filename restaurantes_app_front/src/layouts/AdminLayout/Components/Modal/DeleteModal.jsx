import React from 'react'
import { Modal,Button } from 'react-bootstrap'


export default function DeleteModal(props) {
    const { show, title, item , setShow, itemId, deleteFunction, action } = props
    const handleClose = () => setShow(false);
  return (
    <Modal
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <div className="modal-content bg-dark text-white">
        <Modal.Header closeButton>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
            Seguro que quieres eliminar {item}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="danger" onClick={()=>action(itemId)}>Eliminar</Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
