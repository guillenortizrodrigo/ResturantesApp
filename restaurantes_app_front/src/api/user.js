import { BASE_API } from "../utils/constants";

export async function loginApi(formData){
    try {
        const url = `${BASE_API}/auth/login/`
        const params = {
            method : "POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(formData)
        }

        const response = await fetch(url,params);

        if(response.status !== 200){
            throw new Error("Usuario o contraseña incorrectos");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function getMeApi(token) {
    try {
        const url = `${BASE_API}/auth/me/`
        const params = {
            headers : {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result
    } catch (error) {
        throw error 
    }
}

export async function getUsersApi(token){
    try {
        const url = `${BASE_API}/users/`
        const params = {
            headers : {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function createUserApi(token,formData){
    try {
        const url = `${BASE_API}/users/`
        console.log(url);
        console.log(formData);
        console.log(token);
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
        throw error
    }
}

export async function updateUserApi(token,formData,id) {
    try {
        const url = `${BASE_API}/users/${id}/`; 

        const params = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function deleteUserApi(token,id){
    try {
        const url = `${BASE_API}/users/${id}/`; 
        const params = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url,params);
        return true;
    } catch (error) {
        throw error;
    }
}