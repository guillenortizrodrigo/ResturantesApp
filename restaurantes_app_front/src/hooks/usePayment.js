import { useState } from "react";
import { closePaymentApi, createPaymentApi, getPaidPaymentsApi, getPaymentByTableApi } from "../api/payments"

export function usePayment(){

    const [payments, setPayments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const createPayment = async(paymentData) =>{
        try {
            const response = await createPaymentApi(paymentData)
            console.log(response);
            return response
        } catch (error) {
            throw error
        }
    }

   const getPaymentByTable = async(idTable) => {
    try {
        const response = await getPaymentByTableApi(idTable);
        return response;
    } catch (error) {
        throw error
    }
   }

   const closePayment = async(idPayment) => {
    try {
        const response = await closePaymentApi(idPayment);
        return response;   
    } catch (error) {
        throw error
    }
   }

   const getPaidPayments = async() => {
    try {
        setLoading(true);
        const response = await getPaidPaymentsApi();
        setPayments(response);
        console.log(response);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        setError(error);
        throw error
    }
   }

    return{
        getPaidPayments,
        createPayment,
        getPaymentByTable,
        closePayment,
        payments,
        loading
    }
}