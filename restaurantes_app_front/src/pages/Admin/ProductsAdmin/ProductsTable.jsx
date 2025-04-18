import React from 'react'
import { Table, Button, Image } from 'react-bootstrap'
import { PencilSquare, Trash, Check, X } from 'react-bootstrap-icons';

export default function ProductsTable(props) {
    const { products,setShowDelete, setItem, setItemId, editProduct } = props;
    const deleteProduct = (product) => {
        setItem(`el producto ${product.title}`); // Corregido para interpolación de variables
        setItemId(product.id);
        setShowDelete(true);
    };
    return (
        <Table variant='dark' className='rounded'>
            <thead>
                <tr className="text-center">
                    <th>Producto</th>
                    <th>Imagen</th>
                    <th>Precio</th>
                    <th>Categoria</th>
                    <th>Activo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="text-center align-middle">
                        <td >{product.title}</td>
                        <td><Image src={product.image} style={{ width: '125px', height: '70px' }} /></td>
                        <td>{product.price}</td>
                        <td>{product.category_data.title}</td>
                        <td>{product.active ? <Check className="text-success" /> : <X className="text-success" />}</td>
                        <td>
                            <Button variant="primary" size="sm" className="action-btn me-2" onClick={() => editProduct(product)}>
                                <PencilSquare />
                            </Button>
                            <Button variant="danger" size="sm" className="action-btn" onClick={() => deleteProduct(product)}>
                                <Trash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>
    )
}
