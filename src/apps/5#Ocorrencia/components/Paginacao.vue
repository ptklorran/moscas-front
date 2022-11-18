<template>
  <v-pagination
    outlined
    :style="`background: ${$theme.background}`"
    :color="$theme.primary"
    total-visible="7"
    v-model="get_ocorrencias_filtros.page"
    :length="get_ocorrencias.totalPages"
    @input="setPage($event)"
  ></v-pagination>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["get_ocorrencias", "get_ocorrencias_filtros"])
  },
  methods: {
    ...mapActions(["listar_ocorrencias"]),
    setPage(page) {
      if (page) {
        console.log("page", page);
        this.get_ocorrencias_filtros.page = page;
        this.listar_ocorrencias();
      }
    }
  }
};
</script>
