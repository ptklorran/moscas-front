<template>
  <v-dialog
    width="700"
    persistent
    transition="slide-x-transition"
    v-model="get_modal_view_funcionario"
  >
    <v-card class="expande-horizontal wrap">
      <div class="expande-horizontal px-1 pr-3 py-3">
        <v-btn dark @click="fecha_modal_view_funcionario" icon>
          <v-icon color="grey">
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <span style="font-size: 17pt; width: 100%;" class="fonte">
          Registro de Colaborador
        </span>
        <div class="expande-horizontal"></div>
        <v-btn class="elevation-3" icon @click="fecha_modal_view_funcionario">
          <v-icon color="red">
            mdi-close
          </v-icon>
        </v-btn>
      </div>

      <div class="expande-horizontal wrap py-6 pt-0 pb-0">
        <v-flex class="pa-3" xs12>
          <div class="expande-horizontal column">
            <!-- <modal-send-archive /> -->
            <v-form ref="form" class="expande-horizontal wrap">

              <v-flex xs12>
                <span class="fonte"> Nome </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_funcionario.nome"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>

              <v-flex class="px-1" xs12 md6>
                <span class="fonte"> Email </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_funcionario.email"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md3>
                <span class="fonte"> CPF </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_funcionario.cpf"
                  v-mask="['###.###.###-##']"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md3 class="px-1">
                <span class="fonte"> Senha </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_funcionario.senha"
                  :color="$theme.primary"
                ></v-text-field>
              </v-flex>
            </v-form>
          </div>
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
      "get_funcionario",
      "get_modal_view_funcionario",
      "get_setores",
      "getLoggedUser"
    ])
  },
  methods: {
    ...mapActions([
      "criar_funcionario",
      "atualizar_funcionario",
      "fecha_modal_view_funcionario",
      "listar_setores"
    ]),
    valida_form() {
      if (this.$refs.form.validate()) {
        this.get_funcionario._id
          ? this.atualizar_funcionario()
          : this.criar_funcionario();
      }
    }
  },
  created() {
    this.listar_setores();
  }
};
</script>
