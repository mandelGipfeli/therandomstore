import Bestsellers from "./views/Bestsellers.vue"
import AllProducts from "./views/AllProducts.vue"
import SingleProduct from "./views/SingleProduct.vue"

export const routes = [
    { path: '/', name:'home', component: Bestsellers },
    { path: '/products/:id', name: 'product', component: SingleProduct },
    { path: '/products', name: 'products', component: AllProducts },
]