import React from 'react'
import OrderItem from './OrderItem'

export default function ListOrder(props) {
    const { orders, onReloadOrders } = props
  return (
    <div className='list-orders'>
        {orders.map((order) =>(
            <OrderItem key={order.id} order={order} onReloadOrders={onReloadOrders}/>
        ))}
    </div>
  )
}
