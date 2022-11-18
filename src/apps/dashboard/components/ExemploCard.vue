<template>
  <v-card
    @click="$router.push('/notifications')"
    dark
    height="120"
    class="expande-horizontal bg-card-dash pa-3"
    style="flex-wrap: wrap;"
  >
    <div
      class="expande-horizontal"
      style="flex-wrap: nowrap; align-items: center;"
    >
      <span :style="`font-size: 18px; font-weight: bold; color: white`"
        > 0 </span
      >
      <v-spacer></v-spacer>
    </div>

    <div
      class="expande-horizontal"
      style="flex-wrap: nowrap; align-items: center;"
    >
      <div class="coluna">
        <span class="fonteTitulo white--text">Exemplo Card</span>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-icon color="white"> mdi-check </v-icon>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'getExemplo'
        ])
    }
}
</script>
