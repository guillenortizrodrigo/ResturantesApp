import React, { useEffect, useState } from 'react'
import Header from '../../../layouts/AdminLayout/Components/Header/Header'
import CategoriesTable from './CategoriesTable'
import { useCategory } from '../../../hooks/useCategory'
import ModalBasic from '../../../layouts/AdminLayout/Components/Modal/ModalBasic'
import AddEditCategoryForm from './AddEditCategoryForm'
import DeleteModal from '../../../layouts/AdminLayout/Components/Modal/DeleteModal'
export default function CategoriesAdmin() {

  const { getCategories, createCategory, deleteCategory, updateCategory ,categories, loading } = useCategory()

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);
  const [titleModal, setTitleModal] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [item, setItem] = useState(null);
  const [itemId, setItemId] = useState(null);

  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    getCategories();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const addCategoryFunction = async(data) => {
    await createCategory(data);
    openCloseModal();
    setRefetch((prev)=>!prev);
  }

  const updateCategoryFunction = async(data, id) => {
    await updateCategory(id,data);
    openCloseModal();
    setRefetch((prev)=>!prev);
  }

  const deleteCategoryFunction = async() => {
    await deleteCategory(itemId);
    setShowDelete(false);
    setRefetch((prev)=>!prev);
  }

  const addCategory = () => {
    setTitleModal("Nueva Categoria");
    setContent(<AddEditCategoryForm btnTitle={"Agregar Categoria"} action={addCategoryFunction}/>)
    openCloseModal();
  }

  const editCategory = (category) => {
    setTitleModal("Editar Categoria");
    setContent(<AddEditCategoryForm btnTitle={"Editar Categoria"} action={updateCategoryFunction} category={category}/>)
    openCloseModal();
  }

  return (
    <div>
      <Header title={"Categorias"} btnTitle={"Agregar Categoria"} btnClick={addCategory} />
      {loading ? <p>Cargando...</p> : categories ? (
        <CategoriesTable categories={categories} setShowDelete={setShowDelete} setItem={setItem} setItemId={setItemId} editCategory={editCategory}/>
      ) : <h1>No hay Categorias Disponibles</h1>}
      <ModalBasic show = {showModal} title = {titleModal} onClose={openCloseModal} children={content}/>
      <DeleteModal show={showDelete} setShow={setShowDelete} title={"Eliminar Categoria"} item={item} itemId={itemId} action={deleteCategoryFunction}/>
    </div>
  )
}
