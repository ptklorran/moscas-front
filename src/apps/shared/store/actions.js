export const actions = {
  createConfirmAction: ({ commit }, payload) => {
    commit("setModalConfirmAction", {
      opened: true,
      icon: payload.icon ? payload.icon : "mdi-warning",
      color: payload.color ? payload.color : "yellow darken-3",
      message: payload.message,
      action: payload.action,
      action_value: payload.action_value
    });
  },
  unsetConfirmAction: ({ commit }) => {
    commit("setModalConfirmAction", {
      opened: false,
      icon: "",
      color: "",
      message: "",
      action: "",
      action_value: ""
    });
  },
  createGlobalMessage: ({ commit, dispatch }, payload) => {
    dispatch("unsetGlobalMessage");
    commit("setGlobalMessage", {
      opened: true,
      icon: payload.icon ? payload.icon : "",
      message: payload.message,
      type: payload.type,
      timeout: payload.timeout,
      submessage: payload.submessage
    });

    setTimeout(() => {
      dispatch("unsetGlobalMessage");
    }, payload.timeout);
  },
  unsetGlobalMessage: ({ commit }) => {
    commit("setGlobalMessage", {
      opened: false,
      icon: "",
      type: "",
      message: "",
      timeout: 0
    });
  },
  enableLoading({ commit }) {
    commit("setModalLoading", true);
  },
  disableLoading({ commit }) {
    commit("setModalLoading", false);
  },
  enableModalSendArchive({ commit }) {
    commit("setModalSendArchive", true);
  },
  disableModalSendArchive({ commit }) {
    commit("setModalSendArchive", false);
  },
  addLink({ commit, getters, dispatch }, link) {
    commit("setLinks", [...getters.getLinks, link]);
    dispatch("createGlobalMessage", {
      type: "success",
      message: "Imagem enviada com sucesso!",
      timeout: 3000
    });
  },
  removeLink({ commit, getters, dispatch }, link) {
    commit(
      "setLinks",
      getters.getLinks.filter(l => l !== link)
    );
    dispatch("createGlobalMessage", {
      type: "success",
      message: "Imagem removida com sucesso!",
      timeout: 3000
    });
  },
  clearLinks({ commit }) {
    commit("setLinks", []);
  },
  addFile({ commit, getters, dispatch }, link) {
    const file = {
      name: getters.getFile.nome,
      link: link
    };
    commit("setFiles", [...getters.getFiles, file]);
    dispatch("createGlobalMessage", {
      type: "success",
      message: "Arquivo enviado!",
      timeout: 3000
    });
  },
  removeFile({ commit, getters, dispatch }, index) {
    commit(
      "setFiles",
      getters.getFiles.filter((l, i) => i !== index)
    );
    dispatch("createGlobalMessage", {
      type: "success",
      message: "Arquivo removido com sucesso!",
      timeout: 3000
    });
  },
  clearFiles({ commit }) {
    commit("setFiles", []);
  },
  setPercentageSentArchive({ commit }, percent) {
    commit("setPercentageSentArchive", percent);
  },
  setCurrentLinkInfo({ commit }, info) {
    commit("setCurrentLinkInfo", info);
  }
};

export default {};
