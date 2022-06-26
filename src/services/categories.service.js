import { request } from './generic.service'

const getCategory = (id) => request({ url: `categories/${id}`, method: 'get'})
const getCategories = () => request({ url: `categories`, method: 'get'})
const addCategory = (data) => request({ url: 'categories', method: 'post', data })
const deleteCategory = (id) => request({ url: `categories/${id}`, method: 'delete' })

export { getCategory, getCategories, addCategory, deleteCategory }
