import React, { useEffect, useState } from 'react'
import { useOrder } from '../../../../hooks/useOrder'
import { useParams } from 'react-router-dom'
import Header from '../../../../layouts/AdminLayout/Components/Header/Header'
import ListOrder from './ListOrder'
import { useTable } from '../../../../hooks/useTable'
import ModalBasic from '../../../../layouts/AdminLayout/Components/Modal/ModalBasic'
import AddOrderForm from './AddOrderForm'
import DeleteModal from '../../../../layouts/AdminLayout/Components/Modal/DeleteModal'
import PaymentModal from '../../../../layouts/AdminLayout/Components/Modal/PaymentModal'
import { usePayment } from '../../../../hooks/usePayment'
import PaymentDetail from './PaymentDetail'

export default function TableDetails() {

  const { loading, orders, error, getOrdersByTable, addOrderToTable, addPaymentToOrder } = useOrder()
  const { createPayment, getPaymentByTable } = usePayment();
  const { getTable } = useTable()
  const { id } = useParams();
  const [reloadOrders, setReloadOrders] = useState(false)
  const [tableId, setTableId] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);
  const [titleModal, setTitleModal] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const openClosePaymentModal = () => setShowPaymentModal((prev) => !prev);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onReloadOrders = () => setReloadOrders((prev) => !prev);

  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,crated_at")
  }, [reloadOrders]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id)
      response.length > 0 ? setPaymentData(response[0]) : setPaymentData(null) ;
    })()
  }, [reloadOrders]);

  useEffect(() => {
    (async () => {
      const response = await getTable(id);
      setTableId(response.number);
    })()
  }, [reloadOrders])

  const onCreatePayment = async (paymentMethod) => {
    let totalPayment = 0
    orders.forEach(order => {
      totalPayment += Number(order.product_data.price);
    });
    const paymentData = {
      table: id,
      totalPayment: totalPayment,
      paymentType: paymentMethod,
      statusPayment: "PENDING"
    }
    const payment = await createPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    onReloadOrders();
    openClosePaymentModal();
    
  }
  

  const addOrder = () => {
    setTitleModal(paymentData ? "Detalle de la cuenta" : "Nuevo Pedido");
    setContent(paymentData ? <PaymentDetail orders={orders} payment={paymentData} onReloadOrders={onReloadOrders} onClose={openCloseModal} /> : <AddOrderForm idTable={id} onReloadOrders={onReloadOrders} onClose={openCloseModal} />)
    openCloseModal();
  };

  return (
    <div>
      <Header
        title={`Pedidos de la mesa ${tableId}`}
        btnTitle={paymentData ? "Ver cuenta" : "Añadir Pedido"}
        btnClick={addOrder}
        btnTitle2={!paymentData ? "Generar Cuenta" : null}
        btnClick2={openClosePaymentModal} />
      {loading ? <p>Cargando...</p> : orders.length > 0 ? (
        <ListOrder orders={orders} onReloadOrders={onReloadOrders} />
      ) : <h1>No hay Pedidos para la mesa</h1>}
      <ModalBasic show={showModal} title={titleModal} onClose={openCloseModal} children={content} size={"large"} />
      <PaymentModal show={showPaymentModal} handleClose={openClosePaymentModal} action={onCreatePayment} />
    </div>
  )
}
