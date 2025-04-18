import React, { useState, useEffect } from 'react'
import "./TableListAdmin.scss"
import TableAdmin from './TableAdmin';

export default function TablesListAdmin(props) {
    const { tables, reload } = props;

    return (
        <div className='table-list-admin'>
            {tables.map((table) => (
                <TableAdmin key={table.number} table={table} reload={reload} />
            ))}
        </div>
    );
}
