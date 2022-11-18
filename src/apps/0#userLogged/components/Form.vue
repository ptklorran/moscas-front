<template>
  <v-form style="background: #333;" ref="usuario">
    <div class="expande-horizontal pa-3" style="flex-wrap: wrap; background: #333;">
      <v-flex class="pa-1" xs12 md4>
        <v-text-field dark dense outlined :color="$theme.primary" label="Nome" v-model="getLoggedUser.nome" ></v-text-field>
      </v-flex>

      <v-flex class="pa-1" xs12 md4>
        <v-text-field dark dense outlined :color="$theme.primary" label="Email" v-model="getLoggedUser.email" ></v-text-field>
      </v-flex>
      
      <v-flex xs12 class="pa-1" md4>
        <v-text-field dark dense outlined :color="$theme.primary" v-mask="['###.###.###-##']" label="Cpf" v-model="getLoggedUser.cpf" ></v-text-field>
      </v-flex>

    </div>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getLoggedUser"])
  }
};
</script>
