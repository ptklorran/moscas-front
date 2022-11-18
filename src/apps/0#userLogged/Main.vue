<template>
  <layout :title="$route.name">
    <v-tabs background-color="#333" dark :color="$theme.primary" v-model="tabs">
      <v-tab class="fonte">Meus dados</v-tab>
    </v-tabs>
    <Form class="pa-3" v-if="tabs === 0" />
  </layout>
</template>

<script>
import { mapGetters } from "vuex";
import Form from './components/Form'
export default {
  data() {
    return {
      tabs:0
    }
  },
  components: {
    Form,
  },
  computed: {
    ...mapGetters(["getLoggedUser"])
  }
};
</script>
