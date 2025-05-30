import { BASE_API, ORDER_STATUS } from "../utils/constants";

export async function getOrdersByTableApi(idTable, status = "", ordering = ""){
    try {
        const tableFilter = `table=${idTable}`
        const statusFilter = `status=${status}`
        const closeFilter = `close=False`

        const url = `${BASE_API}/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;
        const response = await fetch(url);
        const result = await response.json();
        return result
    } catch (error) {
        throw error
    }
}


export async function checkDeliveredOrderApi(id){
    try {
        const url = `${BASE_API}/orders/${id}/`;
        const params = {
            method : "PATCH",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                status : ORDER_STATUS.DELIVERED
            })
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result
    } catch (error) {
        throw error
    }
}

export async function addOrderToTableApi(idTable,idProduct){
    try {
        const url = `${BASE_API}/orders/`;
        const params = {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                status : ORDER_STATUS.PENDING,
                table : idTable,
                product : idProduct,

            })
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw(error);
    }
}

export async function addPaymentToOrderApi(idOrder,idPayment){
    try {
        const url = `${BASE_API}/orders/${idOrder}/`;
        const params = {
            method : "PATCH",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                payment : idPayment
            })
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return true;
    } catch (error) {
        throw error
    }
}


export async function closeOrderApi(idOrder){
    try {
        const url = `${BASE_API}/orders/${idOrder}/`;
        const params = {
            method : "PATCH",
            headers : {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                close : true
            })
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}


export async function getOrdersByPaymentApi(idPayment){
    try {
        const paymentfilter = `payment=${idPayment}`
        const url = `${BASE_API}/orders/?${paymentfilter}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}
