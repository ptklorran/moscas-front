<template>
  <div :style="`background: ${$theme.background}`" class="expande-horizontal wrap pa-3">
    <v-flex xs12 md3 class="pr-2">
      <v-text-field
        dense
        solo
        background-color="#e2e2e2"
        small
        flat
        label="Filtrar por nome"
        v-model="get_bases_filtros.nome"
        clearable
        hide-details
        :color="$theme.primary"
        @input="debounceSearch"
      ></v-text-field>
    </v-flex>

    <v-flex xs12 md3 class="pr-2 pb-1">
      <v-autocomplete
        dense
        solo-inverted
        small
        flat
        item-text="nome"
        return-object
        label="Filtrar por Categoria"
        :items="get_basecategorias.docs"
        v-model="get_bases_filtros.categoria"
        item-value="id"
        clearable
        hide-details
        @input="debounceSearch"
      ></v-autocomplete>
    </v-flex>

    <!-- <v-flex xs12 md2 class="pr-2 pb-1">
            <v-select
                dense
                solo-inverted
                flat
                label="Filtrar por status"
                clearable
                v-model="get_bases_filtros.status_atual"
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
                        @blur="get_bases_filtros.dataInicio = $helper.formatDate(get_bases_filtros.dataInicio)"
                        readonly
                        clearable
                        @input="listar_bases"
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
                    v-model="get_bases_filtros.dataInicio"
                    @input="listar_bases"
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
                        @blur="get_bases_filtros.dataFim = $helper.formatDate(get_bases_filtros.dataFim)"
                        readonly
                        clearable
                        @input="listar_bases"
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    label="Data final"
                    lang="pt-br"
                    type="date"
                    v-model="get_bases_filtros.dataFim"
                    @input="listar_bases"
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
    ...mapGetters([
      "get_funcionarios",
      "get_clientes",
      "get_basecategorias",
      "get_bases_filtros"
    ]),
    computedInitialDate: {
      get() {
        const data = this.$moment(this.get_bases_filtros.dataInicio).format(
          "DD/MM/YYYY"
        );
        if (data === "Data inválida") {
          return "";
        } else {
          return data;
        }
      },
      set(value) {
        this.get_bases_filtros.dataInicio = value;
      }
    },
    computedFinalDate: {
      get() {
        const data = this.$moment(this.get_bases_filtros.dataFim).format(
          "DD/MM/YYYY"
        );
        if (data === "Data inválida") {
          return "";
        } else {
          return data;
        }
      },
      set(value) {
        this.get_bases_filtros.dataFim = value;
      }
    }
  },
  methods: {
    ...mapActions(["listar_bases"]),
    debounceSearch() {
      const x = _.debounce(this.listar_bases, 800);
      x();
    }
  }
};
</script>
