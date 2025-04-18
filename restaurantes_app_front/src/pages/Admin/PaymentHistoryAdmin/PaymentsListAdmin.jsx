import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Cash, CreditCard, Eye } from 'react-bootstrap-icons'

export default function PaymentsListAdmin(props) {
    const { payments, showDetails  } = props
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
        <Table variant='dark' className='rounded'>
            <thead>
                <tr className='text-center'>
                    <td>ID</td>
                    <td>Mesa</td>
                    <td>Total</td>
                    <td>Tipo de Pago</td>
                    <td>Fecha</td>
                    <td>Ver Detalles</td>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id} className='text-center'>
                        <td>{payment.id}</td>
                        <td>{payment.table_data.number}</td>
                        <td>{payment.totalPayment}</td>
                        <td>
                            {payment.paymentType == "CARD" ? <CreditCard /> : <Cash />}
                        </td>
                        <td>{getTimeAgo(payment.created_at)}</td>
                        <td >
                            <Button variant='primary' size='sm' onClick={() => showDetails(payment)}>
                                <Eye/>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
