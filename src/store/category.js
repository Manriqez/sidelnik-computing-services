import { getCategory, getCategories, addCategory, deleteCategory } from "@/services/categories.service"

const state = () => ({
    category: {},
    categories: [],
    categoryError: null,
    categoryStatus: null
})

const mutations = {
    setCategory(state, category) {
        state.category = category
    },
    setCategories(state, categories) {
        state.categories = categories
    },
    setCategoryStatus(state, status) {
        state.categoryStatus = status
    },
    setCategoryError(state, error) {
        state.categoryError = error
    },
}

const actions = {
    async fetchCategory({ commit }, id) {
        try {
            const { data } = await getCategory(id) 
            commit('setCategory', data)
        } catch (error) {
            commit('setCategoryError', error)
        }
    },
    async fetchCategories({ commit }) {
        try {
            const categories = await getCategories()
            commit('setCategories', categories.data)
        } catch (error) {
            commit('setCategoryError', error)
        }
    },
    async fetchNewCategory({ commit }, data) {
        try {
            const payload = {}
            for(let item in data) {
                payload[item] = data[item].value
            }
            const res = await addCategory(payload)
            console.log('res new category', res, res.status)
            commit('setCategoryStatus', res.status)
        } catch (error) {
            commit('setCategoryError', error)
        }
    },
    async fetchDeleteCategory({ commit }, itemId) {
        try {
            const res = await deleteCategory(itemId)
            commit('setCategoryStatus', res.status)
            const { data } = await getCategories()
            commit('setCategories', data)
        } catch (error) {
            commit('setProductError', error)
        }
    }
}

const getters = {
    category: ({ category }) => category,
    categories: ({ categories }) => categories,
    categoryStatus: ({ categoryStatus }) => categoryStatus,
    categoryError: ({ categoryError }) => categoryError
}

export default {
    mutations,
    getters,
    actions,
    state
}
