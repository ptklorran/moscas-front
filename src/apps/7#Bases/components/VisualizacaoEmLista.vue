<template>
  <v-flex class="pa-3" :style="`background: ${$theme.background}`" xs12>
    <v-simple-table style="border: 1px solid #e2e2e2" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <!-- <td class="font-weight-bold"> </td> -->
            <td class="font-weight-bold">#ID</td>
            <td class="font-weight-bold">NOME</td>
            <td class="font-weight-bold">ULTIMA ATUALIZAÇÃO</td>
            <td class="font-weight-bold">LINK</td>
            <td class="font-weight-bold"></td>
          </tr>
        </thead>
        <tbody>
          <tr
            :style="
              `cursor: pointer; background: ${i % 2 === 0 ? '#f2f2f2' : '#fff'}`
            "
            v-for="(item, i) in get_bases.docs"
            :key="item.id"
          >
            <!-- <td style="width: 10px"> <v-checkbox :color="$theme.primary" @click="setMarcado($event, item)" dense hide-details></v-checkbox> </td> -->
            <td
              style="width: 10px"
              @click="abre_modal_view_base(item)"
              class="font-weight-bold"
            >
              {{ item.id_base }}
            </td>
            <td @click="abre_modal_view_base(item)">{{ item.nome.pt }}</td>
            <td @click="abre_modal_view_base(item)">
              {{ $moment(item.updated_at).format("DD/MM/YY [às] HH:mm") }}
            </td>
            <td>
              <a
                target="_blank"
                class="link white--text"
                :href="`http://200.129.165.106/#/?b=${item.link}`"
                >{{ item.link }}
                <v-icon color="white" size="15">mdi-open-in-new</v-icon>
              </a>
            </td>
            <td style="width: 10px">
              <v-btn
                @click="
                  createConfirmAction({
                    message:
                      'Deseja remover esta base, essa ação é irreversível?',
                    icon: 'mdi-warning',
                    action: 'excluir_base',
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
    ...mapGetters(["get_bases"])
  },
  methods: {
    ...mapActions(["abre_modal_view_base", "createConfirmAction"]),
    setMarcado(event, item) {
      console.log("event", event);
      // this.add_base_marcado(item)
    }
  }
};
</script>

<style>
.link {
  text-decoration: none;
  background: green;
  color: #fff;
  padding: 6px;
  border-radius: 6px;
}
</style>
