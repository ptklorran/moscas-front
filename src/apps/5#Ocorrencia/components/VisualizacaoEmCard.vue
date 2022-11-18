<template>
  <v-flex
    xs12
    :style="`background: ${$theme.background}`"
    :md3="!fullscreen"
    :class="$vuetify.breakpoint.smAndDown ? 'pa-3' : 'pa-6'"
  >
    <v-card elevation="24" dark color="#333">
      <v-system-bar lights-out></v-system-bar>
      <v-carousel
        :continuous="true"
        :cycle="true"
        :show-arrows="true"
        delimiter-icon="mdi-minus"
        height="250"
      >
        <v-carousel-item v-for="(slide, i) in payload.imagens" :key="i">
          <v-sheet height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">
                <v-img max-height="260" contain :src="slide"></v-img>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-list two-line>
        <v-list-item @click="abre_modal_view_ocorrencia(payload)">
          <v-list-item-content>
            <v-list-item-title class="fonte">{{
              payload.nome
            }}</v-list-item-title>
            <v-list-item-subtitle class="fonte">{{
              payload.descricao
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["payload", "fullscreen", "priceless"],
  methods: {
    ...mapActions(["abre_modal_view_ocorrencia"])
  }
};
</script>
