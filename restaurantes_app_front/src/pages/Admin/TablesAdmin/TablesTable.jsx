import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { PencilSquare, QrCode, Trash } from 'react-bootstrap-icons';
import ModalBasic from '../../../layouts/AdminLayout/Components/Modal/ModalBasic';
import QRCode from "react-qr-code";



export default function TablesTable(props) {
    const { tables, editTable, setItem, setItemId, setShowDelete } = props

    const [show, setShow] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    
    const openCloseModal = () => setShow(prev => !prev);

    const deleteFunction = (table) => {
        setItem(`la mesa ${table.number}`);
        setItemId(table.id);
        setShowDelete(true);
    }

    const showQr = (table) => {
        console.log(table);
        setContentModal(
            <div>
               <QRCode value={`http://192.168.0.11:5173/client/${table.number}`} />
            </div>
        )
        openCloseModal();
    }
    return (
        <div>
            <Table variant='dark' className='rounded'>
            <thead>
                <tr className='text-center'>
                    <th>Mesa</th>
                    <th className="text-end"></th>
                </tr>
            </thead>
            <tbody>
                {tables.map((table) => (
                    <tr key={table.id} className='text-center'>
                        <td>{table.number}</td>
                        <td>
                        <Button variant="primary" size="sm" className="action-btn me-2" onClick={() => showQr(table)}>
                                <QrCode />
                            </Button>
                            <Button variant="primary" size="sm" className="action-btn me-2" onClick={() => editTable(table)}>
                                <PencilSquare />
                            </Button>
                            <Button variant="danger" size="sm" className="action-btn" onClick={() => deleteFunction(table)}>
                                <Trash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <ModalBasic 
            show = {show}
            onClose = {openCloseModal}
            title = "Codigo Qr"
            children = {contentModal}
        />
        </div>
        
    )
}
