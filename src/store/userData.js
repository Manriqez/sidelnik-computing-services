// import { getUserData, login, registration } from "@/services/user.service"
import { getUserData, login, registration } from "@/services/user.service"

const state = () => ({
    isAuthorized: false,
    isAdmin: false,
    userData: {},
    userError: null,
    jwt: localStorage.getItem('jwt')
})

const mutations = {
    setAuthorize(state, isAuthorized) {
        state.isAuthorized = isAuthorized
    },
    setUserData(state, userData) {
        state.userData = userData
    },
    setJwt(state, jwt) {
        state.jwt = jwt
    },
    setAdmin(state, isAdmin) {
        state.isAdmin = isAdmin
    },
    setUserError(state, error) {
        state.productError = error
    }
}

const actions = {
    async fetchUserData({ commit, state }) {
        try {
            const { data } = await getUserData(state.jwt)
            if(data.message) {
                commit('setUserData', {})
                commit('setAuthorize', false)
                commit('setAdmin', false)
                this.$router.replace({ path: '/' })
            } else {
                commit('setUserData', data)
                commit('setAuthorize', true)
                const isAdmin = data.roles.includes("ADMIN")
                commit('setAdmin', isAdmin)
            }
        } catch (error) {
            commit('setUserError', error)
        }
    },
    async fetchLogin({ commit, dispatch }, payload) {
        try {
            const { data } = await login(payload)
            if(data.message) {
                return data
            }
            localStorage.setItem('jwt', data.token)
            commit('setJwt', data.token)
            dispatch('fetchUserData')
            
            return true
        } catch (error) {
            commit('setUserError', error)
        }
    },
    async fetchRegistration({ commit }, payload) {
        try {
            const { data } = await registration(payload)
            if(data) {
                return data
            }
        } catch (error) {
            commit('setUserError', error)    
        }
    },
    async fetchLogout({ commit, dispatch }) {
        try {
            localStorage.setItem('jwt', '')
            commit('setJwt', '')
            dispatch('fetchUserData')
        } catch (error) {
            commit('setUserError', error)
        }
    }
}

const getters = {
    // isAuthorized(state) {
    //     return state.isAuthorized
    // },
    isAuthorized: ({ isAuthorized }) => isAuthorized,
    isAdmin: ({ isAdmin }) => isAdmin,
    userData: ({ userData }) => userData,
    userError: ({ userError }) => userError
}

export default {
    mutations,
    getters,
    actions,
    state
}
