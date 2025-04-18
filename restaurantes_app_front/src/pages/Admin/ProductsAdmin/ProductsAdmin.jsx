import React, { useEffect, useState } from 'react'
import Header from '../../../layouts/AdminLayout/Components/Header/Header'
import ProductsTable from './ProductsTable'
import { useProduct } from '../../../hooks/useProduct'
import ModalBasic from '../../../layouts/AdminLayout/Components/Modal/ModalBasic'
import AddEditProductForm from './AddEditProductForm'
import DeleteModal from '../../../layouts/AdminLayout/Components/Modal/DeleteModal'

export default function ProductsAdmin() {
    const { getProducts, createProduct, deleteProduct, updateProduct ,products, loading } = useProduct();

    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(null);
    const [titleModal, setTitleModal] = useState(null);

    const [showDelete, setShowDelete] = useState(false);
    const [item, setItem] = useState(null);
    const [itemId, setItemId] = useState(null);

    const [refetch, setRefetch] = useState(false)

    const openCloseModal = () => setShowModal((prev) => !prev);

    const addProductFunction = async (data) => {
        await createProduct(data);
        openCloseModal();
        setRefetch((prev) => !prev);
    }
    const editProductFunction = async (id,data) => {
        await updateProduct(id,data);
        openCloseModal();
        setRefetch((prev) => !prev);
    }

    const deleteProductFunction = async () => {
        await deleteProduct(itemId);
        setShowDelete(false)
        setRefetch((prev) => !prev);
    }

    const addProduct = () => {
        setTitleModal("Nuevo Producto");
        setContent(<AddEditProductForm btnTitle={"Agregar Producto"} action={addProductFunction} />)
        openCloseModal();
    }

    const editProduct = (product) => {
        setTitleModal("Actualizar Producto");
        setContent(<AddEditProductForm btnTitle={"Actualizar Producto"} action={editProductFunction} product={product}/>)
        openCloseModal();
    }

    useEffect(() => {
        getProducts();
    }, [refetch])
    return (
        <div>
            <Header title={"Productos"} btnTitle={"Nuevo Producto"} btnClick={addProduct} />
            {loading ? <p>Cargando...</p> : products ? (
                <ProductsTable products={products} setShowDelete={setShowDelete} setItem={setItem} setItemId={setItemId} editProduct={editProduct}/>
            ) : <h1>No hay Categorias Disponibles</h1>}
            <ModalBasic show={showModal} title={titleModal} onClose={openCloseModal} children={content} />
            <DeleteModal show={showDelete} setShow={setShowDelete} title={"Eliminar Producto"} item={item} itemId={itemId} action={deleteProductFunction}/>
        </div>
    )
}
