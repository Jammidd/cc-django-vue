const UserModule = {
  namespaced: true,

  state: {
    token: null,
    user: null
  },
  mutations: {
    LOGIN_USER (state, userData) {
      state.user = userData.user
      state.token = userData.token
    },
    LOGOUT_USER (state) {
      state.user = null
      state.token = null
    },
    UPDATE_USER (state, userData) {
      state.user = userData
    }
  },
  getters: {
    userId: state => {
      return (state.user) ? state.user.id : null
    },
    email: state => {
      return (state.user) ? state.user.email : null
    },
    token: state => {
      return state.token
    },
    fullName: state => {
      return (state.user) ? state.user.name : null
    },
    data: state => {
      return state.user
    }
  }
}

export default UserModule
