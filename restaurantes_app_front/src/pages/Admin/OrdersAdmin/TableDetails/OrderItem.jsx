import React from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { useOrder } from '../../../../hooks/useOrder';
import { ORDER_STATUS } from '../../../../utils/constants';

export default function OrderItem({ order, onReloadOrders }) {
    const { checkDeliveredOrder } = useOrder()

    const checkDelivered = async() =>{
        await checkDeliveredOrder(order.id);
        onReloadOrders();
    }

    const getTimeAgo = (dateString) => {
        const now = new Date();
        const pastDate = new Date(dateString);
        const diffInSeconds = Math.floor((now - pastDate) / 1000);
    
        const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
    
        if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'seconds');
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return rtf.format(-diffInMinutes, 'minutes');
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return rtf.format(-diffInHours, 'hours');
        const diffInDays = Math.floor(diffInHours / 24);
        return rtf.format(-diffInDays, 'days');
    };

    return (
        <Card border={order.status == ORDER_STATUS.PENDING ? "warning" : "success"} bg="dark" text='white' className='mb-3'>
            <Card.Header as="h5" className='text-end'>
                {getTimeAgo(order.crated_at)}
            </Card.Header>
            <Card.Body className="d-flex align-items-center gap-3">
                <Image src={order.product_data.image} style={{ width: '145px', height: '100px' }}/>
                <Card.Title>{order.product_data.title}</Card.Title>
                {order.status == ORDER_STATUS.PENDING && <Button variant="primary" onClick={checkDelivered} className="ms-auto">Marcar Entregado</Button>}
            </Card.Body>
        </Card>
    )
}
