import { BASE_API } from "../utils/constants";

export async function getProductsApi() {
    try {
        const url = `${BASE_API}/products/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function createProductApi(data, token) {
    try {
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("title", data.title);
        formData.append("category",data.category);
        formData.append("price",data.price);
        formData.append("active",data.active);

        const url = `${BASE_API}/products/`;
        const params = {
            method : "POST",
            headers : {
                Authorization: `Bearer ${token}`,
            },
            body : formData
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }    
}

export async function deleteProductApi(id,token) {
    try {
        console.log("ESTAMOS AQUI?");
        console.log(id);
        const url = `${BASE_API}/products/${id}/`;
        const params = {
            method : "DELETE",
            headers : {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url,params);
        return true;
    } catch (error) {
        throw error;
    }    
}

export async function updateProductApi(id,data,token){
    try {
        const url = `${BASE_API}/products/${id}/`;
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category",data.category);
        formData.append("price",data.price);
        formData.append("active",data.active);
        if(data.image) formData.append('image', data.image);
        const params = {
            method : "PATCH",
            headers : {
                Authorization: `Bearer ${token}`,
            },
            body : formData
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function getProductsByCategoryApi(categoryId) {
    try {
        const url = `${BASE_API}/products/?category=${categoryId}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function getProductByIdApi(productId) {
    try {
        const url = `${BASE_API}/products/${productId}/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}
