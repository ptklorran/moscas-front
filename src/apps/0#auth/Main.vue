<template>
  <v-container fluid style="background: linear-gradient(to right, #f5f5f5, #f5f5f5);" class="inflar centraliza">
    <v-card class="pr-0 pt-3 mr-0" width="800" style="display: flex; border-radius: 6px;">
      <v-flex xs12 class="pa-3">
        <div class="expande-horizontal centraliza">
          <img height="80" class="mb-2" :src="$theme.logo"/>
        </div>
        <div class="expande-horizontal centraliza">
          <FormLogin />
        </div>
      </v-flex>
    </v-card>
  </v-container>
</template>

<script>
import FormLogin from "./components/FormLogin";

export default {
  components: {
    FormLogin,
  }
};
</script>
