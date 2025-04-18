import React, { useEffect } from 'react'
import { useProduct } from '../../../hooks/useProduct'
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import ProductsList from './ProductsList';

export default function Products() {
    const { categoryId, tableNumber } = useParams();
    const { getProductsByCategory, products, loading } = useProduct();

    useEffect(() => {
        getProductsByCategory(categoryId);
    }, [categoryId])

    return (
        <div>
            <Button as={Link} to={`/client/${tableNumber}`} className='mb-3'>Rregesar a las Categorias</Button>
            {loading ? <p>Cargando...</p> : products ? (
              <ProductsList products={products}/>
            ) : <h1>No hay Productos Disponibles</h1>}
        </div>
    )
}
