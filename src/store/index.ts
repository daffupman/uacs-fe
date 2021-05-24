import { createStore } from 'vuex'

declare let SessionStorage: any;
const USER = "USER";
const TOKEN = "TOKEN";

export default createStore({
  state: {
    user: SessionStorage.get(USER) || {},
    bearerToken: SessionStorage.get(TOKEN) || ''
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
      SessionStorage.set(USER, user);
    },
    setBearerToken (state, bearerToken) {
      state.bearerToken = bearerToken
      SessionStorage.set(TOKEN, bearerToken)
    }
  },
  actions: {
  },
  modules: {
  }
})
