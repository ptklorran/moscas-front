<template>
  <v-flex class="pa-3" :style="`background: ${$theme.background}`" xs12>
    <v-simple-table style="border: 1px solid #f2f2f2" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <!-- <td class="font-weight-bold"> </td> -->
            <td class="font-weight-bold">#ID</td>
            <td class="font-weight-bold">NOME C.</td>
            <td class="font-weight-bold">FAMÍLIA</td>
            <td class="font-weight-bold">ESPÉCIE</td>
            <td class="font-weight-bold"></td>
          </tr>
        </thead>
        <tbody>
          <tr
            :style="
              `cursor: pointer; background: ${i % 2 === 0 ? '#f2f2f2' : '#fff'}`
            "
            v-for="(item, i) in get_hospedeiros.docs"
            :key="item.id"
          >
            <!-- <td style="width: 10px"> <v-checkbox :color="$theme.primary" @click="setMarcado($event, item)" dense hide-details></v-checkbox> </td> -->
            <td
              style="width: 10px"
              @click="abre_modal_view_hospedeiro(item)"
              class="font-weight-bold"
            >
              {{ item.id_hospedeiro }}
            </td>
            <td @click="abre_modal_view_hospedeiro(item)">{{ item.nome }}</td>
            <td @click="abre_modal_view_hospedeiro(item)">
              {{ item.familia.nome || "-" }}
            </td>
            <td @click="abre_modal_view_hospedeiro(item)">
              {{ item.especie.nome || "-" }}
            </td>
            <td style="width: 10px">
              <v-btn
                @click="
                  createConfirmAction({
                    message: 'Deseja remover?',
                    icon: 'mdi-warning',
                    action: 'excluir_hospedeiro',
                    action_value: item
                  })
                "
                icon
                ><v-icon> mdi-delete </v-icon></v-btn
              >
            </td>
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
    ...mapGetters(["get_hospedeiros"])
  },
  methods: {
    ...mapActions(["abre_modal_view_hospedeiro", "createConfirmAction"]),
    setMarcado(event, item) {
      console.log("event", event);
      // this.add_hospedeiro_marcado(item)
    }
  }
};
</script>
