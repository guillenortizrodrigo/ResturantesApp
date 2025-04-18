import React, { useEffect, useState } from 'react'
import { useProduct } from '../../../hooks/useProduct';
import { cleanProductCart, getProductsCart } from '../../../api/cart';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CartProductsList from './CartProductsList';
import { useTable } from '../../../hooks/useTable';
import { useOrder } from '../../../hooks/useOrder';

export default function Cart() {
  const [products, setProducts] = useState(null);
  const [realoadCart, setRealoadCart] = useState(false)
  const [totalCardPrice, setTotalCardPrice] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();
  const { getTableByNumber } = useTable();
  const { addOrderToTable } = useOrder();

  useEffect(() => {
    // Actualiza el tamaño de la pantalla cuando cambia el tamaño de la ventana
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();

      const productsArray = [];
      for await (const product of idProductsCart) {
        const response = await getProductById(product);
        productsArray.push(response);
      }
      setProducts(productsArray)
    })()
  }, [realoadCart])

 const onReloadCart = () => {setRealoadCart((prev) => !prev)}

 const createOrder = async () => {
  const tableData = await getTableByNumber(tableNumber);
  const tableId = tableData[0].id;
  for await (const product of products){
    await addOrderToTable(tableId, product.id);
  }
  cleanProductCart();
  onReloadCart();
  console.log("PEDIDO REALIZADO");
 }

  return (
    <div>

      <div className='mb-3'>
        <Link to={`/client/${tableNumber}`}>
          <Button size="sm">Rregesar a las Categorias</Button>
        </Link>
        <Link to={`/client/${tableNumber}/orders`} className='ms-3'>
          <Button size="sm">Pedidos</Button>
        </Link>
      </div>

      {products ? (
        products.length > 0 ? (
          <div>
            <CartProductsList products={products} onReloadCart={onReloadCart} setTotalCardPrice={setTotalCardPrice}/>
            <Button className='w-100' onClick={createOrder} >Realizar Pedido ($ {totalCardPrice})</Button>
          </div>
          
        ) : (
          windowWidth > 768 ? <h2>Tu carrito está vacío</h2> : <p>Tu carrito está vacío</p>
        )
      ) : (
        windowWidth > 768 ? <h2>Cargando...</h2> : <p>Cargando...</p>
      )}

    </div>
  );

}
