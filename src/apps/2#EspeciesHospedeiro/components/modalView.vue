<template>
  <v-dialog
    width="700"
    persistent
    transition="slide-x-transition"
    v-model="get_modal_view_especie_hospedeiro"
  >
    <v-card class="expande-horizontal wrap">
      <div class="expande-horizontal px-1 pr-3 py-3">
        <v-btn dark @click="fecha_modal_view_especie_hospedeiro" icon>
          <v-icon color="grey">
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <span style="font-size: 17pt; width: 100%;" class="fonte">
          Registro de espécie de hospedeiro
        </span>
        <div class="expande-horizontal"></div>
        <v-btn
          class="elevation-3"
          icon
          @click="fecha_modal_view_especie_hospedeiro"
        >
          <v-icon color="red">
            mdi-close
          </v-icon>
        </v-btn>
      </div>

      <div class="expande-horizontal wrap pb-0">
        <v-flex xs12>
          <!-- <v-flex xs12>
            <modal-send-archive />
          </v-flex> -->
          <v-form ref="form">
            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Espécie
              </span>
              <v-text-field
                v-model="get_especie_hospedeiro.nome"
                dense
                solo
                flat
                outlined
                clearable
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: Anastrepha amazonensis Norrbom & Korytkowski"
              ></v-text-field>
            </v-flex>
            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Gênero
              </span>
              <v-text-field
                v-model="get_especie_hospedeiro.genero"
                dense
                solo
                flat
                outlined
                clearable
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label=""
              ></v-text-field>
            </v-flex>
          </v-form>
        </v-flex>
      </div>

      <div class="expande-horizontal">
        <v-btn large dark @click="valida_form" tile block color="green">
          <span class="fonte"> Salvar </span>
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "get_especie_hospedeiro",
      "get_modal_view_especie_hospedeiro",
      "getLoggedUser"
    ])
  },
  methods: {
    ...mapActions([
      "criar_especie_hospedeiro",
      "atualizar_especie_hospedeiro",
      "fecha_modal_view_especie_hospedeiro"
    ]),
    valida_form() {
      if (this.$refs.form.validate()) {
        this.get_especie_hospedeiro._id
          ? this.atualizar_especie_hospedeiro()
          : this.criar_especie_hospedeiro();
      }
    }
  }
};
</script>
