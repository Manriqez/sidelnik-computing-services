const state = () => ({
    chatData: [],
    chatDataError: null
})

const mutations = {
    setChatData(state, chatData) {
        state.chatData.push(chatData)
    },
    setChatDataError(state, error) {
        state.chatDataError = error
    },
}

const actions = {
    fetchChatData({ commit }, data) {
        commit('setChatData', data)
    }
}

const getters = {
    chatData: ({ chatData }) => chatData,
    chatDataError: ({ chatDataError }) => chatDataError
}

export default {
    mutations,
    getters,
    actions,
    state
}
