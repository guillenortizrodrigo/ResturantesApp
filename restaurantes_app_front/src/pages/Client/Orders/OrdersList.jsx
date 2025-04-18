import React from 'react'
import OrderItem from './OrderItem';

export default function OrdersList(props) {
    const {orders} = props;
  return (
    <div>
      {orders.map((order) => (
        <OrderItem key={order.id} order = {order}/>
      ))}
    </div>
  )
}
