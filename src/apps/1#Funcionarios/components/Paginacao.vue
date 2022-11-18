<template>
  <v-pagination
    outlined
    dark
    :style="`background: ${$theme.background}`"
    color="#f5f5f5"
    total-visible="7"
    v-model="get_funcionarios_filtros.page"
    :length="get_funcionarios_filtros.totalPages"
    @input="setPage($event)"
  ></v-pagination>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["get_funcionarios_filtros"])
  },
  methods: {
    ...mapActions(["listar_funcionarios"]),
    setPage(page) {
      this.get_funcionarios_filtros.page = page;
      this.listar_funcionarios();
    }
  }
};
</script>
