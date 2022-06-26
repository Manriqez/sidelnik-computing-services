import { request } from './generic.service'

const getProduct = (id) => request({ url: `products/${id}`, method: 'get' })
const getProducts = (id, data) => request({ url: `products/${id}`, method: 'post', data })
const getAllProducts = () => request({ url: 'products', method: 'get' })
const addProduct = (data) => request({ url: 'products', method: 'post', data })
const deleteProduct = (id) => request({ url: `products/${id}`, method: 'delete' })

export { getProduct, getProducts, getAllProducts, addProduct, deleteProduct };
