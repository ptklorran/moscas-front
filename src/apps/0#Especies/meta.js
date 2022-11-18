import { http } from "@/apps/shared/baseService/config";

const base = {
  rota: "especies",
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
    listar_especies: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .listar({ ...getters.get_especies_filtros, base: localStorage.base })
        .then(res => {
          dispatch("disableLoading");
          commit("set_especies", res.data);
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
    atualizar_especie: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .atualizar({ ...getters.get_especie, fotografias: getters.getLinks })
        .then(res => {
          dispatch("disableLoading");
          commit("set_especie", res.data);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Atualização Concluída!",
            timeout: 6000
          });
          dispatch("listar_especies");
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
    criar_especie: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .criar({ ...getters.get_especie, base: localStorage.base })
        .then(() => {
          dispatch("disableLoading");
          commit("set_especie", {});
          commit("setLinks", []);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Registro Concluído!",
            timeout: 6000
          });
          dispatch("listar_especies");
          commit("set_modal_view_especie", false);
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
    excluir_especie: ({ dispatch, getters }, payload) => {
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
          dispatch("listar_especies");
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
    excluir_especies: ({ dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .excluir(getters.get_especies_marcados)
        .then(() => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Exclusão em massa Concluída!",
            timeout: 6000
          });
          dispatch("listar_especies");
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
    abre_modal_view_especie: ({ commit, getters, dispatch }, payload) => {
      if (payload) {
        commit("set_especie", payload);
        commit("setLinks", payload.fotografias);
      }
      commit("set_modal_view_especie", true);
    },
    fecha_modal_view_especie: ({ commit }) => {
      commit("set_especie", {});
      commit("setLinks", []);
      commit("set_modal_view_especie", false);
    },
    add_especie_marcado: ({ commit, getters }, payload) => {
      commit("set_especies_marcados", [
        ...getters.get_especies_marcados,
        payload
      ]);
    },
    remove_especie_marcado: ({ commit, getters }, i) => {
      commit(
        "set_especies_marcados",
        ...getters.get_especies_marcados.filter((item, index) => index !== i)
      );
    }
  },
  state: {
    especie: {},
    especies: {
      docs: [],
      page: 1,
      totalPages: 1
    },
    especies_marcados: [],
    especies_filtros: {
      limitPerPage: 1000,
      page: 1,
      dataInicio: "",
      dataFim: ""
    },
    modal_view_especie: false
  },
  mutations: {
    set_especie: (state, payload) => (state.especie = payload),
    set_especies: (state, payload) => (state.especies = payload),
    set_especies_marcados: (state, payload) =>
      (state.especies_marcados = payload),
    set_modal_view_especie: (state, payload) =>
      (state.modal_view_especie = payload)
  },
  getters: {
    get_especie: state => state.especie,
    get_especies: state => state.especies,
    get_especies_marcados: state => state.especies_marcados,
    get_modal_view_especie: state => state.modal_view_especie,
    get_especies_filtros: state => state.especies_filtros
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
