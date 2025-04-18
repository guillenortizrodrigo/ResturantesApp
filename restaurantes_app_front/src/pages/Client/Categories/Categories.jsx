import React, { useEffect } from 'react'
import { useCategory } from '../../../hooks/useCategory'
import CategoriesList from './CategoriesList';

export default function Categories() {
  const { getCategories, categories, loading } = useCategory()
  useEffect(() => { getCategories(); }, []);
  return (
    <div>
      {loading ? <p>Cargando...</p> : categories ? (
        <CategoriesList categories={categories}/>
      ) : <h1>No hay Categorias Disponibles</h1>}
    </div>
  )
}