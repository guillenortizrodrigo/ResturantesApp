import React, { useEffect, useState } from 'react'
import Header from '../../../layouts/AdminLayout/Components/Header/Header'
import { usePayment } from '../../../hooks/usePayment'
import PaymentsListAdmin from './PaymentsListAdmin';
import ModalBasic from '../../../layouts/AdminLayout/Components/Modal/ModalBasic';
import PaymentProductList from './PaymentProductList';

export default function PaymentHistoryAdmin() {
  const { payments, getPaidPayments, loading } = usePayment();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, seTtitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null)

  useEffect(() => {
    getPaidPayments()
  }, []);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const showDetails = (payment) => {
    seTtitleModal(`Pedidos de la mesa ${payment.table_data.number}`);
    setContentModal(<PaymentProductList payment = {payment}/>)
    openCloseModal();
  }

  return (
    <div>
      <Header title={"Historial de Pagos"} />
      {loading ? <p>Cargando...</p> : payments ? (
        <PaymentsListAdmin payments={payments} openCloseModal={openCloseModal} showDetails={showDetails}/>
      ) : <h1>Aun no hay Pagos</h1>}
      <ModalBasic title={titleModal}  show={showModal} onClose={openCloseModal} children = {contentModal} size={"large"}/>
    </div>
  )
}
