import { http } from "@/apps/shared/baseService/config";

const base = {
  rota: "hospedeiros",
  nome: "Hospedeiros"
};

export const service = {
  criar: data => http.post(`/admin/${base.rota}/create`, data),
  listar: data => http.post(`/admin/${base.rota}/list`, data),
  atualizar: data => http.post(`/admin/${base.rota}/update`, data),
  excluir: data => http.post(`/admin/${base.rota}/delete`, data),
  excluir_muitos: data => http.post(`/admin/${base.rota}/delete-many`, data)
};

const module = {
  actions: {
    listar_hospedeiros: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .listar({ ...getters.get_hospedeiros_filtros, base: localStorage.base })
        .then(res => {
          dispatch("disableLoading");
          commit("set_hospedeiros", res.data);
        })
        .catch(e => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "error",
            message: e.response.data.message,
            timeout: 6000
          });
        });
    },
    atualizar_hospedeiro: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .atualizar({ ...getters.get_hospedeiro, imagens: getters.getLinks })
        .then(res => {
          dispatch("disableLoading");
          commit("set_hospedeiro", res.data);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Atualização Concluída!",
            timeout: 6000
          });
          dispatch("listar_hospedeiros");
        })
        .catch(e => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "error",
            message: e.response.data.message,
            timeout: 6000
          });
        });
    },
    criar_hospedeiro: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .criar({ ...getters.get_hospedeiro, base: localStorage.base })
        .then(() => {
          dispatch("disableLoading");
          commit("set_hospedeiro", {});
          commit("setLinks", []);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Registro Concluído!",
            timeout: 6000
          });
          setTimeout(() => {
            dispatch("listar_hospedeiros");
          }, 1000);
          commit("set_modal_view_hospedeiro", false);
        })
        .catch(e => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "error",
            message: e.response.data.message,
            timeout: 6000
          });
        });
    },
    excluir_hospedeiro: ({ dispatch, getters }, payload) => {
      dispatch("enableLoading");
      service
        .excluir(payload)
        .then(() => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Exclusão Concluída!",
            timeout: 6000
          });
          dispatch("listar_hospedeiros");
        })
        .catch(e => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "error",
            message: e.response.data.message,
            timeout: 6000
          });
        });
    },
    excluir_hospedeiros: ({ dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .excluir(getters.get_hospedeiros_marcados)
        .then(() => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Exclusão em massa Concluída!",
            timeout: 6000
          });
          dispatch("listar_hospedeiros");
        })
        .catch(e => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "error",
            message: e.response.data.message,
            timeout: 6000
          });
        });
    },
    abre_modal_view_hospedeiro: ({ commit, getters, dispatch }, payload) => {
      if (payload) {
        commit("set_hospedeiro", payload);
        commit("setLinks", payload.imagens);
      }
      dispatch("listar_especies_hospedeiros");
      dispatch("listar_familiahospedeiros");
      commit("set_modal_view_hospedeiro", true);
    },
    fecha_modal_view_hospedeiro: ({ commit }) => {
      commit("set_hospedeiro", {});
      commit("setLinks", []);
      commit("set_modal_view_hospedeiro", false);
    },
    add_hospedeiro_marcado: ({ commit, getters }, payload) => {
      commit("set_hospedeiros_marcados", [
        ...getters.get_hospedeiros_marcados,
        payload
      ]);
    },
    remove_hospedeiro_marcado: ({ commit, getters }, i) => {
      commit(
        "set_hospedeiros_marcados",
        ...getters.get_hospedeiros_marcados.filter((item, index) => index !== i)
      );
    }
  },
  state: {
    hospedeiro: {},
    hospedeiros: {
      docs: [],
      page: 1,
      totalPages: 1
    },
    hospedeiros_marcados: [],
    hospedeiros_filtros: {
      limitPerPage: 1000,
      page: 1,
      dataInicio: "",
      dataFim: ""
    },
    modal_view_hospedeiro: false
  },
  mutations: {
    set_hospedeiro: (state, payload) => (state.hospedeiro = payload),
    set_hospedeiros: (state, payload) => (state.hospedeiros = payload),
    set_hospedeiros_marcados: (state, payload) =>
      (state.hospedeiros_marcados = payload),
    set_modal_view_hospedeiro: (state, payload) =>
      (state.modal_view_hospedeiro = payload)
  },
  getters: {
    get_hospedeiro: state => state.hospedeiro,
    get_hospedeiros: state => state.hospedeiros,
    get_hospedeiros_marcados: state => state.hospedeiros_marcados,
    get_modal_view_hospedeiro: state => state.modal_view_hospedeiro,
    get_hospedeiros_filtros: state => state.hospedeiros_filtros
  }
};

const routes = [
  {
    path: `/${base.rota}`,
    component: () => import("./views/Listar.vue"),
    name: base.nome
  }
];

export default {
  service,
  module,
  routes
};
