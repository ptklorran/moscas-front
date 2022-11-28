<template>
  <v-flex class="pa-3" :style="`background: ${$theme.background}`" xs12>
    <v-simple-table style="border: 1px solid #e2e2e2" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <!-- <td class="font-weight-bold"> </td> -->
            <td class="font-weight-bold">#ID</td>
            <td class="font-weight-bold">NOME</td>
            <td class="font-weight-bold">EMAIL</td>
            <!-- <td class="font-weight-bold">CPF</td> -->
          </tr>
        </thead>
        <tbody>
          <tr
            :style="
              `cursor: pointer; background: ${i % 2 === 0 ? '#f2f2f2' : '#fff'}`
            "
            v-for="(item, i) in get_funcionarios.docs"
            :key="item.id"
          >
            <!-- <td style="width: 10px"> <v-checkbox :color="$theme.primary" @click="setMarcado($event, item)" dense hide-details></v-checkbox> </td> -->
            <td
              style="width: 10px"
              @click="abre_modal_view_funcionario(item)"
              class="font-weight-bold"
            >
              {{ item.id_funcionario }}
            </td>
            <td @click="abre_modal_view_funcionario(item)">{{ item.nome }}</td>
            <td @click="abre_modal_view_funcionario(item)">{{ item.email }}</td>
            <!-- <td @click="abre_modal_view_funcionario(item)">{{ item.cpf }}</td> -->
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["get_funcionarios"])
  },
  methods: {
    ...mapActions(["abre_modal_view_funcionario"]),
    setMarcado(event, item) {
      console.log("event", event);
      // this.add_funcionario_marcado(item)
    }
  }
};
</script>
