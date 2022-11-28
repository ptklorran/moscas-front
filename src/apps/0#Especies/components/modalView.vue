<template>
  <v-dialog
    width="700"
    persistent
    transition="slide-x-transition"
    v-model="get_modal_view_especie"
  >
    <v-card class="expande-horizontal wrap">
      <div class="expande-horizontal px-1 pr-3 py-3">
        <v-btn dark @click="fecha_modal_view_especie" icon>
          <v-icon color="grey">
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <span style="font-size: 17pt; width: 100%;" class="fonte">
          Registro de espécie
        </span>
        <div class="expande-horizontal"></div>
        <v-btn class="elevation-3" icon @click="fecha_modal_view_especie">
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
                v-model="get_especie.nome"
                dense
                solo
                flat
                outlined
                clearable
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
              ></v-text-field>
            </v-flex>

            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Gênero
              </span>
              <v-text-field
                v-model="get_especie.genero"
                dense
                solo
                flat
                outlined
                clearable
                :color="$theme.primary"
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
    ...mapGetters(["get_especie", "get_modal_view_especie", "getLoggedUser"])
  },
  watch: {
    "get_especie.nome": val => {
      this.changeEspecie();
    }
  },
  methods: {
    ...mapActions([
      "criar_especie",
      "atualizar_especie",
      "fecha_modal_view_especie"
    ]),
    changeEspecie(val) {
      const genero = val ? val.split(" ")[0] : "";
      this.get_especie.genero = genero;
    },
    valida_form() {
      if (this.$refs.form.validate()) {
        this.get_especie._id ? this.atualizar_especie() : this.criar_especie();
      }
    }
  }
};
</script>
