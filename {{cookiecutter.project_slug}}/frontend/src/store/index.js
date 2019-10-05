import Vue from 'vue'
import Vuex from 'vuex'
import createPersistentState from 'vuex-persistedstate'

import UserModule from './UserModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserModule
  },
  plugins: [createPersistentState({
    storage: {
      getItem: key => localStorage.getItem(key),
      setItem: (key, value) => localStorage.setItem(key, value),
      removeItem: key => localStorage.removeItem(key)
    }
  })]
})
