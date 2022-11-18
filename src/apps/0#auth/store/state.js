export const state = {
  loggedUser: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null,
  token: sessionStorage.getItem("token")
    ? JSON.parse(sessionStorage.getItem("token"))
    : null,
  modalForgotPassword: false,
  
};

export default {};
