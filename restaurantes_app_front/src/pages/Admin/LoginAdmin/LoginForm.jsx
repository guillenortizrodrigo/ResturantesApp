import React, { useState } from 'react';
import './LoginForm.scss';
import { Button, Form } from 'react-bootstrap';
import { loginApi } from '../../../api/user';
import { toast } from 'react-toastify'
import { useAuth } from '../../../hooks/useAuth';

export default function LoginForm() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;  //get the name of the field
    const value = event.target.value; //get value of the files 
    setFormData(values => ({...values, [name]: value})) //...extend the actual values and then update just the selected field
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    // ✅ Validación: Si algún campo está vacío, mostramos error y no enviamos
    if (!formData.email || !formData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    // Si todo está lleno, eliminamos el error y enviamos los datos
    setError('');
    try {
      const response = await loginApi(formData);
      const { access } = response
      login(access)
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <Form className="login-form-admin" onSubmit={handleSubmit} noValidate>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mensaje de error si falta info */}
      
      <Form.Control 
        className="field" 
        type="email" 
        name="email" 
        placeholder="Ingresa tu correo" 
        value={formData.email} 
        onChange={handleChange}
      />
      <Form.Control 
        className="field" 
        type="password" 
        name="password" 
        placeholder="Ingresa tu contraseña" 
        value={formData.password} 
        onChange={handleChange} 
      />
      <Button variant="primary" type="submit" className="w-100">Submit</Button>
    </Form>
  );
}