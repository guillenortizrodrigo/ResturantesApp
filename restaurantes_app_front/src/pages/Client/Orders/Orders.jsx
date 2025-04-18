import React, { useEffect, useRef, useState } from 'react';
import { useOrder } from '../../../hooks/useOrder';
import { Link, useParams } from 'react-router-dom';
import OrdersList from './OrdersList';
import { Button } from 'react-bootstrap';
import PaymentModal from '../../../layouts/ClientLayout/Modal/PaymentModal';
import { useTable } from '../../../hooks/useTable';
import { usePayment } from '../../../hooks/usePayment';

export default function Orders() {
    const { getOrdersByTable, orders, loading, addPaymentToOrder } = useOrder();
    const { createPayment, getPaymentByTable } = usePayment();
    const { getTableByNumber } = useTable();
    const { tableNumber } = useParams();

    const [isRequestAccount, setIsRequestAccount] = useState(false)
    const [isFetching, setIsFetching] = useState(false);
    const [reload, setReload] = useState(false); // Estado que forzará la recarga
    const intervalRef = useRef(null);

    const [showModal, setShowModal] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("CASH")
    const [totalPayment, setTotalPayment] = useState(null);

    const onShowModal = () => { setShowModal(prev => !prev) }

    // Efecto para obtener pedidos al inicio y cuando se cambie `reload`
    useEffect(() => {
        if (!isFetching) {
            setIsFetching(true);
            getOrdersByTable(tableNumber, "", "ordering=-status, -created_at")
                .finally(() => {
                    setIsFetching(false);
                });
        }
    }, [reload]);

    useEffect(()=>{
        if(orders){
            let total = 0;
            orders.forEach(order => {
                total += Number(order.product_data.price);
            });
            setTotalPayment(total)
            setIsFetching(false);
        }
    },[orders])

    useEffect(()=>{
        (async()=>{
            let tableId = await getTableByNumber(tableNumber);
            const response = await getPaymentByTable(tableId[0].id);
            if(response.length > 0) setIsRequestAccount(true);
        })()
    },[])

    // Efecto para ejecutar fetchOrders automáticamente cada 5s
    useEffect(() => {
        (async () => {
            intervalRef.current = setInterval(() => {
                setReload(prev => !prev); // Cambiamos el estado para forzar la recarga
            }, 5000);

            return () => clearInterval(intervalRef.current);
        })()
        // Limpiar el intervalo al desmontar
    }, []);

    const onCreatePayment = async() => {
        let tableId = await getTableByNumber(tableNumber);

        const paymentData = {
            table: tableId[0].id,
            totalPayment,
            paymentType: paymentMethod,
            statusPayment: "PENDING"
        }

        const payment = await createPayment(paymentData);

        for await (const order of orders){
            await addPaymentToOrder(order.id, payment.id);
        }
        setIsRequestAccount(true)
        onShowModal();
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <Button as={Link} to={`/client/${tableNumber}`} size="sm">
                    Regresar a las Categorías
                </Button>
                {orders?.length > 0 && 
                <Button variant={!isRequestAccount ? 'success' : 'secondary'} disabled={isRequestAccount} onClick={onShowModal} size="sm">
                    {!isRequestAccount ? "Pedir la cuenta" : "La cuenta ya esta pedida"}
                </Button>}
                
            </div>
            {loading && !orders?.length ? <p>Cargando...</p> : <OrdersList orders={orders} />}
            {!loading && !orders?.length && <h1>No hay Pedidos Aún</h1>}
            <PaymentModal show={showModal} onClose={onShowModal} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} totalPayment={totalPayment} onCreatePayment={onCreatePayment} />
        </div>
    );
}
