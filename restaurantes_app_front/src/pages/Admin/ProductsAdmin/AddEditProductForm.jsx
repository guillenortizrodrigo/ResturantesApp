import React, { useState, useCallback, useEffect } from 'react';
import { Form, FormControl, Button, Image, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useCategory } from '../../../hooks/useCategory';

export default function AddEditProductForm(props) {
    const { getCategories, categories } = useCategory();

    const { btnTitle, action, product } = props;
    
    const [validated, setValidated] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageError, setImageError] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        image: '',
        price: '',
        active: false,
        category: null
    });

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if(product){
            setFormData({
                title: product.title,
                image: '',
                price: product.price,
                active: product.active,
                category: product.category
            })
            setPreviewImage(product.image);
        }
    }, []);



    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setFormData(values => ({ ...values, image: file }));
        setPreviewImage(URL.createObjectURL(file));
        setImageError(false);
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : name === 'category' ? parseInt(value, 10) : value,
        }));
    };

    const { getRootProps, getInputProps } = useDropzone({
        noKeyboard: true,
        multiple: false,
        onDrop,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const priceValue = parseFloat(formData.price); // Convertir a número

        if (form.checkValidity() === false || !previewImage || priceValue <= 0) {
            event.stopPropagation();
            setValidated(true);
            setImageError(!previewImage);
            return;
        }

        setValidated(false);
        setImageError(false);
        product ? action(product.id, formData) :action(formData);
    };

    return (
        <Form className='bg-dark p-3' noValidate validated={validated} onSubmit={handleSubmit}>
            <FormControl
                type='text'
                name="title"
                placeholder='Producto'
                value={formData.title}
                required
                onChange={handleChange}
                isInvalid={validated && !formData.title.trim()}
            />
            <FormControl
                type='number'
                name="price"
                placeholder='Precio'
                value={formData.price}
                required
                onChange={handleChange}
                isInvalid={validated && (parseFloat(formData.price) <= 0 || isNaN(parseFloat(formData.price)))}
            />
            <Form.Select
                label="Seleccionar categoría"
                className='bg-dark text-light mb-3'
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            >
                <option value="">Selecciona una categoría</option>
                {categories && (categories.map(category => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                )))}
            </Form.Select>
            <Form.Check
                type="switch"
                name='active'
                label="Producto Activo"
                checked={formData.active}
                onChange={handleChange}
                className="mb-3"
                isInvalid={false} // No tiene efecto en checkbox
            />
            <div {...getRootProps()} className="mb-3">
                <Button variant="primary" className="w-100">Subir Imagen</Button>
                <input {...getInputProps()} />
            </div>
            {imageError && (
                <Alert variant='danger'>Por favor, sube una imagen antes de enviar el formulario.</Alert>
            )}
            {previewImage && (
                <Image src={previewImage} style={{ maxHeight: '400px' }} className="mb-3 w-100" />
            )}
            <Button variant="success" type="submit" className="w-100">{btnTitle}</Button>
        </Form>
    );
}