import React, { useState } from "react";
import { getCategoriesApi, createCategoryApi, deleteCategoryApi, updateCategoryApi } from "../api/categories";
import { useAuth } from "./useAuth"

export function useCategory(){

    const [error, setError] = useState(null)
    const [categories, setCategories] = useState(null)
    const [loading, setLoading] = useState(true)
    const {auth} = useAuth();

    const getCategories = async() => {
        try {
            setLoading(true);
            const result = await getCategoriesApi();
            setCategories(result);
            console.log(result)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
            throw error
        }
    }

    const createCategory = async(data) => {
        try {
            console.log(auth.token)
            await createCategoryApi(data,auth.token);
        } catch (error) {
            setError(error)
        }
    }

    const deleteCategory = async(id) => {
        try {
            await deleteCategoryApi(id,auth.token);
        } catch (error) {
            setError(error)
        }
    }

    const updateCategory = async(id,data) => {
        try {
            await updateCategoryApi(id,data,auth.token);
        } catch (error) {
            setError(error);
        }
    }


    return {
        getCategories,
        createCategory,
        deleteCategory,
        updateCategory,
        error,
        categories,
        loading,
    }
}