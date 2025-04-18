import React, { useEffect, useState } from 'react';
import { getOrdersByTableApi } from '../../../api/orders';
import { Badge } from 'react-bootstrap';
import tableIcon from "../../../assets/table.svg";
import { ORDER_STATUS } from '../../../utils/constants';
import { Link } from 'react-router-dom';
import { usePayment } from '../../../hooks/usePayment';

export default function TableAdmin({ table, reload }) {
    const [orders, setOrders] = useState([]);
    const [tableBusy, setTableBusy] = useState(false)
    const {getPaymentByTable} = usePayment()
    const [pendingPayments, setPendingPayments] = useState(false)

    useEffect(() => {
        (async () => {
            const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING);
            setOrders(response); // Guardar los pedidos en el estado
        })();
    }, [reload]);

    useEffect(() => {
        (async () => {
            const response = await getPaymentByTable(table.id);
            if(response.length > 0){
                setPendingPayments(true);
            }else{
                setPendingPayments(false)
            }
        })();
    }, [reload]);

    useEffect(() => {
        (async () => {
            const response = await getOrdersByTableApi(table.id, ORDER_STATUS.DELIVERED);
            if(response.length > 0) setTableBusy(response);
            else setTableBusy(false)
        })();
    }, [reload]);

    return (
        <Link to={`/admin/table/${table.id}`} className={`table-list-admin__image ${orders.length <= 0 && pendingPayments ? 'payment' : orders.length > 0 ? 'pending' : tableBusy.length > 0 ? 'busy' : ''}`}>
            <img
                src={tableIcon}
                alt={`Mesa ${table.number}`}
            />
            {orders.length > 0 && <Badge bg="danger" className="table-list-admin__badge">
                {orders.length}
            </Badge>}
            {pendingPayments && <Badge bg="danger" className="table-list-admin__badge">
                {"CUENTA"}
            </Badge>}
            <p>Mesa {table.number}</p>
        </Link>

    );
}
