import { http } from "@/apps/shared/baseService/config";

const base = {
  rota: "especies_hospedeiros",
  nome: "Espécie"
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
    listar_especies_hospedeiros: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .listar({
          ...getters.get_especies_hospedeiros_filtros,
          base: localStorage.base
        })
        .then(res => {
          dispatch("disableLoading");
          commit("set_especies_hospedeiros", res.data);
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
    atualizar_especie_hospedeiro: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .atualizar({ ...getters.get_especie })
        .then(res => {
          dispatch("disableLoading");
          commit("set_especie_hospedeiro", res.data);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Atualização Concluída!",
            timeout: 6000
          });
          dispatch("listar_especies_hospedeiros");
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
    criar_especie_hospedeiro: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .criar({ ...getters.get_especie_hospedeiro, base: localStorage.base })
        .then(() => {
          dispatch("disableLoading");
          commit("set_especie_hospedeiro", {});
          commit("setLinks", []);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Registro Concluído!",
            timeout: 6000
          });
          dispatch("listar_especies_hospedeiro");
          commit("set_modal_view_especie_hospedeiro", false);
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
    excluir_especie_hospedeiro: ({ dispatch, getters }, payload) => {
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
          dispatch("listar_especies_hospedeiro");
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
    abre_modal_view_especie_hospedeiro: (
      { commit, getters, dispatch },
      payload
    ) => {
      if (payload) {
        commit("set_especie_hospedeiro", payload);
        commit("setLinks", payload.fotografias);
      }
      commit("set_modal_view_especie_hospedeiro", true);
    },
    fecha_modal_view_especie_hospedeiro: ({ commit }) => {
      commit("set_especie_hospedeiro", {});
      commit("set_modal_view_especie_hospedeiro", false);
    }
  },
  state: {
    especie_hospedeiro: {},
    especies_hospedeiros: {
      docs: [],
      page: 1,
      totalPages: 1
    },
    especies_hospedeiros_filtros: {
      limitPerPage: 1000,
      page: 1,
      dataInicio: "",
      dataFim: ""
    },
    modal_view_especie_hospedeiro: false
  },
  mutations: {
    set_especie_hospedeiro: (state, payload) =>
      (state.especie_hospedeiro = payload),
    set_especies_hospedeiros: (state, payload) =>
      (state.especies_hospedeiros = payload),
    set_modal_view_especie_hospedeiro: (state, payload) =>
      (state.modal_view_especie_hospedeiro = payload)
  },
  getters: {
    get_especie_hospedeiro: state => state.especie_hospedeiro,
    get_especies_hospedeiros: state => state.especies_hospedeiros,
    get_modal_view_especie_hospedeiro: state =>
      state.modal_view_especie_hospedeiro,
    get_especies_hospedeiros_filtros: state =>
      state.especies_hospedeiros_filtros
  }
};

const routes = [
  {
    path: `/especie-hospedeiro`,
    component: () => import("./views/Listar.vue"),
    name: base.nome
  }
];

export default {
  service,
  module,
  routes
};
