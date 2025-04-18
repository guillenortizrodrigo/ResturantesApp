import React, { useEffect } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import './AddEditUserForm.scss'
import { useState } from 'react'

export default function AddEditUserForm(props) {

    const { user, action, btnTitle } = props

    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        is_active: false,
        is_staff: false,
    })

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                password: '',
                username: user.username || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                is_active: user.is_active || false,
                is_staff: user.is_staff || false,
            });
        }
    }, [user])

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value, // Si es checkbox usa `checked`, sino usa `value`
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        // Filtramos los datos antes de enviarlos
        const filteredData = { ...formData };
        if (user) {
            delete filteredData.email; // No enviamos email si es edición
            delete filteredData.password; // No enviamos password si es edición
        }

        user ? action(filteredData, user.id) : action(filteredData);
    };

    return (
        <Form className='bg-dark p-3' noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Control
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                disabled={!!user}
                required
                isInvalid={validated && !formData.email}
            />

            <FormControl
                type='text'
                name="username"
                placeholder='UserName'
                value={formData.username}
                onChange={handleChange}
                required
                isInvalid={validated && !formData.username}
            />

            <FormControl
                type='text'
                name="first_name"
                placeholder='Nombre'
                value={formData.first_name}
                onChange={handleChange}
                required
                isInvalid={validated && !formData.first_name}
            />

            <FormControl
                type='text'
                name='last_name'
                placeholder='Apellido'
                value={formData.last_name}
                onChange={handleChange}
                required
                isInvalid={validated && !formData.last_name}
            />

            {!user && (
                <FormControl
                    type='password'
                    name="password"
                    placeholder='Contraseña'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    isInvalid={validated && !formData.password}
                />
            )}

            <Form.Check
                type="switch"
                name='is_active'
                label="Usuario Activo"
                checked={formData.is_active}
                onChange={handleChange}
            />

            <Form.Check
                type="switch"
                name='is_staff'
                label="Usuario Administrador"
                className="mb-3"
                checked={formData.is_staff}
                onChange={handleChange}
            />
            <Button variant="primary" type="submit" className="w-100">{btnTitle}</Button>
        </Form>
    )
}
