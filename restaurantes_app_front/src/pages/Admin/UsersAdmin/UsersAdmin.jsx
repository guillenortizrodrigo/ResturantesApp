import React, { useEffect, useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import Header from '../../../layouts/AdminLayout/Components/Header/Header';
import UsersTable from './UsersTable';
import ModalBasic from '../../../layouts/AdminLayout/Components/Modal/ModalBasic';
import AddEditUserForm from './AddEditUserForm';
import { getToken } from '../../../api/token';
import DeleteModal from '../../../layouts/AdminLayout/Components/Modal/DeleteModal';

export default function UsersAdmin() {

    const { loading, users, getUsers, createUser, updateUser, deleteUser } = useUser();

    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(null);
    const [titleModal, setTitleModal] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [item, setItem] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [refetch, setRefetch] = useState(false)


    useEffect(() => {
        getUsers();
    }, [refetch]);

    const createUserFunction = async(formData) => {
        const token = getToken();
        await createUser(token,formData);
        openCloseModal();
        setRefetch((prev) => !prev )
    }

    const updateUserFunction = async(formData, id) => {
        const token = getToken();
        await updateUser(token,formData,id);
        openCloseModal();
        setRefetch((prev) => !prev )
    }

    const deleteUserFunction = async(id)=> {
        const token = getToken();
        await deleteUser(token, id);
        setShowDelete(false);
        setRefetch((prev) => !prev )
    }
    
    const openCloseModal = () => setShowModal((prev) => !prev);

    const addUser = () =>{
        setTitleModal("Nuevo Usuario");
        setContent(<AddEditUserForm action = {createUserFunction} btnTitle={"Crear Usuario"}/>);
        openCloseModal();
    }

    const editUser = (user) =>{
        setTitleModal("Editar Usuario");
        setContent(<AddEditUserForm action = {updateUserFunction} user = {user} btnTitle={"Editar Usuario"}/>);
        openCloseModal();
    } 

    return (
        <div>
            <Header title="Usuarios" btnTitle="Nuevo Usuario" btnClick={addUser}/>
            {loading ? <p>Cargando...</p> : users ? (
                <UsersTable users={users} editUser={editUser} setShowDelete={setShowDelete} setItem={setItem} setItemId={setItemId}/>
            ) : <h1>No hay Usuarios Disponibles</h1>}
            <ModalBasic show = {showModal} title = {titleModal} onClose={openCloseModal} children={content}/>
            <DeleteModal show={showDelete} setShow={setShowDelete} title={"Eliminar Usuario"} item={item} itemId={itemId} action={deleteUserFunction}/>
        </div>
    );
}