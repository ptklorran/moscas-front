import { http } from "@/apps/shared/baseService/config";

const base = {
  rota: "bases",
  nome: "bases"
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
    listar_bases: ({ commit, dispatch, getters }, payload) => {
      dispatch("enableLoading");
      localStorage.link_base = payload || "2";
      console.log("payload", payload);
      service
        .listar(getters.get_bases_filtros)
        .then(res => {
          if (payload) {
            console.log("res.data.docs", res.data.docs);
            res.data.docs.map(base => {
              const base_link = base.link || "no";
              if (base_link.toLowerCase() === payload.toLowerCase()) {
                localStorage.base = base._id;
                localStorage.base_body = JSON.stringify(base);
                commit("set_base", base);
                dispatch("listar_ocorrencias");
                dispatch("listar_especies");
                dispatch("listar_familiahospedeiros");
                dispatch("listar_hospedeiros");
              }
            });
          }
          dispatch("disableLoading");
          commit("set_bases", res.data);
        })
        .catch(e => {
          console.log("ee", e);
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "error",
            message: "erro",
            timeout: 6000
          });
        });
    },
    atualizar_base: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .atualizar({ ...getters.get_base, imagens: getters.getLinks })
        .then(res => {
          dispatch("disableLoading");
          commit("set_base", res.data);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Atualização Concluída!",
            timeout: 6000
          });
          dispatch("listar_bases");
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
    criar_base: ({ commit, dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .criar({ ...getters.get_base })
        .then(() => {
          dispatch("disableLoading");
          commit("set_base", {});
          commit("setLinks", []);
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Registro Concluído!",
            timeout: 6000
          });
          dispatch("listar_bases");
          commit("set_modal_view_base", false);
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
    excluir_base: ({ dispatch, getters }, payload) => {
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
          dispatch("listar_bases");
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
    excluir_bases: ({ dispatch, getters }) => {
      dispatch("enableLoading");
      service
        .excluir(getters.get_bases_marcados)
        .then(() => {
          dispatch("disableLoading");
          dispatch("createGlobalMessage", {
            type: "success",
            message: "Exclusão em massa Concluída!",
            timeout: 6000
          });
          dispatch("listar_bases");
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
    abre_modal_view_base: ({ commit, getters, dispatch }, payload) => {
      if (payload) {
        commit("set_base", payload);
        commit("setLinks", payload.imagens);
      } else {
        commit("set_base", {
          nome: {
            pt: "",
            en: ""
          },
          subtitulo: {
            pt: "",
            en: ""
          },
          descricao: {
            pt: "",
            en: ""
          }
        });
      }
      commit("set_modal_view_base", true);
    },
    fecha_modal_view_base: ({ commit }) => {
      commit("set_base", {
        nome: {
          pt: "",
          en: ""
        },
        subtitulo: {
          pt: "",
          en: ""
        },
        descricao: {
          pt: "",
          en: ""
        }
      });
      commit("set_modal_view_base", false);
    },
    add_base_marcado: ({ commit, getters }, payload) => {
      commit("set_bases_marcados", [...getters.get_bases_marcados, payload]);
    },
    remove_base_marcado: ({ commit, getters }, i) => {
      commit(
        "set_bases_marcados",
        ...getters.get_bases_marcados.filter((item, index) => index !== i)
      );
    }
  },
  state: {
    base: {},
    bases: {
      docs: []
    },
    bases_marcados: [],
    bases_filtros: {
      limitPerPage: 10,
      page: 1,
      dataInicio: "",
      dataFim: ""
    },
    modal_view_base: false
  },
  mutations: {
    set_base: (state, payload) => (state.base = payload),
    set_bases: (state, payload) => (state.bases = payload),
    set_bases_marcados: (state, payload) => (state.bases_marcados = payload),
    set_modal_view_base: (state, payload) => (state.modal_view_base = payload)
  },
  getters: {
    get_base: state => state.base,
    get_bases: state => state.bases,
    get_bases_marcados: state => state.bases_marcados,
    get_modal_view_base: state => state.modal_view_base,
    get_bases_filtros: state => state.bases_filtros
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
