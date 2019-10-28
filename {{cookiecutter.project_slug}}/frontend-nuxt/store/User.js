export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  LOGIN_USER (state, data) {
    state.user = data.user
    state.token = data.token
  },
  LOGOUT_USER (state) {
    state.user = null
    state.token = null
  },
  UPDATE_USER (state, data) {
    state.user = data
  }
}

export const getters = {
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