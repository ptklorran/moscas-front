export const auth_routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../Main.vue")
  },
  {
    path: "/",
    name: "Consulta",
    component: () => import("../Consulta.vue")
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: () => import("../Signup.vue")
  },
  {
    path: "/recover-pass/:token",
    props: true,
    name: "Recuperação de Senha",
    component: () => import("../ForgotPasswordFire.vue")
  },
  {
    path: "/activate-account/:id",
    props: true,
    name: "Ative sua conta",
    component: () => import("../ActivateAccount.vue")
  },
];

export default {};
