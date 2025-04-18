import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { Cash, CreditCard } from 'react-bootstrap-icons';
import { usePayment } from '../../../../hooks/usePayment';
import { useOrder } from '../../../../hooks/useOrder';

export default function PaymentDetail(props) {
    const { closePayment } = usePayment();
    const { closeOrder } = useOrder();
    const { orders, payment, onClose, onReloadOrders } = props

    const closeTable = async() =>{
        const response = await closePayment(payment.id);
        console.log(response);
        for await (const order of orders){
            console.log(order);
            await closeOrder(order.id);
        }
        console.log("CERRANDO LA CUENTA");
        onReloadOrders()
        onClose();
    }
    return (
        <div>
            <Table variant='dark' className='rounded'>
                <tbody>
                    <tr>
                        <td>Mesa</td>
                        <td className='text-center'>{payment.table_data.number}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td className='text-center'>{payment.totalPayment}</td>
                    </tr>
                    <tr>
                        <td>Forma de Pago</td>
                        <td className='text-center'>
                        {payment.paymentType == "CARD" ? <CreditCard/> : <Cash/>}
                            
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="success" className="w-100" onClick={closeTable}>Pagar Cuenta</Button>
        </div>

    )
}
