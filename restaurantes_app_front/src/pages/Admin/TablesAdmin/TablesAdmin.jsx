import React, { useEffect, useState } from 'react'
import { useTable } from '../../../hooks/useTable'
import Header from '../../../layouts/AdminLayout/Components/Header/Header';
import TablesTable from './TablesTable';
import ModalBasic from '../../../layouts/AdminLayout/Components/Modal/ModalBasic'
import AddEditTableForm from './AddEditTableForm';
import DeleteModal from '../../../layouts/AdminLayout/Components/Modal/DeleteModal';

export default function TablesAdmin() {

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);
  const [titleModal, setTitleModal] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [item, setItem] = useState(null);
  const [itemId, setItemId] = useState(null);

  const { loading, error, tables, getTables, createTable, updateTable, deleteTable } = useTable();

  const [refetch, setRefetch] = useState(false)

  const openCloseModal = () => setShowModal((prev) => !prev);

  useEffect(() => {
    getTables()
  }, [refetch])

  const addTableFunction = async (data) => {
    console.log(data);
    await createTable(data);
    setShowModal(false)
    setRefetch((prev) => !prev);
  }

  const editTableFunction = async (id, data) => {
    await updateTable(id, data);
    setShowModal(false)
    setRefetch((prev) => !prev);
  }

  const deleteTableFunction = async () => {
    await deleteTable(itemId);
    setShowDelete(false)
    setRefetch((prev) => !prev);
  }

  const addTable = () => {
    setTitleModal("Mesa Nueva");
    setContent(<AddEditTableForm btnTitle={"Agregar Mesa"} action={addTableFunction} />)
    openCloseModal();
  }

  const editTable = (table) => {
    setTitleModal("Edicion de Mesa");
    setContent(<AddEditTableForm btnTitle={"Actualizar Mesa"} action={editTableFunction} table={table} />)
    openCloseModal();
  }

  return (
    <div>
      <Header title={"Mesas"} btnTitle={"Crear Mesa Nueva"} btnClick={addTable} />
      {loading ? <p>Cargando...</p> : tables ? (
        <TablesTable tables={tables} editTable={editTable} setShowDelete={setShowDelete} setItem={setItem} setItemId={setItemId}/>
      ) : <h1>No hay Mesas Disponibles</h1>}
      <ModalBasic show={showModal} title={titleModal} onClose={openCloseModal} children={content} />
      <DeleteModal show={showDelete} setShow={setShowDelete} title={"Eliminar Mesa"} item={item} itemId={itemId} action={deleteTableFunction}/>
    </div>

  )
}
