<template>
  <v-flex class="pa-3" :style="`background: ${$theme.background}`" xs12>
    <v-simple-table style="border: 1px solid #f2f2f2" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <!-- <td class="font-weight-bold"> </td> -->
            <td class="font-weight-bold" v-if="!hideDelete">#ID</td>
            <td class="font-weight-bold">Espécie</td>
            <td class="font-weight-bold">Hospedeiro</td>
            <td class="font-weight-bold">Coordenadas</td>
            <td class="font-weight-bold">Município/Estado</td>
            <td class="font-weight-bold">Ref Bibliográfica</td>
            <td class="font-weight-bold" v-if="!hideDelete"></td>
          </tr>
        </thead>
        <tbody>
          <tr
            :style="
              `cursor: pointer; background: ${i % 2 === 0 ? '#f2f2f2' : '#fff'}`
            "
            v-for="(item, i) in get_ocorrencias.docs"
            :key="item.id"
          >
            <!-- <td style="width: 10px"> <v-checkbox :color="$theme.primary" @click="setMarcado($event, item)" dense hide-details></v-checkbox> </td> -->
            <td
              v-if="!hideDelete"
              style="width: 10px"
              @click="abre_modal_view_ocorrencia(item)"
              class="font-weight-bold"
            >
              {{ item.id_ocorrencia }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              {{ item.especie.nome }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              {{ item.hospedeiro.nome }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              Lat {{ item.latitude }}, Long {{ item.longitude }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              {{ item.municipio }} - {{ item.estado }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              {{ item.referenciabibliografica }}
            </td>
            <td v-if="!hideDelete" style="width: 10px">
              <v-btn
                @click="
                  createConfirmAction({
                    message: 'Deseja remover?',
                    icon: 'mdi-warning',
                    action: 'excluir_ocorrencia',
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
  props: ["hideDelete"],
  computed: {
    ...mapGetters(["get_ocorrencias"])
  },
  methods: {
    ...mapActions(["abre_modal_view_ocorrencia", "createConfirmAction"]),
    setMarcado(event, item) {
      console.log("event", event);
      // this.add_ocorrencia_marcado(item)
    }
  }
};
</script>
