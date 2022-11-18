import { http } from "@/apps/shared/baseService/config";

const base = {
  rota: "familiahospedeiros",
  nome: "Família dos Hospedeiros"
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
    listar_familiahospedeiros: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .listar({
          ...getters.get_familiahospedeiros_filtros,
          base: localStorage.base
        })
        .then(res => {
          dispatch("disableLoading");
          commit("set_familiahospedeiros", res.data);
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
    atualizar_familiahospedeiro: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .atualizar({
          ...getters.get_familiahospedeiro,
          imagens: getters.getLinks
        })
        .then(res => {
          dispatch("disableLoading");
          commit("set_familiahospedeiro", res.data);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Atualização Concluída!",
            timeout: 6000
          });
          dispatch("listar_familiahospedeiros");
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
    criar_familiahospedeiro: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .criar({ ...getters.get_familiahospedeiro, base: localStorage.base })
        .then(() => {
          dispatch("disableLoading");
          commit("set_familiahospedeiro", {});
          commit("setLinks", []);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Registro Concluído!",
            timeout: 6000
          });
          dispatch("listar_familiahospedeiros");
          commit("set_modal_view_familiahospedeiro", false);
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
    excluir_familiahospedeiro: ({ dispatch, getters }, payload) => {
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
          dispatch("listar_familiahospedeiros");
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
    excluir_familiahospedeiros: ({ dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .excluir(getters.get_familiahospedeiros_marcados)
        .then(() => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Exclusão em massa Concluída!",
            timeout: 6000
          });
          dispatch("listar_familiahospedeiros");
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
    abre_modal_view_familiahospedeiro: (
      { commit, getters, dispatch },
      payload
    ) => {
      if (payload) {
        commit("set_familiahospedeiro", payload);
        commit("setLinks", payload.imagens);
      }
      commit("set_modal_view_familiahospedeiro", true);
    },
    fecha_modal_view_familiahospedeiro: ({ commit }) => {
      commit("set_familiahospedeiro", {});
      commit("setLinks", []);
      commit("set_modal_view_familiahospedeiro", false);
    },
    add_familiahospedeiro_marcado: ({ commit, getters }, payload) => {
      commit("set_familiahospedeiros_marcados", [
        ...getters.get_familiahospedeiros_marcados,
        payload
      ]);
    },
    remove_familiahospedeiro_marcado: ({ commit, getters }, i) => {
      commit(
        "set_familiahospedeiros_marcados",
        ...getters.get_familiahospedeiros_marcados.filter(
          (item, index) => index !== i
        )
      );
    }
  },
  state: {
    familiahospedeiro: {},
    familiahospedeiros: {
      docs: [],
      page: 1,
      totalPages: 1
    },
    familiahospedeiros_marcados: [],
    familiahospedeiros_filtros: {
      limitPerPage: 1000,
      page: 1,
      dataInicio: "",
      dataFim: ""
    },
    modal_view_familiahospedeiro: false
  },
  mutations: {
    set_familiahospedeiro: (state, payload) =>
      (state.familiahospedeiro = payload),
    set_familiahospedeiros: (state, payload) =>
      (state.familiahospedeiros = payload),
    set_familiahospedeiros_marcados: (state, payload) =>
      (state.familiahospedeiros_marcados = payload),
    set_modal_view_familiahospedeiro: (state, payload) =>
      (state.modal_view_familiahospedeiro = payload)
  },
  getters: {
    get_familiahospedeiro: state => state.familiahospedeiro,
    get_familiahospedeiros: state => state.familiahospedeiros,
    get_familiahospedeiros_marcados: state => state.familiahospedeiros_marcados,
    get_modal_view_familiahospedeiro: state =>
      state.modal_view_familiahospedeiro,
    get_familiahospedeiros_filtros: state => state.familiahospedeiros_filtros
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
