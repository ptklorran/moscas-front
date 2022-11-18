<template>
  <!-- SNACKBAR DE CONFIRMAÇÃO GLOBAL -->
  <v-snackbar
    v-model="getModalGlobalMessage.opened"
    :timeout="getModalGlobalMessage.timeout"
    transition="slide-x-transition"
    top
    dark
    color="#f2f2f2"
  >
    <div class="expande-horizontal centraliza">
        <v-avatar
          size="27"
          class="elevation-1 mr-3"
          :color="getColorByType(getModalGlobalMessage.type)"
        >
          <v-icon color="black" size="18"> {{ getModalGlobalMessage.type === 'success' ? 'mdi-check' : 'mdi-alert' }} </v-icon>
        </v-avatar>

        <span class="fonte black--text">
          {{ getModalGlobalMessage.message }}
        </span>
    </div>

    <!-- <template v-slot:action="{ attrs }">
        <v-btn
          :color="getColorByType(getModalGlobalMessage.type)"
          text
          v-bind="attrs"
          @click="desativaMensagemGlobal"
        >
          Fechar
        </v-btn>
      </template> -->
  </v-snackbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getModalGlobalMessage"])
  },
  methods: {
    ...mapActions(["desativaMensagemGlobal"]),
    getColorByType(type) {
      const types = {
        success: "#AEEA00",
        warning: "#FFD600",
        error: "#D50000"
      };
      return types[type];
    }
  }
};
</script>

<style>
.card {
  padding: 12px;
  width: 300px;
  overflow: hidden;
  border-radius: 10px;
}
.expande-horizontal {
  display: flex;
  width: 100%;
}
</style>
