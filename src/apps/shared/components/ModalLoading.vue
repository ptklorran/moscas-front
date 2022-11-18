<template>
  <v-dialog
    width="300"
    persistent
    fullscreen
    transition="fade"
    elevation="0"
    style="overflow: hidden; z-index: 1000"
    v-model="getModalLoading"
  >
    <v-card
      class="pa-3"
      elevation="0"
      style="background-color: rgba( 0,0,0,0.3) ;display: flex; width: 100%; height: 100vh; justify-content: center; align-items: center; overflow: hidden; border-radius: 0px;"
      light
      width="300"
    >
      <div class="meio">
        <v-flex xs12>
          <div style="display: flex; justify-content: center; width: 100%">
            <v-avatar size="54" class="elevation-1 fade snack" color="white">
              <v-progress-circular
                size="48"
                indeterminate
                :color="$theme.primary"
              ></v-progress-circular>
            </v-avatar>
          </div>
        </v-flex>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getModalLoading"])
  }
};
</script>
