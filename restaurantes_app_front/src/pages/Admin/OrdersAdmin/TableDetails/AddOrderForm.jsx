import React, { useState, useEffect } from 'react';
import { Form, Button, Image, ListGroup, Alert } from 'react-bootstrap';
import { useProduct } from '../../../../hooks/useProduct';
import { useOrder } from '../../../../hooks/useOrder';

export default function AddOrderForm(props) {

    const { onClose, onReloadOrders, idTable } = props;

    const { getProducts, products } = useProduct();

    const { addOrderToTable } = useOrder();

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [error, setError] = useState(false)

    useEffect(() => { getProducts(); }, []);

    const handleSelectChange = (event) => {
        const productId = Number(event.target.value);

        if (productId) {
            const product = products.find(p => p.id === productId);

            if (product) {
                setSelectedProducts([...selectedProducts, product]);
            }

            setSelectedProduct(""); // Limpiar el select después de seleccionar
            setError(false);
        }
    };

    const handleRemoveProduct = (index) => {
        const newProducts = [...selectedProducts];
        newProducts.splice(index, 1); // Eliminar solo el producto en la posición seleccionada
        setSelectedProducts(newProducts);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (selectedProducts.length <= 0) {
            setError(true);
            return;
        }

        for await (const product of selectedProducts){
            const response = await addOrderToTable(idTable,product.id);
        }
        onClose();
        onReloadOrders();
    }

    return (
        <Form className='bg-dark p-3' onSubmit={handleSubmit}>
            <Form.Select
                className='bg-dark text-light mb-3'
                name="product"
                value={selectedProduct}
                onChange={handleSelectChange}
            >
                <option value="">Selecciona un Producto</option>
                {products && products.map(product => (
                    <option key={product.id} value={product.id}>{product.title}</option>
                ))}
            </Form.Select>
            {error && <Alert variant="danger">Debe Seleccionar al menos 1 producto</Alert>}

            {selectedProducts.length > 0 &&
                <div style={{
                    maxHeight: '400px', // ✅ Altura máxima antes de mostrar scroll
                    overflowY: 'auto',   // ✅ Activa scroll cuando la lista se llena
                    borderRadius: '5px',
                    padding: '15px',
                }}>
                    <ListGroup>
                        {selectedProducts.map((product, index) => (
                            <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between mb-3 bg-dark text-light border" >
                                <div className="d-flex align-items-center">
                                    <Image src={product.image} alt={product.title} rounded width={50} height={50} className="me-2" />
                                    <span>{product.title}</span>
                                </div>
                                <Button variant="danger" size="sm" onClick={() => handleRemoveProduct(index)}>
                                    Eliminar
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            }

            <Button variant="success" type="submit" className="w-100 mt-3">Crear nuevo pedido</Button>
        </Form>
    );
}
