<template>
  <layout :title="$route.name" :options="[]">
    <div class="expande-horizontal wrap" :style="`background: ${$theme.background}`">
      <v-flex class="pa-3" xs12>
        <v-list class="pa-0 ma-0" color="transparent" nav dense>
          <v-list-item>
            <v-avatar class="mr-3" :color="$theme.primary" size="31">
              <v-icon color="white"> mdi-check </v-icon>
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title> Bem Vindo! </v-list-item-title>
              <v-list-item-subtitle>
                Veja um resumo dos registros do sistma abaixo!
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex xs12>
        <div class="expande-horizontal wrap">
          <v-flex class="pa-3" xs12 md3>
            <v-card height="300" outlined class="pa-3">
              <v-flex class="pa-3" xs12>
                <div class="expande-horizontal centraliza coluna">
                  <h1 class="fonte font-weight-bold">
                    {{ get_funcionarios.totalDocs }}
                  </h1>
                  <span class="fonte"> Colaboradores </span>
                </div>
              </v-flex>
              <v-divider class="pb-3"></v-divider>
              <v-text-field
                flat
                background-color="#f2f2f2"
                dense
                filled
                :color="$theme.primary"
                :hint="`${get_funcionarios.totalDocs} encontrado(s)`"
                v-model="get_funcionarios_filtros.nome"
                @keydown.enter="listar_funcionarios"
                @click:append="listar_funcionarios"
                append-icon="mdi-magnify"
                placeholder="Busque um colaborador"
              ></v-text-field>
              <v-list nav dense class="pa-0 ma-0">
                <template v-for="(item, i) in get_funcionarios.docs">
                  <v-list-item
                    @click="abre_modal_view_funcionario(item)"
                    :key="item._id"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nome }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.cpf }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    v-if="i !== get_funcionarios.docs.length - 1"
                    :key="i"
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-flex>

          <v-flex class="pa-3" xs12 md3>
            <v-card height="300" outlined class="pa-3">
              <v-flex class="pa-3" xs12>
                <div class="expande-horizontal centraliza coluna">
                  <h1 class="fonte font-weight-bold">
                    {{ get_especies.totalDocs }}
                  </h1>
                  <span class="fonte"> Espécies </span>
                </div>
              </v-flex>
              <v-divider class="pb-3"></v-divider>
              <v-text-field
                flat
                background-color="#f2f2f2"
                dense
                filled
                :color="$theme.primary"
                :hint="`${get_especies.totalDocs} encontrado(s)`"
                v-model="get_especies_filtros.nome"
                @keydown.enter="listar_especies"
                @click:append="listar_especies"
                append-icon="mdi-magnify"
                placeholder="Busque uma espécie"
              ></v-text-field>
              <v-list nav dense class="pa-0 ma-0">
                <template v-for="(item, i) in get_especies.docs">
                  <v-list-item
                    @click="abre_modal_view_especie(item)"
                    :key="item._id"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nome }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Gênero: {{ item.genero.nome }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    v-if="i !== get_especies.docs.length - 1"
                    :key="i"
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-flex>

          <v-flex class="pa-3" xs12 md3>
            <v-card height="300" outlined class="pa-3">
              <v-flex class="pa-3" xs12>
                <div class="expande-horizontal centraliza coluna">
                  <h1 class="fonte font-weight-bold">
                    {{ get_hospedeiros.totalDocs }}
                  </h1>
                  <span class="fonte"> Hospedeiros </span>
                </div>
              </v-flex>
              <v-divider class="pb-3"></v-divider>
              <v-text-field
                flat
                background-color="#f2f2f2"
                dense
                filled
                :color="$theme.primary"
                :hint="`${get_hospedeiros.totalDocs} encontrado(s)`"
                v-model="get_hospedeiros_filtros.nome"
                @keydown.enter="listar_hospedeiros"
                @click:append="listar_hospedeiros"
                append-icon="mdi-magnify"
                placeholder="Busque um Hospedeiro"
              ></v-text-field>
              <v-list nav dense class="pa-0 ma-0">
                <template v-for="(item, i) in get_hospedeiros.docs">
                  <v-list-item
                    @click="abre_modal_view_hospedeiro(item)"
                    :key="item._id"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nome }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    v-if="i !== get_hospedeiros.docs.length - 1"
                    :key="i"
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-flex>

          <v-flex class="pa-3" xs12 md3>
            <v-card height="300" outlined class="pa-3">
              <v-flex class="pa-3" xs12>
                <div class="expande-horizontal centraliza coluna">
                  <h1 class="fonte font-weight-bold">
                    {{ get_familiahospedeiros.totalDocs }}
                  </h1>
                  <span class="fonte"> Família de Hospedeiros </span>
                </div>
              </v-flex>
              <v-divider class="pb-3"></v-divider>
              <v-text-field
                flat
                background-color="#f2f2f2"
                dense
                filled
                :color="$theme.primary"
                :hint="`${get_familiahospedeiros.totalDocs} encontrado(s)`"
                v-model="get_familiahospedeiros_filtros.nome"
                @keydown.enter="listar_familiahospedeiros"
                @click:append="listar_familiahospedeiros"
                append-icon="mdi-magnify"
                placeholder="Busque uma Família"
              ></v-text-field>
              <v-list nav dense class="pa-0 ma-0">
                <template v-for="(item, i) in get_familiahospedeiros.docs">
                  <v-list-item
                    @click="abre_modal_view_familiahospedeiro(item)"
                    :key="item._id"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.nome }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    v-if="i !== get_familiahospedeiros.docs.length - 1"
                    :key="i"
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </div>
      </v-flex>
      <ModalFuncionario />
      <ModalEspecie />
      <ModalHospedeiro />
      <ModalFamiliaHospedeiro />
    </div>
  </layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalFuncionario from "@/apps/1#Funcionarios/components/modalView";
import ModalEspecie from "@/apps/0#Especies/components/modalView";
import ModalHospedeiro from "@/apps/3#Hospedeiro/components/modalView";
import ModalFamiliaHospedeiro from "@/apps/4#FamiliaHospedeiros/components/modalView";
export default {
  components: {
    ModalFuncionario,
    ModalEspecie,
    ModalHospedeiro,
    ModalFamiliaHospedeiro
  },
  computed: {
    ...mapGetters([
      "get_funcionarios",
      "get_funcionarios_filtros",
      "get_especies",
      "get_especies_filtros",
      "get_hospedeiros",
      "get_hospedeiros_filtros",
      "get_familiahospedeiros",
      "get_familiahospedeiros_filtros"
    ])
  },
  methods: {
    ...mapActions([
      "abre_modal_view_especie",
      "abre_modal_view_funcionario",
      "abre_modal_view_hospedeiro",
      "abre_modal_view_familiahospedeiro",
      "listar_funcionarios",
      "listar_especies",
      "listar_hospedeiros",
      "listar_familiahospedeiros"
    ])
  },
  mounted() {
    this.listar_funcionarios();
    this.listar_especies();
    this.listar_hospedeiros();
    this.listar_familiahospedeiros();
  }
};
</script>
