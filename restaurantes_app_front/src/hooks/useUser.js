import React, { useState } from "react";
import { getMeApi, getUsersApi, createUserApi, updateUserApi, deleteUserApi } from "../api/user";
import { useAuth } from "./useAuth"

export function useUser(){

    const [error, setError] = useState(null)
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const { auth } = useAuth()

    const getMe = async(token) => {
        try {
            const result = await getMeApi(token);
            return result;
        } catch (error) {
            throw error;
        }
    }

    const getUsers = async() => {
        try {
            setLoading(true);
            const result  = await getUsersApi(auth.token);
            setLoading(false);
            setUsers(result)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const createUser = async(token,formData) => {
        try {
            const result = await createUserApi(token,formData);
            return result;
        } catch (error) {
            setError(error);
        }
    }

    const updateUser = async(token,formData,id) =>{
        try {
            const result = await updateUserApi(token,formData,id);
            return result;
        } catch (error) {
            throw error
        }
    }

    const deleteUser = async(token,id) =>{
        try {
            const result = await deleteUserApi(token,id);
            return result;
        } catch (error) {
            throw error
        }
    }

    return {
        getMe,
        getUsers,
        createUser,
        updateUser,
        deleteUser,
        error,
        users,
        loading
    }
}