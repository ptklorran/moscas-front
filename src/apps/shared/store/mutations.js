export const mutations = {
  setGlobalMessage(state, payload) {
    state.modalGlobalMessage = payload;
  },
  setModalConfirmAction(state, payload) {
    state.modalConfirmAction = {};
    state.modalConfirmAction = payload;
  },
  setModalLoading(state, payload) {
    state.modalLoading = payload;
  },
  setModalSendArchive(state, payload) {
    state.modalSendArchive = payload
  },
  setLinks(state, payload) {
    state.links = payload
  },
  setFiles(state, payload) {
    state.files = payload
  },
  setPercentageSentArchive(state, payload) {
    state.percentageSentArchive = payload
  },
  setCurrentLinkInfo(state, payload) {
    state.currentLinkInfo = payload
  }
};

export default {};
