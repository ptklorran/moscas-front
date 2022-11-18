<template>
  <div :style="`background: ${$theme.background}`" class="expande-horizontal centraliza wrap pa-3">
    <v-flex xs12 md3 class="pr-2">
      <v-text-field
        dense
        solo
        background-color="#e5e5e5"
        small
        flat
        label="Pesquise pelo nome"
        v-model="get_ocorrencias_filtros.nome"
        clearable
        hide-details
        :color="$theme.primary"
        @input="debounceSearch"
      ></v-text-field>
    </v-flex>

    <!-- <v-flex xs12 md3 class="pr-2">
      <v-text-field
        dense
        solo
        background-color="#e5e5e5"
        small
        flat
        label="Filtrar por nome"
        v-model="get_ocorrencias_filtros.especie"
        clearable
        hide-details
        :color="$theme.primary"
        @input="debounceSearch"
      ></v-text-field>
    </v-flex> -->

    <!-- <v-flex xs12 md3 class="pr-2 pb-1">
            <v-autocomplete
                dense
                solo-inverted
                small
                flat
                item-text="nome"
                label="Filtrar por Setor"
                :items="get_setores.docs"
                v-model="get_ocorrencias_filtros.setor"
                return-object
                clearable
                hide-details
                @input="debounceSearch"
            ></v-autocomplete>
        </v-flex> -->

    <!-- <v-flex xs12 md2 class="pr-2 pb-1">
            <v-select
                dense
                solo-inverted
                flat
                label="Filtrar por status"
                clearable
                v-model="get_ocorrencias_filtros.status_atual"
                @input="debounceSearch"
                hide-details
                :items="['EM ABERTO']"
            ></v-select>
        </v-flex> -->
    <!-- 
        <v-flex xs12 md3 class="pb-1 pr-1">
            <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
            >   
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        dense
                        solo-inverted
                        flat
                        hide-details=""
                        v-model="computedInitialDate"
                        color="grey darken-1"
                        label="Data Inicial"
                        @blur="get_ocorrencias_filtros.dataInicio = $helper.formatDate(get_ocorrencias_filtros.dataInicio)"
                        readonly
                        clearable
                        @input="listar_ocorrencias"
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    dense
                    solo-inverted
                    small
                    flat
                    label="Data Inicial"
                    clearable
                    lang="pt-br"
                    type="date"
                    v-model="get_ocorrencias_filtros.dataInicio"
                    @input="listar_ocorrencias"
                    hide-details
                >
                </v-date-picker>
            </v-menu>
        </v-flex>
        
        <v-flex xs12 md3 class="pb-1 pr-1">
            <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
            >   
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        dense
                        solo-inverted
                        flat
                        hide-details=""
                        v-model="computedFinalDate"
                        chips
                        color="grey darken-1"
                        small-chips
                        label="Data final"
                        @blur="get_ocorrencias_filtros.dataFim = $helper.formatDate(get_ocorrencias_filtros.dataFim)"
                        readonly
                        clearable
                        @input="listar_ocorrencias"
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    label="Data final"
                    lang="pt-br"
                    type="date"
                    v-model="get_ocorrencias_filtros.dataFim"
                    @input="listar_ocorrencias"
                >
                </v-date-picker>
            </v-menu>
        </v-flex> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
var _ = require("lodash");
export default {
  data() {
    return {
      menu: false,
      menu1: false,
      menu2: false,
      dates1: "",
      dates2: ""
    };
  },
  computed: {
    ...mapGetters(["get_ocorrencias", "get_setores", "get_ocorrencias_filtros"]),
    computedInitialDate: {
      get() {
        const data = this.$moment(this.get_ocorrencias_filtros.dataInicio).format(
          "DD/MM/YYYY"
        );
        if (data === "Data inválida") {
          return "";
        } else {
          return data;
        }
      },
      set(value) {
        this.get_ocorrencias_filtros.dataInicio = value;
      }
    },
    computedFinalDate: {
      get() {
        const data = this.$moment(this.get_ocorrencias_filtros.dataFim).format(
          "DD/MM/YYYY"
        );
        if (data === "Data inválida") {
          return "";
        } else {
          return data;
        }
      },
      set(value) {
        this.get_ocorrencias_filtros.dataFim = value;
      }
    }
  },
  methods: {
    ...mapActions(["listar_ocorrencias"]),
    debounceSearch() {
      const x = _.debounce(this.listar_ocorrencias, 800);
      x();
    }
  }
};
</script>
