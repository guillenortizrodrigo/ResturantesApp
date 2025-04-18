import { BASE_API } from "../utils/constants";

export async function getTablesApi(){
    try {
        const url = `${BASE_API}/tables/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function createTableApi(formData,token){
    try {
        const url = `${BASE_API}/tables/`
        const params = {
            method : "POST",
            headers : {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body : JSON.stringify(formData)
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateTableApi(id,formData,token){
    try {
        const url = `${BASE_API}/tables/${id}/`
        const params = {
            method : "PATCH",
            headers : {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body : JSON.stringify(formData)
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deleteTableApi(id,token){
    try {
        const url = `${BASE_API}/tables/${id}/`
        const params = {
            method : "DELETE",
            headers : {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return true;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getTableApi(id){
    try {
        const url = `${BASE_API}/tables/${id}/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw(error)
    }
}

export async function getTableByNumberApi(tableNumber) {
    try {
        const url = `${BASE_API}/tables/?number=${tableNumber}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}