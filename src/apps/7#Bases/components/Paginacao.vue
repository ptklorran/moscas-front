<template>
    <v-pagination
        outlined
        dark
        :style="`background: ${$theme.background}`"
        color="#f5f5f5"
        total-visible="7"
        v-model="get_bases_filtros.page"
        :length="get_bases_filtros.totalPages"
        @input="setPage($event)"
    ></v-pagination>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'get_bases_filtros'
        ])
    },
    methods: {
        ...mapActions([
            'listar_bases'
        ]),
        setPage(page) {
            this.get_bases_filtros.page = page
            this.listar_bases()
        }
    }
}
</script>