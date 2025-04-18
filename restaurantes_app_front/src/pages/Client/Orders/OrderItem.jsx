import React, { useEffect, useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { ORDER_STATUS } from '../../../utils/constants';

export default function OrderItem(props) {

    const { order } = props

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Actualiza el tamaño de la pantalla cuando cambia el tamaño de la ventana
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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
            <Card.Header as="h5" className='text-end fs-6'>
                {getTimeAgo(order.crated_at)}
            </Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                    <Image src={order.product_data.image} style={{ width: windowWidth > 768 ? '145px' : '50px', height: windowWidth>768 ? '100px' : '50px' }} />
                    {windowWidth>768 ? <Card.Title>{order.product_data.title}</Card.Title> : <span>{order.product_data.title}</span>}
                </div>
                {order.status == ORDER_STATUS.PENDING ? <span>En Marcha</span> : <span>Entregado</span>}
            </Card.Body>
        </Card>
    )
}
