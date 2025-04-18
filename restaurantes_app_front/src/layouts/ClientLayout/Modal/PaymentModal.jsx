import React, { useEffect } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

export default function PaymentModal(props) {
    const { show, paymentMethod, setPaymentMethod, onClose, totalPayment, onCreatePayment } = props


    return (
        <Modal
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={onClose}
        >
            <div className="modal-content bg-dark text-white">
                <Modal.Header closeButton>
                    <Modal.Title>¿Seguro que desea pedir la cuenta?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table variant='dark' className='rounded'>
                        <tbody>
                            <tr>
                                <td>Total: </td>
                                <td className='text-end'>$ {totalPayment}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex">
                        <Button onClick={()=>setPaymentMethod("CASH")} className="w-50 rounded-0 text-center" variant={paymentMethod == "CASH" ? "primary" : "secondary"}>Efectivo</Button>
                        <Button onClick={()=>setPaymentMethod("CARD")} className="w-50 rounded-0 text-center" variant={paymentMethod == "CARD" ? "primary" : "secondary"}>Tarjeta</Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
          <Button variant="danger" onClick={onClose}>Volver</Button>
          <Button variant="success" onClick={onCreatePayment}>Pedir Cuenta</Button>
        </Modal.Footer>

            </div>
        </Modal>
    )
}
