import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import { dashboard_routes } from "./apps/dashboard/router";
import { logged_user_routes } from "./apps/0#userLogged/router";
import { auth_routes } from "./apps/0#auth/router";
import Especie from "./apps/0#Especies/meta";
import EspecieHospedeiro from "./apps/2#EspeciesHospedeiro/meta";
import Hospedeiro from "./apps/3#Hospedeiro/meta";
import FamiliaHospedeiro from "./apps/4#FamiliaHospedeiros/meta";
import Ocorrencia from "./apps/5#Ocorrencia/meta";
import Funcionario from "./apps/1#Funcionarios/meta";
import Bases from "./apps/7#Bases/meta";

const routes = [
  ...Especie.routes,
  ...EspecieHospedeiro.routes,
  ...FamiliaHospedeiro.routes,
  ...Hospedeiro.routes,
  ...Ocorrencia.routes,
  ...dashboard_routes,
  ...logged_user_routes,
  ...auth_routes,
  ...Funcionario.routes,
  ...Bases.routes
];

export const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
