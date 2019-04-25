
const book = {
    state: {
        info: {},
    },
    mutations: {
        SET_INFO: (state, info) => {
            state.info = info
        },
    },
    actions: {
        setBookInfo({commit}, info) {
            commit('SET_INFO', info)
        },
    },
}

export default book
