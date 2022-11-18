<template>
    <v-pagination
        outlined
        :style="`background: ${$theme.background}`"
        :color="$theme.primary"
        total-visible="7"
        v-model="get_especies_filtros.page"
        :length="get_especies.totalPages"
        @input="setPage($event)"
    ></v-pagination>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'get_especies',
            'get_especies_filtros'
        ])
    },
    methods: {
        ...mapActions([
            'listar_especies'
        ]),
        setPage(page) {
            if(page) {
                console.log('page', page)
                this.get_especies_filtros.page = page
                this.listar_especies()
            }
        }
    }
}
</script>