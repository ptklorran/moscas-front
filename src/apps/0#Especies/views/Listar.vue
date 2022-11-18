<template>
  <layout :style="`background: ${$theme.background}`" :title="$route.name" :options="options">
    <Filtros />

    <div
      v-if="card"
      class="expande-horizontal wrap"
      :style="`background: ${$theme.background}`"
    >
      <VisualizacaoEmCard
        v-show="get_especies.docs.length > 0"
        v-for="payload in get_especies.docs"
        :key="payload.id"
        :payload="payload"
      />
    </div>

    <div v-else class="expande-horizontal wrap">
      <VisualizacaoEmLista v-show="get_especies.docs.length > 0" />
    </div>

    <ListagemVazia v-show="get_especies.docs.length === 0" />
    <Paginacao />
    <ModalView />

    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="false"
      :preview-modal="true"
      filename="proposta"
      :manual-pagination="true"
      pdf-format="a4"
      :pdf-quality="10"
      pdf-orientation="portrait"
      @progress="() => {}"
      @hasStartedGeneration="() => {}"
      @hasDownloaded="hasGenerated($event)"
      ref="html2Pdf"
    >
      <div slot="pdf-content">
        <section class="pdf-item">
          <div class="expande-horizontal centraliza coluna">
            <h1 class="font-weight-bold">{{ $route.name }}</h1>
          </div>
          <div v-if="card" class="expande-horizontal centraliza pa-6 wrap">
            <VisualizacaoEmCard
              v-show="get_especies.docs.length > 0"
              v-for="payload in get_especies.data"
              :key="payload.id"
              :payload="payload"
            />
          </div>

          <div v-else class="expande-horizontal centraliza pa-6 wrap">
            <VisualizacaoEmLista v-show="get_especies.docs.length > 0" />
          </div>
        </section>
      </div>
    </vue-html2pdf>
  </layout>
</template>

<script>
import Filtros from "../components/Filtros.vue";
import VisualizacaoEmCard from "../components/VisualizacaoEmCard.vue";
import VisualizacaoEmLista from "../components/VisualizacaoEmLista.vue";
import Paginacao from "../components/Paginacao.vue";
import ListagemVazia from "../components/ListagemVazia.vue";
import ModalView from "../components/modalView.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      card: false,
      options: [
        {
          icon: "mdi-plus",
          nome: "Nova espécie",
          action: () => this.abre_modal_view_especie()
        },
        {
          icon: "mdi-update",
          nome: "Atualizar",
          action: () => this.listar_especies()
        },
        {
          icon: "mdi-printer",
          nome: "Imprimir",
          action: () => this.imprimir()
        }
        // {
        //     icon: 'mdi-ballot-outline',
        //     nome: 'Visualizar em Lista',
        //     action: () => this.card = false
        // },
        // {
        //     icon: 'mdi-post',
        //     nome: 'Visualizar em Card',
        //     action: () => this.card = true
        // }
      ]
    };
  },
  components: {
    Filtros,
    VisualizacaoEmCard,
    VisualizacaoEmLista,
    Paginacao,
    ListagemVazia,
    ModalView
  },
  computed: {
    ...mapGetters(["get_especies", "get_especies_filtros", "getLoggedUser"])
  },
  methods: {
    ...mapActions(["abre_modal_view_especie", "listar_especies"]),
    imprimir() {
      this.card = false;
      this.$refs.html2Pdf.generatePdf();
    }
  },
  created() {
    this.listar_especies();
  }
};
</script>
