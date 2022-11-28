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
              <span class="py-3 mb-1 fonte" :style="`color: ${$theme.primary}`">
                Espécie
                <v-btn
                  @click="abre_modal_view_especie"
                  rounded
                  dark
                  class="mb-1 font-weight-bold fonte"
                  x-small
                  color="green"
                >
                  Cadastrar
                  <v-icon size="15" class="ml-1"
                    >mdi-plus-circle-outline</v-icon
                  >
                </v-btn>
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
                Família Hospedeiro
                <v-btn
                  @click="abre_modal_view_familiahospedeiro"
                  rounded
                  dark
                  class="mb-1 font-weight-bold fonte"
                  x-small
                  color="green"
                >
                  Cadastrar
                  <v-icon size="15" class="ml-1"
                    >mdi-plus-circle-outline</v-icon
                  >
                </v-btn>
              </span>
              <v-autocomplete
                v-model="get_ocorrencia.familia_hospedeiro"
                dense
                solo
                flat
                outlined
                clearable
                :items="get_familiahospedeiros.docs"
                item-text="nome"
                return-object
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: "
              ></v-autocomplete>
            </v-flex>

            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Espécie Hospedeiro
                <v-btn
                  @click="abre_modal_view_especie_hospedeiro"
                  rounded
                  dark
                  class="mb-1 font-weight-bold fonte"
                  x-small
                  color="green"
                >
                  Cadastrar
                  <v-icon size="15" class="ml-1"
                    >mdi-plus-circle-outline</v-icon
                  >
                </v-btn>
              </span>
              <v-autocomplete
                v-model="get_ocorrencia.especie_hospedeiro"
                dense
                solo
                flat
                outlined
                clearable
                :items="get_especies_hospedeiros.docs"
                item-text="nome"
                return-object
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: "
              ></v-autocomplete>
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
            <v-flex xs12>
              <div class="expande-horizontal wrap">
                <v-flex class="px-3" md5>
                  <span :style="`color: ${$theme.primary}`" class="fonte"
                    >Latitude</span
                  >
                  <div class="expande-horizontal">
                    <v-select
                      type="number"
                      :items="['N', 'S']"
                      v-model="get_ocorrencia.latitude.direcao"
                    ></v-select>
                    <v-text-field
                      type="number"
                      v-mask="['##']"
                      prefix="G:"
                      v-model="get_ocorrencia.latitude.grau"
                    ></v-text-field>
                    <v-text-field
                      type="number"
                      prefix="M:"
                      v-model="get_ocorrencia.latitude.minuto"
                    ></v-text-field>
                    <v-text-field
                      type="number"
                      prefix="S"
                      v-model="get_ocorrencia.latitude.segundo"
                    ></v-text-field>
                  </div>
                </v-flex>
                <v-flex class="px-3" md5>
                  <span :style="`color: ${$theme.primary}`" class="fonte"
                    >Longitude</span
                  >
                  <div class="expande-horizontal">
                    <v-select
                      type="number"
                      :items="['W']"
                      v-model="get_ocorrencia.longitude.direcao"
                    ></v-select>
                    <v-text-field
                      type="number"
                      v-mask="['##']"
                      prefix="G:"
                      v-model="get_ocorrencia.longitude.grau"
                    ></v-text-field>
                    <v-text-field
                      type="number"
                      prefix="M:"
                      v-model="get_ocorrencia.longitude.minuto"
                    ></v-text-field>
                    <v-text-field
                      type="number"
                      prefix="S"
                      v-model="get_ocorrencia.longitude.segundo"
                    ></v-text-field>
                  </div>
                </v-flex>
                <v-flex xs12 md2>
                  <v-btn
                    :color="
                      get_ocorrencia.tipo_localizacao === 'Real'
                        ? 'green'
                        : 'grey'
                    "
                    dark
                    small
                    class="mb-1"
                    @click="setTipoLocalizacao('Real')"
                  >
                    <v-icon
                      size="12"
                      v-if="
                        get_ocorrencia.tipo_localizacao === 'Real'
                          ? true
                          : false
                      "
                      color="white"
                      >mdi-check-circle-outline</v-icon
                    >
                    Real
                  </v-btn>
                  <v-btn
                    :color="
                      get_ocorrencia.tipo_localizacao === 'Estimada'
                        ? 'green'
                        : 'grey'
                    "
                    dark
                    small
                    @click="setTipoLocalizacao('Estimada')"
                  >
                    <v-icon
                      size="12"
                      v-if="
                        get_ocorrencia.tipo_localizacao === 'Estimada'
                          ? true
                          : false
                      "
                      color="white"
                      >mdi-check-circle-outline</v-icon
                    >
                    Estimada
                  </v-btn>
                </v-flex>

                <!-- <v-flex class="px-3" md6>
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
                </v-flex> -->
              </div>
            </v-flex>
            <v-flex class="px-3" xs12>
              <span class="py-3 fonte" :style="`color: ${$theme.primary}`">
                Citação
              </span>
              <v-text-field
                v-model="get_ocorrencia.citacao"
                outlined
                clearable
                :color="$theme.primary"
                :rules="[v => !!v || 'Preencha este campo']"
                label="ex: "
              ></v-text-field>
            </v-flex>
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
          </v-form>
        </v-flex>
      </div>

      <div class="expande-horizontal">
        <v-btn large dark @click="valida_form" tile block color="green">
          <span class="fonte"> Salvar </span>
        </v-btn>
      </div>
    </v-card>
    <ModalViewEspecie />
    <ModalViewEspecieHospedeiro />
    <ModalViewFamiliaHospedeiro />
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalViewEspecie from "@/apps/0#Especies/components/modalView";
import ModalViewEspecieHospedeiro from "@/apps/2#EspeciesHospedeiro/components/modalView";
import ModalViewFamiliaHospedeiro from "@/apps/4#FamiliaHospedeiros/components/modalView";
export default {
  components: {
    ModalViewEspecie,
    ModalViewEspecieHospedeiro,
    ModalViewFamiliaHospedeiro
  },
  computed: {
    ...mapGetters([
      "get_ocorrencia",
      "get_especies",
      "get_familiahospedeiros",
      "get_especies_hospedeiros",
      "get_especies_filtros",
      "get_hospedeiros_filtros",
      "get_modal_view_ocorrencia",
      "getLoggedUser"
    ])
  },
  methods: {
    ...mapActions([
      "criar_ocorrencia",
      "atualizar_ocorrencia",
      "listar_especies",
      "fecha_modal_view_ocorrencia",
      "abre_modal_view_especie",
      "abre_modal_view_familiahospedeiro",
      "abre_modal_view_especie_hospedeiro",
      "listar_especies_hospedeiros",
      "listar_familiahospedeiros"
    ]),
    valida_form() {
      if (this.$refs.form.validate()) {
        this.get_ocorrencia._id
          ? this.atualizar_ocorrencia()
          : this.criar_ocorrencia();
      }
    },
    setTipoLocalizacao(val) {
      this.get_ocorrencia.tipo_localizacao = val;
      this.$forceUpdate();
    }
  },
  created() {
    this.listar_especies();
    this.listar_familiahospedeiros();
    this.listar_especies_hospedeiros();
  }
};
</script>
