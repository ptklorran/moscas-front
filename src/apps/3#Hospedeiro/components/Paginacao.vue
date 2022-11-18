<template>
  <v-pagination
    outlined
    :style="`background: ${$theme.background}`"
    :color="$theme.primary"
    total-visible="7"
    v-model="get_hospedeiros_filtros.page"
    :length="get_hospedeiros.totalPages"
    @input="setPage($event)"
  ></v-pagination>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["get_hospedeiros", "get_hospedeiros_filtros"])
  },
  methods: {
    ...mapActions(["listar_hospedeiros"]),
    setPage(page) {
      if (page) {
        console.log("page", page);
        this.get_hospedeiros_filtros.page = page;
        this.listar_hospedeiros();
      }
    }
  }
};
</script>
