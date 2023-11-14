import axios from 'axios'

const getProducts = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://dummyjson.com/products?limit=100')
        .then((data) => {
            resolve(data.data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

const getProduct = (id: number) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://dummyjson.com/products/${id}`)
        .then((data) => {
            resolve(data.data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

const getProductCategories = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://dummyjson.com/products/categories?')
        .then((data) => {
            resolve(data.data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

const getProductsByCategory = (category: [number | string]) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://dummyjson.com/products/category/${category}`)
        .then((data) => {
            resolve(data.data)
        })
        .catch((error) => {
            reject(error)
        })
    })    
}
    
export { getProducts, getProduct, getProductCategories, getProductsByCategory }
