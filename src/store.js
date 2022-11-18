import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { UserLoggedModule } from "@/apps/0#userLogged/store";
import { SharedModule } from "@/apps/shared/store";
import { AuthModule } from "@/apps/0#auth/store";
import Especie from "./apps/0#Especies/meta";
import EspecieHosp from "./apps/2#EspeciesHospedeiro/meta";
import FamiliaHospedeiro from "./apps/4#FamiliaHospedeiros/meta";
import Hospedeiro from "./apps/3#Hospedeiro/meta";
import Ocorrencia from "./apps/5#Ocorrencia/meta";
import Funcionario from "./apps/1#Funcionarios/meta";
import Bases from "./apps/7#Bases/meta";

export const store = new Vuex.Store({
  modules: {
    especie_module: Especie.module,
    familia_module: FamiliaHospedeiro.module,
    hospedeiro_module: Hospedeiro.module,
    ocorrencia_module: Ocorrencia.module,
    UserLoggedModule,
    AuthModule,
    SharedModule,
    funcionario: Funcionario.module,
    espedie_hosp: EspecieHosp.module,
    bases_mod: Bases.module
  }
});

export default store;
