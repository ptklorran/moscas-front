export const mutations = {
  setLoggedUser(state, payload) {
    state.loggedUser = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setModalForgotPassword(state, payload) {
    state.modalForgotPassword = payload;
  },
};

export default {};
