import React, { useState, useCallback, useEffect } from 'react'
import { Form, FormControl, Button, Image, Alert } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone';

export default function AddEditCategoryForm(props) {

    const { category, action } = props

    const { btnTitle } = props
    const [validated, setValidated] = useState(false);
    const [previewImage, setPreviewImage] = useState(null)
    const [imageError, setImageError] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        image: ''
    })

    useEffect(()=>{
        if(category) {
            setFormData({
                title: category.title,
                image: ''
            })
            setPreviewImage(category.image);
        }
    },[category])

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setFormData(values =>({...values,["image"]:file}))
        setPreviewImage(URL.createObjectURL(file))
        setImageError(false)
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;  //get the name of the field
        const value = event.target.value; //get value of the files 
        setFormData(values => ({ ...values, [name]: value })) //...extend the actual values and then update just the selected field
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || !previewImage) {
            event.stopPropagation();
            setValidated(true);
            setImageError(!previewImage);
            return;
        }

        setValidated(true);
        setImageError(false);
        category ? action(formData,category.id) : action(formData);
    };

    return (
        <Form className='bg-dark p-3' noValidate validated={validated} onSubmit={handleSubmit}>
            <FormControl
                type='text'
                name="title"
                placeholder='Categoria'
                value={formData.title}
                required
                onChange={handleChange}
                isInvalid={validated && !formData.first_name}
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
    )
}
