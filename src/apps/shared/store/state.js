export const state = {
  modalGlobalMessage: {
    opened: false,
    icon: "",
    type: "",
    message: "",
    timeout: 3000
  },
  modalConfirmAction: {
    opened: false,
    icon: "mdi-check",
    color: "",
    message: "Olá, deseja sair?",
    action: "",
    action_value: ""
  },
  modalLoading: false,
  modalSendArchive: false,
  links: [],
  files: [],
  file: {},
  link: {},
  percentageSentArchive: 0
};

export default {};
