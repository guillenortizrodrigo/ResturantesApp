import React, { useState } from 'react'
import "./SelectTable.scss"
import Card from 'react-bootstrap/Card';
import { Alert, Button, Form, FormControl } from 'react-bootstrap';
import { useTable } from '../../../hooks/useTable';
import { useNavigate } from 'react-router-dom';

export default function SelectTable(props) {
    const navigate = useNavigate();
    const { getTableByNumber } = useTable()
    const [tableNumber, settableNumber] = useState(null)
    const [alertText, setAlertText] = useState(null)
    const [error, setError] = useState(false);

    const onEnter = async(event) => {
        event.preventDefault();
        if(!tableNumber){
            setError(true);
            setAlertText("Debe de ingresar una mesa")
            return
        }else{
            setError(false);
        }
        const response = await getTableByNumber(tableNumber);
        if(response.length > 0){
            setError(false);
            console.log(response);
            navigate(`/client/${response[0].number}`);
        }else{
            setAlertText("La mesa que ingreso no existe")
            setError(true);
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        settableNumber(value);
    };

    return (
        <div className='select-table'>
            <Card bg='dark' text='white' className='text-center'>
                <Card.Body>
                    <Card.Title>Bienvenidos a Andy's Food</Card.Title>
                    <Card.Text>
                        Introduce tu numero de mesa
                    </Card.Text>
                    <Form onSubmit={onEnter}>
                        <FormControl
                            name='tableNumber'
                            type='number'
                            onChange={handleChange} />
                        {error && <Alert variant='danger'>{alertText}</Alert>}
                        <Button className='w-100' type='submit'>Entrar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
