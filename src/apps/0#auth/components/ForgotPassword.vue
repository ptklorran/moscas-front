<template>
  <v-dialog width="400" transition="slide-x-transition" v-model="getModalForgotPassword">
    <div class="expande-horizontal centraliza">
      <v-card width="400">
        <div class="expande-horizontal pa-2 centraliza">
          <v-btn @click="setModalForgotPassword(false)" icon :color="$theme.primary" >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <span class="fonte" :style="`color: ${$theme.primary}`">Vamos enviar um email pra você!</span>
          <v-spacer></v-spacer>
          <v-btn @click="setModalForgotPassword(false)" icon :color="$theme.primary">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-flex class="pa-2" xs12>
          <v-text-field
            solo-inverted
            flat
            hide-details
            rounded
            dense
            v-model="email"
            placeholder="Email da sua conta"
            clearable
            :color="$theme.primary"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 class="pa-2">
          <div class="expande-horizontal centraliza">
            <v-btn class="white--text" block rounded :color="$theme.primary" @click="sendForgotPassword(email)">Enviar</v-btn>
          </div>
        </v-flex>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: ''
    }
  },
  computed: {
    ...mapGetters(["getModalForgotPassword"])
  },
  methods: {
    ...mapActions(["setModalForgotPassword", "sendForgotPassword"])
  }
};
</script>
