import React, { useEffect } from 'react'
import "./ClientLayout.scss"
import { useTable } from '../../hooks/useTable';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardHeader } from 'react-bootstrap';
import { BoxArrowRight, Cart, List, PencilSquare } from 'react-bootstrap-icons';

export default function ClientLayout(props) {
    const { children } = props;
    const {tableNumber} = useParams();
    const { getTableByNumber } = useTable();
    const navigate = useNavigate();
    console.log(useParams());

  useEffect(()=>{
    (async()=>{
      const response = await getTableByNumber(tableNumber);
      if(response.length <= 0) closeTable();
    })()
  },[tableNumber])

  const closeTable = () =>{
    navigate("/")
  }

  const goToCart = () => {
    navigate(`/client/${tableNumber}/cart`)
  }
  const goToOrders = () => {
    navigate(`/client/${tableNumber}/orders`)
  }

  return (
    <Card bg='dark' text='white' className='m-3 p-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h3>Andy's Food</h3>
        </div>
        <div>
          <Button variant='primary' size='sm' className="action-btn me-2" onClick={goToCart}><Cart/></Button>
          <Button variant='warning' size='sm' className="action-btn me-2" onClick={goToOrders}><List/></Button>
          <Button variant='danger' size='sm' className="action-btn me-2" onClick={closeTable}><BoxArrowRight/></Button>
        </div>
      </div>
      <p>Mesa {tableNumber}</p>
        {children}
    </Card>
  )
}