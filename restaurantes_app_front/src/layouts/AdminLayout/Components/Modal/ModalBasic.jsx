import React from 'react'
import { Modal } from 'react-bootstrap'
import './ModalBasic.scss'

export default function ModalBasic(props) {
  const { show, title, children, onClose, size } = props
  return (
    <Modal
      size={size ? size : "sm"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onClose}
    >
      <div className="modal-content bg-dark text-white">
        <Modal.Header closeButton>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </div>
    </Modal>
  )
}
