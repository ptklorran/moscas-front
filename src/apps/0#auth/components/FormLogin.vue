<template>
  <v-form class="expande-horizontal wrap pa-3 centraliza" ref="form">
    <v-flex class="py-6 px-12" xs12 md10>
      <div class="expande-horizontal centraliza">
        <h2 class="text-center fonte">
          Olá, seja bem vindo, faça login para acessar o sistema.
        </h2>
      </div>
    </v-flex>

    <v-flex xs12 md10>
      <v-text-field
        label="ex: email@gmail.com"
        prefix="Emal:"
        :color="$theme.primary"
        solo
        flat
        append-icon="mdi-account-outline"
        background-color="#f5f5f5"
        :rules="[v => !!v || 'Preencha este campo']"
        v-model="payload.username"
        autocomplete="new-login"
      >
      </v-text-field>
    </v-flex>

    <v-flex xs12 md10>
      <v-text-field
        label="********"
        prefix="Senha: "
        :color="$theme.primary"
        solo
        flat
        append-icon="mdi-lock-outline"
        background-color="#f5f5f5"
        @keyup.enter="validaCampo"
        type="password"
        :rules="[v => !!v || 'Preencha este campo']"
        v-model="payload.senha"
        autocomplete="new-senha"
      >
      </v-text-field>
    </v-flex>

    <v-flex class="pb-1" xs12 md10>
      <div class="expande-horizontal centraliza">
        <v-btn
          class="white--text fonte text-capitalize"
          large
          dark
          color="green"
          @click="validaCampo"
          >entrar</v-btn
        >
      </div>

      <!-- <div v-if="$vuetify.breakpoint.smAndDown" class="expande-horizontal mt-6 centraliza">
                <v-btn text class="fonte" large dark color="black" @click="$router.push('/cadastro')">Faça Seu Cadastro</v-btn>
            </div> -->

      <!-- <div class="expande-horizontal mt-3 centraliza">
                <v-btn large dark color="grey" class="fonte text-capitalize" text @click="setModalForgotPassword(true)">Recuperar Senha</v-btn>
            </div> -->
    </v-flex>
    <ForgotPass />
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import ForgotPass from "./ForgotPassword.vue";
export default {
  data() {
    return {
      payload: {
        username: "",
        senha: ""
      }
    };
  },
  components: {
    ForgotPass
  },
  methods: {
    ...mapActions(["createSession", "setModalForgotPassword"]),
    validaCampo() {
      if (this.$refs.form.validate()) {
        this.createSession(this.payload);
      }
    }
  }
};
</script>
