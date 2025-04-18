import React,{useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function PaymentModal(props) {
    const { action, tableId, show, handleClose, title } = props

    const [paymentMethod, setPaymentMethod] = useState("CASH");

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    return (
        <Modal
            size="large"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
        >
            <div className="modal-content bg-dark text-white">
                <Modal.Header closeButton>
                    {title ? title : <Modal.Title>Cerrar Cuenta</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <p>Seguro que quieres cerrar la cuenta?</p>
                    <Form.Group>
                        <Form.Label>Método de Pago</Form.Label>
                        <Form.Select value={paymentMethod} onChange={handlePaymentChange} className='bg-dark text-white'>
                            <option value="CASH">Efectivo</option>
                            <option value="CARD">Tarjeta</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={() => action(paymentMethod)}>Cerrar Cuenta</Button>
                </Modal.Footer>
            </div>
        </Modal>
    )
}
