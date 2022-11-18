<template>
  <v-dialog
    width="700"
    persistent
    transition="slide-x-transition"
    v-model="get_modal_view_ocorrencia"
  >
    <v-card class="expande-horizontal wrap">
      <div class="expande-horizontal px-1 pr-3 py-3">
        <v-btn dark @click="fecha_modal_view_ocorrencia" icon>
          <v-icon color="grey">
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <span style="font-size: 17pt; width: 100%;" class="fonte">
          Registro de Ocorrência
        </span>
        <div class="expande-horizontal"></div>
        <v-btn class="elevation-3" icon @click="fecha_modal_view_ocorrencia">
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
              <v-autocomplete
                v-model="get_ocorrencia.especie"
                dense
                solo
                flat
                outlined
                :items="get_especies.docs"
                item-text="nome"
                return-object
                clearable
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: "
              ></v-autocomplete>
            </v-flex>

            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Hospedeiro
              </span>
              <v-autocomplete
                v-model="get_ocorrencia.hospedeiro"
                dense
                solo
                flat
                outlined
                clearable
                :items="get_hospedeiros.docs"
                item-text="nome"
                return-object
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: "
              ></v-autocomplete>
            </v-flex>

            <v-flex xs12>
              <div class="expande-horizontal wrap">
                <v-flex class="px-3" md6>
                  <span :style="`color: ${$theme.primary}`" class="fonte"
                    >Latitude</span
                  >
                  <v-text-field
                    label="Latitude"
                    :color="$theme.primary"
                    v-model="get_ocorrencia.latitude"
                    solo
                    flat
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>

                <v-flex class="px-3" md6>
                  <span :style="`color: ${$theme.primary}`" class="fonte"
                    >Longitude</span
                  >
                  <v-text-field
                    label="Latitude"
                    :color="$theme.primary"
                    v-model="get_ocorrencia.longitude"
                    solo
                    flat
                    outlined
                    dense
                  ></v-text-field>
                </v-flex>
              </div>
            </v-flex>

            <div class="expande-horizontal wrap">
              <v-flex class="px-3" md6>
                <span :style="`color: ${$theme.primary}`" class="fonte"
                  >Estado</span
                >
                <v-text-field
                  label="Estado:"
                  :color="$theme.primary"
                  v-model="get_ocorrencia.estado"
                  solo
                  flat
                  outlined
                  dense
                ></v-text-field>
              </v-flex>
              <v-flex class="px-3" md6>
                <span :style="`color: ${$theme.primary}`" class="fonte"
                  >Município</span
                >
                <v-text-field
                  label="Município:"
                  :color="$theme.primary"
                  v-model="get_ocorrencia.municipio"
                  solo
                  flat
                  outlined
                  dense
                ></v-text-field>
              </v-flex>
            </div>

            <!-- <v-flex class="px-3" xs12>
              <span :style="`color: ${$theme.primary}`" class="fonte">Indice de Infestação</span>
              <v-text-field
                label=""
                :color="$theme.primary"
                v-model="get_ocorrencia.indice_infestacao"
                solo
                flat
                outlined
                dense
              ></v-text-field>
            </v-flex> -->

            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Referência Bibliográfica
              </span>
              <v-textarea
                v-model="get_ocorrencia.referenciabibliografica"
                outlined
                clearable
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: "
              ></v-textarea>
            </v-flex>
            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Citação
              </span>
              <v-textarea
                v-model="get_ocorrencia.citacao"
                outlined
                clearable
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: "
              ></v-textarea>
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
      "get_ocorrencia",
      "get_especies",
      "get_especies_filtros",
      "get_hospedeiros",
      "get_hospedeiros_filtros",
      "get_modal_view_ocorrencia",
      "getLoggedUser"
    ])
  },
  methods: {
    ...mapActions([
      "criar_ocorrencia",
      "atualizar_ocorrencia",
      "listar_hospedeiros",
      "listar_especies",
      "fecha_modal_view_ocorrencia"
    ]),
    valida_form() {
      if (this.$refs.form.validate()) {
        this.get_ocorrencia._id
          ? this.atualizar_ocorrencia()
          : this.criar_ocorrencia();
      }
    }
  },
  created() {
    this.get_hospedeiros_filtros.all = true;
    this.get_especies_filtros.all = true;
    this.listar_hospedeiros();
    this.listar_especies();
  },
  beforeDestroy() {
    this.get_hospedeiros_filtros.all = false;
    this.get_especies_filtros.all = false;
  }
};
</script>
