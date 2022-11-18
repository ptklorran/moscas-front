<template>
  <v-dialog
    width="700"
    persistent
    transition="slide-x-transition"
    v-model="get_modal_view_familiahospedeiro"
  >
    <v-card class="expande-horizontal wrap">
      <div class="expande-horizontal px-1 pr-3 py-3">
        <v-btn dark @click="fecha_modal_view_familiahospedeiro" icon>
          <v-icon color="grey">
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <span style="font-size: 17pt; width: 100%;" class="fonte">
          Família dos Hospedeiros
        </span>
        <div class="expande-horizontal"></div>
        <v-btn class="elevation-3" icon @click="fecha_modal_view_familiahospedeiro">
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
                Nome da Família
              </span>
              <v-text-field
                v-model="get_familiahospedeiro.nome"
                dense
                solo
                flat
                outlined
                clearable
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: Anacardiaceae"
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
      "get_familiahospedeiro",
      "getProfessores",
      "get_modal_view_familiahospedeiro",
      "getLoggedUser"
    ])
  },
  methods: {
    ...mapActions([
      "criar_familiahospedeiro",
      "atualizar_familiahospedeiro",
      "listarProfessores",
      "fecha_modal_view_familiahospedeiro"
    ]),
    valida_form() {
      if (this.$refs.form.validate()) {
        this.get_familiahospedeiro._id ? this.atualizar_familiahospedeiro() : this.criar_familiahospedeiro();
      }
    }
  },
  created() {
    this.listarProfessores();
  }
};
</script>
