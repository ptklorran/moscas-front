<template>
  <v-flex class="pa-3" :style="`background: ${$theme.background}`" xs12>
    <v-simple-table class="fonte" style="max-height: 80vh; overflow: auto; border: 1px solid #f2f2f2;">
      <template v-slot:default>
        <thead>
          <tr>
            <!-- <td class="font-weight-bold"> </td> -->
            <td class="font-weight-bold">#ID</td>
            <td class="font-weight-bold">Espécie de Inseto</td>
            <td class="font-weight-bold">Família Hospedeiro</td>
            <td class="font-weight-bold">Espécie Hospedeiro</td>
            <td class="font-weight-bold">Estado</td>
            <td class="font-weight-bold">Município</td>
            <td class="font-weight-bold">Coordenadas</td>
            <td class="font-weight-bold">Citação</td>
            <td class="font-weight-bold">Referência</td>
            <td class="font-weight-bold" v-if="!hideDelete"></td>
          </tr>
        </thead>
        <tbody>
          <tr
            :style="
              `cursor: pointer; background: ${i % 2 === 0 ? '#f2f2f2' : '#fff'}`
            "
            v-for="(item, i) in FilteredOcurrencies"
            :key="item.id"
          >
            <!-- <td style="width: 10px"> <v-checkbox :color="$theme.primary" @click="setMarcado($event, item)" dense hide-details></v-checkbox> </td> -->
            <td
              style="width: 10px"
              @click="abre_modal_view_ocorrencia(item)"
              class="font-weight-bold fonte"
            >
              {{ item.id_ocorrencia }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              {{ item.especie ? item.especie.nome : "-" }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              {{ item.familia_hospedeiro ? item.familia_hospedeiro.nome : "-" }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              {{ item.especie_hospedeiro ? item.especie_hospedeiro.nome : "-" }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              {{ item.estado }}
            </td>
            <td @click="abre_modal_view_ocorrencia(item)">
              {{ item.municipio }}
            </td>
            <td @click="goToCord(item)">
              {{ item.latitude && item.latitude.grau ? item.latitude.grau : "" }}°
              {{ item.latitude && item.latitude.minuto ? item.latitude.minuto : "" }}'
              {{ item.latitude && item.latitude.segundo ? item.latitude.segundo : "" }}"
              {{ item.latitude && item.latitude.direcao ? item.latitude.direcao : "" }},
              {{ item.longitude && item.longitude.grau ? item.longitude.grau : "" }}°
              {{ item.longitude && item.longitude.minuto ? item.longitude.minuto : "" }}'
              {{ item.longitude && item.longitude.segundo ? item.longitude.segundo : "" }}"
              {{ item.longitude && item.longitude.direcao ? item.longitude.direcao : "" }}
              <v-btn
                dark
                rounded
                color="orange"
                class="font-weight-bold"
                text
                x-small
              >
                {{ item.tipo_localizacao }}
              </v-btn>
            </td>
            <td>{{ item.citacao }}</td>
            <td @click="copyRef(item)">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="fonte text-capitalize"
                    small
                    rounded
                    v-bind="attrs"
                    v-on="on"
                  >
                    Clique para copiar
                  </v-btn>
                </template>
                <span> {{ item.referenciabibliografica }}</span>
              </v-tooltip>
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
    <div id="toCopy"></div>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["hideDelete", "goToCord", "FilteredOcurrencies", "ext"],
  data() {
    return {
      toCopy: ""
    };
  },
  computed: {
    ...mapGetters(["get_ocorrencias"]),
    // getFilteredOcurrencie() {
    //   if (this.search) {
    //     this.search
    //   } else {

    //   }
    // }
  },
  methods: {
    ...mapActions([
      "createGlobalMessage",
      "abre_modal_view_ocorrencia",
      "createConfirmAction"
    ]),
    setMarcado(event) {
      console.log("event", event);
      // this.add_ocorrencia_marcado(item)
    },
    copyRef(register) {
      let el = document.createElement("textarea");
      el.value = register.referenciabibliografica;
      document.getElementById("toCopy").appendChild(el);
      el.select();
      document.execCommand("copy");
      document.getElementById("toCopy").removeChild(el);
      this.createGlobalMessage({
        opened: false,
        icon: "mdi-check-circle-outline",
        type: "success",
        message: "Referência bibliográfica copiada com sucesso!",
        timeout: 3000,
        submessage: "Pressione Ctrl + V para colar"
      });
    }
  }
};
</script>
