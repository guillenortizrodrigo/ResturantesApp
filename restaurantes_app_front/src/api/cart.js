const PRODUCT_CART = "productsCart";

export function getProductsCart(){
    const response = localStorage.getItem(PRODUCT_CART);
    console.log(response)
    return JSON.parse(response || "[]");
}

export function addProductCart(id){
    const products = getProductsCart();
    products.push(id);
    localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
}

export function deleteProductCart(index) {
    const idProducts = getProductsCart(); // Obtener los productos como array
    idProducts.splice(index, 1); // Eliminar el elemento en la posición indicada
    localStorage.setItem(PRODUCT_CART, JSON.stringify(idProducts)); // Guardar el array actualizado en formato JSON
}


export function cleanProductCart(){
    localStorage.removeItem(PRODUCT_CART);
}