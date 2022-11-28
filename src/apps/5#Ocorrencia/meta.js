import { http } from "@/apps/shared/baseService/config";

const base = {
  rota: "ocorrencias",
  nome: "Ocorrências"
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
    listar_ocorrencias: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .listar({ ...getters.get_ocorrencias_filtros, base: localStorage.base })
        .then(res => {
          dispatch("disableLoading");
          commit("set_ocorrencias", res.data);
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
    atualizar_ocorrencia: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .atualizar({ ...getters.get_ocorrencia, imagens: getters.getLinks })
        .then(res => {
          dispatch("disableLoading");
          commit("set_ocorrencia", res.data);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Atualização Concluída!",
            timeout: 6000
          });
          commit("set_modal_view_ocorrencia", false);
          dispatch("listar_ocorrencias");
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
    criar_ocorrencia: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .criar({ ...getters.get_ocorrencia, base: localStorage.base })
        .then(() => {
          dispatch("disableLoading");
          commit("set_ocorrencia", {});
          commit("setLinks", []);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Registro Concluído!",
            timeout: 6000
          });
          setTimeout(() => {
            dispatch("listar_ocorrencias");
          }, 300);
          commit("set_modal_view_ocorrencia", false);
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
    excluir_ocorrencia: ({ dispatch, getters }, payload) => {
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
          dispatch("listar_ocorrencias");
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
    excluir_ocorrencias: ({ dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .excluir(getters.get_ocorrencias_marcados)
        .then(() => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Exclusão em massa Concluída!",
            timeout: 6000
          });
          dispatch("listar_ocorrencias");
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
    abre_modal_view_ocorrencia: ({ commit, getters, dispatch }, payload) => {
      if (payload) {
        commit("set_ocorrencia", payload);
        commit("setLinks", payload.imagens);
      } else {
        commit("set_ocorrencia", {
          latitude: {
          },
          longitude: {
          }
        });
      }
      commit("set_modal_view_ocorrencia", true);
    },
    fecha_modal_view_ocorrencia: ({ commit }) => {
      commit("set_ocorrencia", {});
      commit("setLinks", []);
      commit("set_modal_view_ocorrencia", false);
    },
    add_ocorrencia_marcado: ({ commit, getters }, payload) => {
      commit("set_ocorrencias_marcados", [
        ...getters.get_ocorrencias_marcados,
        payload
      ]);
    },
    remove_ocorrencia_marcado: ({ commit, getters }, i) => {
      commit(
        "set_ocorrencias_marcados",
        ...getters.get_ocorrencias_marcados.filter((item, index) => index !== i)
      );
    }
  },
  state: {
    ocorrencia: {
      latitude: {
        d: "",
        g: "",
        m: "",
        s: ""
      },
      longitude: {
        d: "",
        g: "",
        m: "",
        s: ""
      }
    },
    ocorrencias: {
      docs: [],
      page: 1,
      totalPages: 1
    },
    ocorrencias_marcados: [],
    ocorrencias_filtros: {
      limitPerPage: 1000,
      page: 1,
      dataInicio: "",
      dataFim: ""
    },
    modal_view_ocorrencia: false
  },
  mutations: {
    set_ocorrencia: (state, payload) => (state.ocorrencia = payload),
    set_ocorrencias: (state, payload) => (state.ocorrencias = payload),
    set_ocorrencias_marcados: (state, payload) =>
      (state.ocorrencias_marcados = payload),
    set_modal_view_ocorrencia: (state, payload) =>
      (state.modal_view_ocorrencia = payload)
  },
  getters: {
    get_ocorrencia: state => state.ocorrencia,
    get_ocorrencias: state => state.ocorrencias,
    get_ocorrencias_marcados: state => state.ocorrencias_marcados,
    get_modal_view_ocorrencia: state => state.modal_view_ocorrencia,
    get_ocorrencias_filtros: state => state.ocorrencias_filtros
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
