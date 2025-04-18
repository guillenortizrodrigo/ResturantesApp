import React, { useEffect, useState } from 'react'
import { Form, Button, FormControl } from 'react-bootstrap'

export default function AddEditTableForm(props) {

    const { btnTitle, action, table } = props

    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        number: '',
    });

    useEffect(()=>{
        if(table){
            setFormData({
                number:table.number
            });
        }
    },[]);

    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        table ? action(table.id,formData) : action(formData);
    };

    const handleChange = (event) => {
        const name = event.target.name;  //get the name of the field
        const value = event.target.value; //get value of the files 
        setFormData(values => ({ ...values, [name]: value })) //...extend the actual values and then update just the selected field
    }

    return (
        <Form className='bg-dark p-3' noValidate validated={validated} onSubmit={handleSubmit}>
            <FormControl
                type='number'
                name="number"
                placeholder='Numero de la Mesa'
                required
                isInvalid={validated}
                onChange={handleChange}
                value={formData.number}
            />
            <Button variant="primary" type="submit" className="w-100">{btnTitle}</Button>
        </Form>
    )
}
