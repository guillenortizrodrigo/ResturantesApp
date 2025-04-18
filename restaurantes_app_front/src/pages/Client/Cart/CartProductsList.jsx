import React, { useState, useEffect } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { Dash, Plus, Trash } from 'react-bootstrap-icons';
import { addProductCart, deleteProductCart, getProductsCart } from '../../../api/cart';
import { toast } from 'react-toastify';

export default function CartProductsList(props) {
    const { products, onReloadCart, setTotalCardPrice } = props;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(()=>{
        let totalCard = 0;
        products.forEach( (product) => {
            totalCard += Number(product.price);
        })
        setTotalCardPrice(totalCard.toFixed(2));
    },[products])

    useEffect(() => {
        // Actualiza el tamaño de la pantalla cuando cambia el tamaño de la ventana
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const deleteProduct = async(index) => {
        await deleteProductCart(index);
        onReloadCart();
        toast.success(`producto eliminado`)
    }

    return (
        <div>
            {products.map((product, index) => (
                <Card
                    bg="dark"
                    text="white"
                    className="d-flex flex-row justify-content-between align-items-center mb-3 p-3 border border-white"
                    key={index}
                >
                    {/* Contenedor para la imagen y el título */}
                    <div className="d-flex flex-row align-items-center">
                        {/* Imagen con tamaño dinámico */}
                        <Image
                            src={product.image}
                            className="rounded"
                            style={{
                                width: windowWidth > 768 ? "250px" : "50px",
                                height: windowWidth > 768 ? "200px" : "50px",
                            }}
                        />
                        {/* Título con tamaño responsivo */}
                        <span
                            className={`ms-3 fw-bold text-white ${windowWidth > 1024 ? "fs-2" : windowWidth > 768 ? "fs-4" : "fs-6"
                                }`}
                        >
                            {product.title}
                        </span>
                    </div>

                    {/* Contenedor para el precio y el botón */}
                    <div className="d-flex flex-row align-items-center">
                        <span
                            className={`mb-0 text-white ${windowWidth > 768 ? "fs-3" : windowWidth > 768 ? "fs-5" : "fs-6"
                                }`}
                        >
                            ${product.price}
                        </span>
                        <Button
                            onClick={()=>deleteProduct(index)}
                            variant='danger'
                            className="ms-2 d-flex align-items-center p-2 p-md-3 p-lg-4"
                        >
                            <Trash
                                size={windowWidth > 768 ? 30 : 20}
                            />
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}

