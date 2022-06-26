import { getProduct, getProducts, getAllProducts, addProduct, deleteProduct } from "@/services/products.service"

const state = () => ({
    product: {},
    products: [],
    productError: null,
    productStatus: null
})

const mutations = {
    setProduct(state, product) {
        state.product = product
    },
    setProducts(state, products) {
        state.products = products
    },
    setProductStatus(state, status) {
        state.productStatus = status
    },
    setProductError(state, error) {
        state.productError = error
    }
}

const actions = {
    async fetchProduct({ commit }, id) {
        try {
            const { data } = await getProduct(id)
            commit('setProduct', data)
        } catch (error) {
            commit('setProductError', error)
        }
    },
    async fetchProducts({ commit }, {id, product_ids}) {
        try {
            const { data } = await getProducts(id, product_ids)
            commit('setProducts', data)
        } catch (error) {
            commit('setProductError', error)
        }
    },
    async fetchAllProducts({ commit }) {
        try {
            const { data } = await getAllProducts()
            commit('setProducts', data)
        } catch (error) {
            commit('setProductError', error)
        }
    },
    async fetchNewProduct({ commit }, data) {
        try {
            const payload = {}
            for(let item in data) {
                payload[item] = data[item].value
            }
            const res = await addProduct(payload)
            commit('setProductStatus', res.status)
        } catch (error) {
            commit('setProductError', error)
        }
    },
    async fetchDeleteProduct({ commit }, itemId) {
        try {
            const res = await deleteProduct(itemId)
            commit('setProductStatus', res.status)
            const { data } = await getAllProducts()
            commit('setProducts', data)
        } catch (error) {
            commit('setProductError', error)
        }
    }
}

const getters = {
    product: ({ product }) => product,
    products: ({ products }) => products,
    productError: ({ productError }) => productError,
    productStatus: ({ productStatus }) => productStatus
}

export default {
    mutations,
    getters,
    actions,
    state
}
