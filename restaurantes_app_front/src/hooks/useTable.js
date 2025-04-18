import React, { useState } from "react";
import { useAuth } from "./useAuth";
import { getTablesApi, createTableApi,updateTableApi,deleteTableApi, getTableApi, getTableByNumberApi } from "../api/tables"

export function useTable() {

    const [error, setError] = useState(null)
    const [tables, setTables] = useState(null)
    const [loading, setLoading] = useState(true)
    const { auth } = useAuth();

    const getTables = async () => {
        try {
            setLoading(true);
            const result = await getTablesApi();
            setTables(result);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    const createTable = async (data) => {
        try {
            await createTableApi(data, auth.token);
        } catch (error) {
            setError(error)
        }
    }

    const updateTable = async (id,data) => {
        try {
            await updateTableApi(id,data, auth.token);
        } catch (error) {
            setError(error)
        }
    }

    const deleteTable = async (id) => {
        try {
            await deleteTableApi(id, auth.token);
        } catch (error) {
            setError(error)
        }
    }

    const getTable = async(id) =>{
        try {
            const response = await getTableApi(id);
            return response;
        } catch (error) {
            setError(error)
        }
    }

    const getTableByNumber = async(tableNumber) => {
        try {
            const response = await getTableByNumberApi(tableNumber);
            return response;
        } catch (error) {
            setError(error)
        }
    }

    return {
        getTables,
        createTable,
        updateTable,
        deleteTable,
        getTable,
        getTableByNumber,
        tables,
        loading,
        error
    }
}