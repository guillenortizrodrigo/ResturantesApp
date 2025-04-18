import React from 'react'
import { Table, Button, Image } from 'react-bootstrap'
import { PencilSquare, Trash } from 'react-bootstrap-icons';

export default function CategoriesTable(props) {
  const { categories, setShowDelete, setItem, setItemId, editCategory } = props;

  const deleteCategory = (category) => {
    setItem(`la categoria ${category.title}`); // Corregido para interpolación de variables
    setItemId(category.id);
    setShowDelete(true);
};

  return (
    <Table variant="dark" className='rounded'>
      <thead>
        <tr>
          <th className="text-center">Categoria</th>
          <th className="text-center">Imagen</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td className="text-center align-middle">{category.title}</td>
            <td className="text-center"><Image src={category.image} style={{ width: '200px', height: '120px' }}/></td>
            <td className="text-center align-middle">
              <Button variant="primary" size="sm" className="action-btn me-2" onClick={() => editCategory(category)}>
                <PencilSquare />
              </Button>
              <Button variant="danger" size="sm" className="action-btn" onClick={() => deleteCategory(category)}>
                <Trash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
