import React, { useEffect, useState } from 'react'
import Header from '../../../layouts/AdminLayout/Components/Header/Header'
import { useTable } from '../../../hooks/useTable'
import TablesListAdmin from './TablesListAdmin'
import { ArrowClockwise } from 'react-bootstrap-icons';
import { FormCheck } from 'react-bootstrap';

export default function OrdersAdmin() {

    const { loading, tables, getTables } = useTable();
    const [reload, setReload] = useState(false);
    const [autoReload, setAutoReload] = useState(false)

    const onReload = () => setReload((prev) => !prev);
    const onAutoReload = () => {
        setAutoReload((prev) => !prev)
    }

    let timeoutId;

    useEffect(() => {
        if (autoReload) {
            const autoRealoadAction = () => {
                onReload();
                timeoutId = setTimeout(() => {
                    autoRealoadAction();
                }, 5000);
            };
            autoRealoadAction();
        }

        return () => {
            clearTimeout(timeoutId); // Limpia el timeout cuando autoReload cambie
        };
    }, [autoReload]);

    useEffect(() => {
        getTables();
    }, [])


    return (
        <div>
            <Header title={'Restaurante'} btnTitle={<ArrowClockwise />} btnColor={"primary"} btnClick={onReload}
                child={<FormCheck
                    reverse
                    type="switch"
                    id="custom-switch"
                    label={"Refrescar Automaticamente"}
                    checked={autoReload}
                    onChange={onAutoReload}
                    className="text-white mx-3"
                />} />
            {loading ? <p>Cargando...</p> : tables ? (
                <TablesListAdmin tables={tables} reload={reload} />
            ) : <h1>No hay Mesas Disponibles</h1>}
        </div>
    )
}
