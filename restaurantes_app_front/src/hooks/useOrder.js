import React, { useState } from "react";
import { getOrdersByTableApi, checkDeliveredOrderApi, addOrderToTableApi, addPaymentToOrderApi, closeOrderApi, getOrdersByPaymentApi } from "../api/orders";

export function useOrder() {

    const [error, setError] = useState(null)
    const [orders, setOrders] = useState(null)
    const [loading, setLoading] = useState(true)

    const getOrdersByTable = async(idTable,status,ordering) =>{
        try {
            setLoading(true)
            const response = await getOrdersByTableApi(idTable,status,ordering)
            setOrders(response);
            setLoading(false)
        } catch (error) {
            setError(error);
            throw(error);
            setLoading(false);
        }
    }

    const checkDeliveredOrder = async(id) =>{
        try {
            const response = await checkDeliveredOrderApi(id);
            console.log("CHECK DELIVERED API ", response);
        } catch (error) {
            throw(error)
        }
    }

    const addOrderToTable = async(idTable,idProduct) =>{
        try {
            const response = await addOrderToTableApi(idTable,idProduct);
            return response;
        } catch (error) {
            throw(error);
        }
    }

    const addPaymentToOrder = async(idOrder,idPayment) =>{
        try {
            const flag = await addPaymentToOrderApi(idOrder,idPayment);
            return flag;
        } catch (error) {
            throw error
        }
    }

    const closeOrder = async(idOrder) => {
        try {
            const result = await closeOrderApi(idOrder);
            return result;
        } catch (error) {
            throw error
        }
    }

    const getOrdersByPayment = async(idPayment) => {
        try {
            const result = await getOrdersByPaymentApi(idPayment);
            setOrders(result);
        } catch (error) {
            throw error
        }
    }

    return{
        error,
        orders,
        loading,
        getOrdersByTable,
        checkDeliveredOrder,
        addOrderToTable,
        addPaymentToOrder,
        closeOrder,
        getOrdersByPayment
    }


}