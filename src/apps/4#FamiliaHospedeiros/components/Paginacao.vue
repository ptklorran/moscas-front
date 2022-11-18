<template>
  <v-pagination
    outlined
    :style="`background: ${$theme.background}`"
    :color="$theme.primary"
    total-visible="7"
    v-model="get_familiahospedeiros_filtros.page"
    :length="get_familiahospedeiros.totalPages"
    @input="setPage($event)"
  ></v-pagination>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["get_familiahospedeiros", "get_familiahospedeiros_filtros"])
  },
  methods: {
    ...mapActions(["listar_familiahospedeiros"]),
    setPage(page) {
      if (page) {
        console.log("page", page);
        this.get_familiahospedeiros_filtros.page = page;
        this.listar_familiahospedeiros();
      }
    }
  }
};
</script>
