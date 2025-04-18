import React, { useState } from "react";
import { useAuth } from "./useAuth";
import { getProductsApi, createProductApi, deleteProductApi, updateProductApi, getProductsByCategoryApi, getProductByIdApi } from "../api/products";
import { Facebook } from "react-bootstrap-icons";

export function useProduct() {

    const [error, setError] = useState(null)
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const { auth } = useAuth();

    const getProducts = async () => {
        try {
            setLoading(true);
            const result = await getProductsApi();
            setProducts(result);
            setLoading(false);
            console.log(result);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }

    const createProduct = async (data) => {
        try {
            console.log(auth.token)
            await createProductApi(data, auth.token);
        } catch (error) {
            setError(error)
        }
    }

    const deleteProduct = async (id) => {
        try {
            await deleteProductApi(id, auth.token);
        } catch (error) {
            setError(error)
        }
    }

    const updateProduct = async (id,data) => {
        try {
            await updateProductApi(id, data ,auth.token);
        } catch (error) {
            setError(error)
        }
    }

    const getProductsByCategory = async(categoryId) => {
        try {
            setLoading(true)
            const result = await getProductsByCategoryApi(categoryId);
            setProducts(result);
            setLoading(false);
            console.log(result);
        } catch (error) {
            setLoading(false)
            throw error
        }
    }

    const getProductById = async (productId) => {
        try {
            const result = await getProductByIdApi(productId);
            return result;
        } catch (error) {
            throw error;
        }
    }

    return {
        loading,
        products,
        error,
        getProducts,
        createProduct,
        deleteProduct,
        updateProduct,
        getProductsByCategory,
        getProductById
    };

}