import axios from "axios";

const auth = {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {
    isAdmin(state) {
      if (state.user) {
        return state.user.role_as === 1;
      }
    },
    getUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
      if (state.user && state.token) {
        return true;
      }
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, user) {
      state.user = user;
    },

    SET_AVATAR(state, avatarUrl) {
      state.user.avatar = avatarUrl;
    },

    RESET_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async loginWithGoogle() {
      try {
        const response = await axios.get("/authorize/google/redirect");
        return response;
      } catch (error) {
        alert(error);
      }
    },

    async loginWithGoogleCallback({ dispatch }, payload) {
      try {
        const response = await axios.get("/authorize/google/callback", {
          params: payload,
        });
        return dispatch("attempt", response.data.token);
      } catch (error) {
        alert(error);
      }
    },

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

      try {
        const response = await axios.get("user");
        commit("SET_USER", response.data);
        commit("users/SET_USER", response.data, { root: true });
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },
  },
};

export default auth;
