import React, { useEffect } from 'react'
import { useOrder } from '../../../hooks/useOrder'
import { ListGroup, Image, Button } from 'react-bootstrap';

export default function PaymentProductList(props) {

    const { payment } = props;
    const { orders, getOrdersByPayment } = useOrder();

    useEffect(() => {
        getOrdersByPayment(payment.id);
    }, [payment.id]);

    return (
        <div style={{
            maxHeight: '400px', // ✅ Altura máxima antes de mostrar scroll
            overflowY: 'auto',   // ✅ Activa scroll cuando la lista se llena
            borderRadius: '5px',
            padding: '15px',
        }}>
            <div className="d-flex justify-content-between mb-3">
                <h4>Fecha </h4>
                <h4>{new Intl.DateTimeFormat('es-ES', {
                    dateStyle: 'long',
                    timeStyle: 'short'
                }).format(new Date(payment.created_at))}</h4>
            </div>
            {orders && <ListGroup>
                {orders.map((order, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between mb-3 bg-dark text-light border" >
                        <div className="d-flex align-items-center">
                            <Image src={order.product_data.image} alt={order.product_data.title} rounded width={50} height={50} className="me-2" />
                            <span>{order.product_data.title}</span>
                        </div>
                        <span>{order.product_data.price}</span>
                    </ListGroup.Item>
                ))}
            </ListGroup>}
        </div>
    )

}
