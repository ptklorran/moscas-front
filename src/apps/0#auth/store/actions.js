import { router } from "@/router";
import LoginService from "../service";

export const actions = {
  createSession({ commit, dispatch }, dados) {
    dispatch("enableLoading");

    LoginService.auth(dados)
      .then(res => {
        dispatch("disableLoading");
        commit("setLoggedUser", res.data.user);
        commit("setToken", res.data.token);
        sessionStorage.user = JSON.stringify(res.data.user);
        sessionStorage.token = JSON.stringify(res.data.token);
        setTimeout(() => location.reload(), 100);
        router.push("/ocorrencias");
      })
      .catch(e => {
        dispatch("disableLoading");
        dispatch("createGlobalMessage", {
          type: "error",
          message: e.response.data.message,
          timeout: 3000
        });
      });
  },
  createUser({ commit, dispatch }, dados) {
    dispatch("enableLoading");
    LoginService.signup(dados)
      .then(() => {
        dispatch("disableLoading");
        dispatch("createGlobalMessage", {
          type: "success",
          message: "Cadastrado com sucesso, verifique seu email para ativar sua conta, verifique o SPAM!",
          timeout: 3000
        });
        router.push("/");
      })
      .catch(e => {
        dispatch("disableLoading");
        dispatch("createGlobalMessage", {
          type: "error",
          message: e.response.data.message,
          timeout: 3000
        });
      });
  },
  sendForgotPassword({ commit, dispatch }, email) {
    dispatch("enableLoading");
    LoginService.forgotPassword({ email })
      .then(() => {
        dispatch("disableLoading");
        dispatch("createGlobalMessage", {
          type: "success",
          message: "O email de recuperação foi enviado!",
          timeout: 3000
        });
        commit('setModalForgotPassword', false)
        router.push("/");
      })
      .catch(e => {
        dispatch("disableLoading");
        dispatch("createGlobalMessage", {
          type: "error",
          message: e.response.data.message,
          timeout: 3000
        });
      });
  },
  sendForgotPasswordFire({ commit, dispatch }, payload) {
    dispatch("enableLoading");
    LoginService.forgotPasswordFire(payload)
      .then(() => {
        dispatch("disableLoading");
        dispatch("createGlobalMessage", {
          type: "success",
          message: "Sua senha foi redefinida com sucesso!",
          timeout: 3000
        });
        router.push("/");
      })
      .catch(e => {
        dispatch("disableLoading");
        dispatch("createGlobalMessage", {
          type: "error",
          message: e.response.data.message,
          timeout: 3000
        });
      });
  },
  activateAccount({ commit, dispatch }, payload) {
    dispatch("enableLoading");
    LoginService.activateAccount(payload)
      .then(() => {
        dispatch("disableLoading");
        dispatch("createGlobalMessage", {
          type: "success",
          message: "Sua conta foi ativada com sucesso!",
          timeout: 3000
        });
        router.push("/");
      })
      .catch(e => {
        dispatch("disableLoading");
        dispatch("createGlobalMessage", {
          type: "error",
          message: e.response.data.message,
          timeout: 3000
        });
      });
  },
  setModalForgotPassword({ commit }, payload) {
    commit("setModalForgotPassword", payload);
  },
  logout({commit}) {
      sessionStorage.clear()
      commit("setLoggedUser", false);
      commit("setToken", false);
      router.push('/')
  }
};

export default {};
