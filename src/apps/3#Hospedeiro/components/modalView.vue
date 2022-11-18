<template>
  <v-dialog
    width="700"
    persistent
    transition="slide-x-transition"
    v-model="get_modal_view_hospedeiro"
  >
    <v-card class="expande-horizontal wrap">
      <div class="expande-horizontal px-1 pr-3 py-3">
        <v-btn dark @click="fecha_modal_view_hospedeiro" icon>
          <v-icon color="grey">
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <span style="font-size: 17pt; width: 100%;" class="fonte">
          Registro de Hospedeiro
        </span>
        <div class="expande-horizontal"></div>
        <v-btn class="elevation-3" icon @click="fecha_modal_view_hospedeiro">
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
                Família do Hospedeiro
              </span>
              <v-autocomplete
                v-model="get_hospedeiro.familia"
                dense
                solo
                flat
                outlined
                clearable
                return-object
                :items="get_familiahospedeiros.docs"
                item-text="nome"
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: Anacardiaceae"
              ></v-autocomplete>
            </v-flex>

            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Espécie do hospedeiro
              </span>
              <v-autocomplete
                v-model="get_hospedeiro.especie"
                dense
                solo
                flat
                outlined
                clearable
                return-object
                :items="get_especies_hospedeiros.docs"
                item-text="nome"
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: Anastrepha amazonensis Norrbom & Korytkowski"
              ></v-autocomplete>
            </v-flex>
            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Nome Científico
              </span>
              <v-text-field
                v-model="get_hospedeiro.nome"
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
import ModalSendArchive from "../../shared/components/ModalSendArchive.vue";
export default {
  components: { ModalSendArchive },
  computed: {
    ...mapGetters([
      "get_hospedeiro",
      "get_especies_hospedeiros",
      "get_familiahospedeiros",
      "get_familiahospedeiros_filtros",
      "get_especies_filtros",
      "get_modal_view_hospedeiro",
      "getLoggedUser"
    ])
  },
  methods: {
    ...mapActions([
      "criar_hospedeiro",
      "atualizar_hospedeiro",
      "fecha_modal_view_hospedeiro",
      "listar_especies_hospedeiros",
      "listar_familiahospedeiros"
    ]),
    valida_form() {
      if (this.$refs.form.validate()) {
        this.get_hospedeiro._id
          ? this.atualizar_hospedeiro()
          : this.criar_hospedeiro();
      }
    }
  },
  created() {
    this.get_especies_filtros.all = true;
    this.get_familiahospedeiros_filtros.all = true;
    this.get_especies_hospedeiros();
    this.listar_familiahospedeiros();
  },
  beforeDestroy() {
    this.get_especies_filtros.all = false;
    this.get_familiahospedeiros_filtros.all = false;
  }
};
</script>
