import axios from "axios";

const auth = {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    async register({ dispatch }, credentials) {
      const response = await axios.post("/auth/register", credentials);
      dispatch("attempt", response.data.token);
      return response;
    },

    async login({ dispatch }, credentials) {
      const response = await axios.post("/auth/login", credentials);
      return dispatch("attempt", response.data.token);
    },

    async attempt({ commit, state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        return;
      }
    },
  },
};

export default auth;
