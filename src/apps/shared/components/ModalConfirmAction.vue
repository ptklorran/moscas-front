<template>
  <!-- SNACKBAR DE CONFIRMAÇÃO GLOBAL -->
  <v-dialog
    width="300"
    persistent
    v-model="getModalConfirmAction.opened"
    transition="slide-x-transition"
  >
    <v-card class="card expande-horizontal centraliza">
      <div class="expande-horizontal centraliza wrap">
        <v-flex xs12>
          <div class="expande-horizontal centraliza">
            <v-avatar class="elevation-1" :color="$theme.primary">
              <v-icon class="fadeIn" color="white">
                mdi-check
              </v-icon>
            </v-avatar>
          </div>
        </v-flex>

        <v-flex class="mt-3 mb-3" xs12>
          <div class="expande-horizontal centraliza">
            <h4 class="fonte text-center">
              {{ getModalConfirmAction.message }}
            </h4>
          </div>
        </v-flex>

        <v-flex xs12>
          <div class="expande-horizontal semquebra">
            <v-flex class="pa-2" xs6>
              <v-btn
                class="fonte"
                text
                color="default"
                block
                @click.prevent="unsetConfirmAction"
              >
                Não
              </v-btn>
            </v-flex>

            <v-flex class="pa-2" xs6>
              <v-btn
                class="fonte"
                :color="$theme.primary"
                block
                @click.prevent="sim()"
                outlined
              >
                Sim
              </v-btn>
            </v-flex>
          </div>
        </v-flex>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getModalConfirmAction"])
  },
  methods: {
    ...mapActions(["unsetConfirmAction"]),
    sim() {
      this.$store.dispatch(
        this.getModalConfirmAction.action,
        this.getModalConfirmAction.action_value
      );
      this.unsetConfirmAction();
    }
  }
};
</script>

<style>
.card {
  padding: 12px;
  width: 300px;
  overflow: hidden;
  border-radius: 10px;
}
.expande-horizontal {
  display: flex;
  width: 100%;
}
</style>
