import { http } from "@/apps/shared/baseService/config";

const base = {
  rota: "funcionarios",
  nome: "Acessos"
};

export const service = {
  criar: data => http.post(`/cliente/${base.rota}/create`, data),
  listar: data => http.post(`/admin/${base.rota}/list`, data),
  atualizar: data => http.post(`/admin/${base.rota}/update`, data),
  excluir: data => http.post(`/admin/${base.rota}/delete`, data),
  excluir_muitos: data => http.post(`/admin/${base.rota}/delete-many`, data)
};

const module = {
  actions: {
    listar_funcionarios: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .listar(getters.get_funcionarios_filtros)
        .then(res => {
          dispatch("disableLoading");
          commit("set_funcionarios", res.data);
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
    atualizar_funcionario: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .atualizar({ ...getters.get_funcionario, imagens: getters.getLinks })
        .then(res => {
          dispatch("disableLoading");
          commit("set_funcionario", res.data);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Atualização Concluída!",
            timeout: 6000
          });
          dispatch("listar_funcionarios");
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
    criar_funcionario: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .criar({ ...getters.get_funcionario, imagens: getters.getLinks })
        .then(() => {
          dispatch("disableLoading");
          commit("set_funcionario", {});
          commit("setLinks", []);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Registro Concluído!",
            timeout: 6000
          });
          dispatch("listar_funcionarios");
          commit("set_modal_view_funcionario", false);
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
    excluir_funcionario: ({ dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .excluir(getters.get_funcionario)
        .then(() => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Exclusão Concluída!",
            timeout: 6000
          });
          dispatch("listar_funcionarios");
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
    excluir_funcionarios: ({ dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .excluir(getters.get_funcionarios_marcados)
        .then(() => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Exclusão em massa Concluída!",
            timeout: 6000
          });
          dispatch("listar_funcionarios");
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
    abre_modal_view_funcionario: ({ commit, getters, dispatch }, payload) => {
      if (payload) {
        commit("set_funcionario", payload);
        commit("setLinks", payload.imagens);
      }
      commit("set_modal_view_funcionario", true);
    },
    fecha_modal_view_funcionario: ({ commit }) => {
      commit("set_funcionario", {});
      commit("setLinks", []);
      commit("set_modal_view_funcionario", false);
    },
    add_funcionario_marcado: ({ commit, getters }, payload) => {
      commit("set_funcionarios_marcados", [
        ...getters.get_funcionarios_marcados,
        payload
      ]);
    },
    remove_funcionario_marcado: ({ commit, getters }, i) => {
      commit(
        "set_funcionarios_marcados",
        ...getters.get_funcionarios_marcados.filter(
          (item, index) => index !== i
        )
      );
    }
  },
  state: {
    funcionario: {},
    funcionarios: {
      docs: [],
      page: 1,
      totalPages: 1
    },
    funcionarios_marcados: [],
    funcionarios_filtros: {
      limitPerPage: 10,
      page: 1,
      dataInicio: "",
      dataFim: ""
    },
    modal_view_funcionario: false
  },
  mutations: {
    set_funcionario: (state, payload) => (state.funcionario = payload),
    set_funcionarios: (state, payload) => (state.funcionarios = payload),
    set_funcionarios_marcados: (state, payload) =>
      (state.funcionarios_marcados = payload),
    set_modal_view_funcionario: (state, payload) =>
      (state.modal_view_funcionario = payload)
  },
  getters: {
    get_funcionario: state => state.funcionario,
    get_funcionarios: state => state.funcionarios,
    get_funcionarios_marcados: state => state.funcionarios_marcados,
    get_modal_view_funcionario: state => state.modal_view_funcionario,
    get_funcionarios_filtros: state => state.funcionarios_filtros
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
