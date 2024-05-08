import axios from "axios";

const users = {
   namespaced: true,
   state: {
      usersList: [],
      user: null,
      totalUser: 0,
      verifiedMessage: "",
   },
   getters: {
      getUserList(state) {
         return state.usersList;
      },

      getUserById(state) {
         return state.user;
      },

      getCountUsers(state) {
         return state.usersList.length;
      },
   },
   mutations: {
      SET_USERS_LIST(state, users) {
         state.usersList = users;
      },

      SET_USER(state, user) {
         state.user = user;
      },

      SET_AVATAR(state, avatarUrl) {
         state.user.avatar = avatarUrl;
      },
      SET_VERIFIED_MESSAGE(state, verifiedMessage) {
         state.verifiedMessage = verifiedMessage;
      },
   },
   actions: {
      async fetchUsers({ commit, state }, payload) {
         try {
            const response = await axios.get(
               "v2/admin/users?page=" +
                  payload.page +
                  "&search=" +
                  payload.searchInput.value +
                  "&selected_role=" +
                  payload.selected_role.value +
                  "&sort_direction=" +
                  payload.sort_direction.value +
                  "&sort_field=" +
                  payload.sort_field.value
            );
            const data = response.data;
            commit("SET_USERS_LIST", data.data.users);
            state.totalUser = data.meta.total;
            const pagination = {
               currentPage: data.meta.current_page,
               lastPage: data.meta.last_page,
            };
            return { pagination };
         } catch (error) {
            commit("SET_USERS_LIST", []);
         }
      },

      resetUser({ commit }) {
         commit("SET_USER", null);
      },

      async fetchUserById({ commit }, id) {
         try {
            const response = await axios.get(`v2/admin/users/${id}`);
            commit("SET_USER", response.data.user);
            return response;
         } catch (e) {
            commit("SET_USER", null);
         }
      },

      async createUsers({ dispatch }, user) {
         return await axios
            .post("v2/admin/users/create", user, {
               headers: {
                  "Content-Type": "application/json",
               },
            })
            .then(() => {
               dispatch("fetchUsers");
            });
      },

      async editUser({ commit }, { id, model }) {
         const response = await axios.put(`v2/admin/users/${id}/edit`, model);
         commit("SET_USER", response.data.user);
         return response;
      },

      async deleteUser({ dispatch }, id) {
         const response = await axios.delete(`v2/admin/users/${id}/delete`);
         dispatch("resetUser");
         dispatch("fetchUsers");
         return response;
      },

      async updateInfor({ commit }, payload) {
         const response = await axios.patch(`v2/users/${payload.id}/update-infor`, payload.model);
         commit("SET_USER", response.data.user);
         return response;
      },

      async updateAvatar({ commit }, { id, formData }) {
         const response = await axios.post(`v2/users/${id}/update-avatar`, formData);
         commit("SET_AVATAR", response.data.avatarUrl);
         commit("auth/SET_AVATAR", response.data.avatarUrl, { root: true });
         return response;
      },

      async removeAvatar({ commit }, id) {
         const response = await axios.delete(`v2/admin/users/${id}/remove-avatar`);
         commit("SET_AVATAR", response.data.avatarUrl);
         commit("auth/SET_AVATAR", response.data.avatarUrl, { root: true });
         return response;
      },

      async verifyEmail({ dispatch, commit }, payload) {
         await axios
            .get("email-verification", {
               params: payload,
            })
            .then((response) => {
               commit("SET_VERIFIED_MESSAGE", response.data.message);
               dispatch("fetchUserById", payload.id);
            })
            .catch((error) => {
               alert(error);
            });
      },

      async deleteAccount({ dispatch }, id) {
         const response = await axios.delete("v2/users/" + id + "/delete-account");
         dispatch("fetchUsers");
         return response;
      },
   },
};

export default users;
