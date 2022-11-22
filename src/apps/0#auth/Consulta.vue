<template>
  <div class="expande-horizontal wrap">
    <v-flex xs12>
      <div class="expande-horizontal centraliza">
        <img @click="selectLang('en')" :class="{ unselectedImg: base_lang !== 'en' }" style="padding: 6px; border-radius: 13px; cursor: pointer;" width="60" height="40" src="img/eua1.jpg" alt="eua">
        <img @click="selectLang('pt')" :class="{ unselectedImg: base_lang !== 'pt' }" style="padding: 6px; border-radius: 13px; cursor: pointer;" width="60" height="40" src="img/br.jpg" alt="br">
      </div>
    </v-flex>
	<v-flex xs12>
			<v-card class="expande-horizontal column centraliza elevation-0 wrap">
				<v-flex xs12 >
					<div class="expande-horizontal wrap">
            <v-flex xs12 md4>
              <img class="mr-6" height="80" src="img/logo_anastrepha.gif" style="border-radius: 9px;"></img>
            </v-flex>
            <v-flex xs12 md8>
              <div class="column pt-6 wrap expande-horizontal">
                <v-flex xs12>
                  <h1 style="font-size: 30px; min-width: 600px; width: 100% !important;" class="green--text expande-horizontal">{{ get_base.nome[base_lang] }}</h1>
                </v-flex>
                <h3 class="green--text">{{ get_base.subtitulo[base_lang] }}</h3>
              </div>
            </v-flex>
					</div>
				</v-flex>
				<v-flex xs12 md8>
					<div class="expande-horizontal centraliza pa-3">
						<span class="fonte font-weight-bold text-center">{{ get_base.descricao[base_lang] }}</span>
					</div>
				</v-flex>
				<v-flex xs8 class="mt-2 mb-2">
        </v-flex>
			</v-card>
      <div class="expande-horizontal centraliza">
        <v-flex xs8>
          <v-divider class="mb-6"></v-divider>
        </v-flex>
      </div>
      <v-flex v-if="show === 'search'" xs12>
        <div class="expande-horizontal centraliza wrap">
          <v-flex xs12 md8>
            <div class="expande-horizontal wrap">
              <v-flex xs12 md6>
                <div class="expande-horizontal wrap column px-2">
                  <span class="fonte fonte-mini font-weight-bold blue--text">
                    {{ base_lang === 'pt' ? 'Selecione pelo menos 1 critério' : 'Select at least one criterion' }}
                  </span>
                  <span class="fonte fonte-mini font-weight-bold">{{ get_base.link }}</span>
                  <v-autocomplete
                    v-model="filter.especie"
                    :prefix="base_lang === 'pt' ? 'Espécie:' : 'Species:'"
                    dense
                    solo
                    :items="get_especies.docs"
                    item-text="nome"
                    item-value="_id"
                    flat
                    background-color="#f2f2f2"
                    color="green"
                  >

                  </v-autocomplete>
                  <span class="fonte fonte-mini font-weight-bold">{{ base_lang === 'pt' ? 'Hospedeiro' : 'Host' }}</span>
                  <v-autocomplete
                    :prefix="base_lang === 'pt' ? 'Família:' : 'Family:'"
                    dense
                    solo
                    flat
                    :items="get_familiahospedeiros.docs"
                    item-text="nome"
                    item-value="nome"
                    v-model="filter.familiahospedeiro"
                    background-color="#f2f2f2"
                    color="green"
                  >

                  </v-autocomplete>
                  <v-autocomplete
                    :prefix="base_lang === 'pt' ? 'Nome Científico:' : 'Scientific Name:'"
                    dense
                    solo
                    :items="get_hospedeiros.docs"
                    item-text="nome"
                    item-value="nome"
                    v-model="filter.nomecientifico"
                    flat
                    background-color="#f2f2f2"
                    color="green"
                  >

                  </v-autocomplete>
                  <span class="fonte fonte-mini font-weight-bold"> {{ base_lang === 'pt' ? 'Ocorrência' : 'Occurrence' }} </span>
                  <div class="expande-horizontal">
                    <v-flex xs6>
                      <v-autocomplete
                        :prefix="base_lang === 'pt' ? 'Estado:' : 'State:'"
                        dense
                        solo
                        v-model="filter.estado"
                        :items="get_states"
                        item-value="estado"
                        item-text="estado"
                        flat
                        background-color="#f2f2f2"
                        color="green"
                      >
    
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs6 class="pl-1">
                      <v-autocomplete
                        :prefix="base_lang === 'pt' ? 'Município:' : 'City:'"
                        dense
                        v-model="filter.municipio"
                        :items="get_cities"
                        item-value="municipio"
                        item-text="municipio"
                        solo
                        flat
                        class="text-capitalize"
                        background-color="#f2f2f2"
                        color="green"
                      >
    
                      </v-autocomplete>
                    </v-flex>
                  </div>
                  <div class="expande-horizontal pb-2">
                    <v-flex xs6>
                      <v-btn @click="show='view'" dark class="fonte font-weight-bold" color="green" small outlined> {{ base_lang === 'pt' ? 'Buscar' : 'Search' }} <v-icon size="18" class="mt-1 ml-2">mdi-magnify</v-icon> </v-btn>
                    </v-flex>
                  </div>
                  <div class="expande-horizontal centraliza">
                    {{ get_ocorrencias.docs.length }} {{ base_lang === 'pt' ? 'registros encontrados' : 'records found' }}
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 md6>
                <div class="expande-horizontal column">
                  <img  style="height: 380px; border-radius: 6px;" :src="get_base.img" alt="">
                  <span> {{ base_lang === 'pt' ? 'Atualizado em' : 'Updated at' }} : {{ $moment(get_base.updated_at).format('YYYY-MM-DD HH:mm') }} </span>
                </div>
              </v-flex>
            </div>
          </v-flex>
        </div>
      </v-flex>
      <v-flex v-if="show === 'view'" xs12>
        <div class="fonte pa-1 expande-horizontal">
          <v-btn class="mr-6" @click="show='search'" rounded small>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          Zoom:
          <v-btn class="mx-3 mt-1" @click="zoom--" text x-small>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn class="mt-1" @click="zoom++" text x-small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div style="display: flex; height: 50vh">
          <MglMap :interactive="true" :zoom="zoom" :showZoom="true" :center="center" style="background-color: #555" :accessToken="accessToken" :mapStyle.sync="mapStyle">
              <div v-for="item in get_ocorrencias.docs" :key="item._id">
                  <MglMarker :coordinates="[parseFloat(item.longitude || 0), parseFloat(item.latitude || 0)]" color="#F9A825">
                      <MglPopup showed :coordinates="[parseFloat(item.longitude || 0), parseFloat(item.latitude || 0)]" anchor="top">
                          <div class="bg">
                              <div class="expande-horizontal">
                                <v-flex xs3>
                                  <v-avatar size="30" class="mr-2" color="green">
                                    <v-icon color="white">mdi-bug</v-icon>
                                  </v-avatar>
                                </v-flex>
                                <v-flex class="fonte" xs10>
                                  <strong class="font-weight-bold">Espécie: </strong>
                                  <span>{{item.especie.nome}}</span>
                                </v-flex>
                              </div>
                          </div>
                      </MglPopup>
                  </MglMarker>
              </div>
          </MglMap>
        </div>
			<div class="expande-horizontal wrap" style="height: 70vh;">
				<div class="expande-horizontal wrap">
          <VisualizacaoEmLista :goToCord="goToCord" :hideDelete="true" v-show="get_ocorrencias.docs.length > 0" />
        </div>

        <ListagemVazia v-show="get_ocorrencias.docs.length === 0" />
        <div class="expande-horizontal centraliza">
          <Paginacao />
        </div>
			</div>
      </v-flex>
      <div class="expande-horizontal centraliza">
        <v-flex xs8>
          <v-divider class="mb-6"></v-divider>
        </v-flex>
      </div>
      <div class="expande-horizontal centraliza">
        <v-flex xs12 md8>
          <div class="expande-horizontal wrap centraliza">
            <v-flex xs12 md6>
              <div class="expande-horizontal centraliza column">
                <span>{{ base_lang === 'pt' ? 'Agradecimentos' : 'Acknowledgement' }}</span>
                <img src="img/cnpq.png" alt="">
              </div>
            </v-flex>
            <v-flex xs12 md6>
              <div class="expande-horizontal centraliza column">
                <a @click="autores_modal=true"> {{ base_lang === 'pt' ? 'Autores/Colaboradores/Como citar' : 'Authors/Collaborators/How to cite' }} </a>
                <img src="img/embrapa.gif" alt="">
              </div>
            </v-flex>
          </div>
        </v-flex>
      </div>
		</v-flex>
    <v-dialog
      v-model="splash"
      fullscreen
      transition="slide-x-transition"
      absolute
    >
      <v-card color="white" class="expande-horizontal column centraliza" style="height: 100vh;">
        <img src="img/logo_anastrepha.gif" alt="">
        <v-progress-linear
          color="red lighten-2"
          buffer-value="0"
          stream
        ></v-progress-linear>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="autores_modal"
      fullscreen
      absolute
    >
      <v-card color="white" class="expande-horizontal column centraliza" style="height: 100vh;">
        <div class="expande-horizontal centraliza wrap">
          <v-flex xs12 md8>
            <div class="expande-horizontal mb-3">
              <v-btn @click="autores_modal=false" rounded small> <v-icon>mdi-arrow-left</v-icon> Voltar</v-btn>
            </div>
            <div class="expande-horizontal wrap">
              <v-flex xs12 md4>
                <img class="mr-6" height="80" src="http://anastrepha.cpafap.embrapa.br/imagens/logotipo_en_pqno.gif" style="border-radius: 9px;"></img>
              </v-flex>
              <v-flex xs12 md8>
                <div class="column wrap expande-horizontal">
                  <v-flex xs12>
                    <h1 style="font-size: 40px; min-width: 600px; width: 100% !important;" class="green--text expande-horizontal">{{ get_base.nome[base_lang] }}</h1>
                  </v-flex>
                  <h3 class="green--text">{{ get_base.subtitulo[base_lang] }}</h3>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex class="mt-6" xs12>
                <div class="fonte expande-horizontal column">
                  <h3 class="mb-2"> {{ base_lang === 'pt' ? 'Autores' : 'Authors' }}:
                   </h3>

                  <div :key="`consult-${index}`" class="mb-2" v-for="(autor, index) in get_base.autores">
                    <h4>{{ autor.nome }}</h4>
                    <span> {{ autor.descricao }} </span>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex class="mt-6" xs12>
                <div class="fonte expande-horizontal column">
                  <h3 class="mb-2"> {{ base_lang === 'pt' ? 'Colaboradores' : 'Collaborators' }}:
                   </h3>

                  <div :key="`consult-${index}`" class="mb-2" v-for="(autor, index) in get_base.colaboradores">
                    <span> {{ autor }} </span>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex class="mt-6" xs12>
                <div class="fonte expande-horizontal column">
                  <h3 class="mb-2"> {{ base_lang === 'pt' ? 'Como citar' : 'How to cite' }}:
                   </h3>

                  <span> {{ get_base.como_citar }} </span>
                </div>
              </v-flex>
            </div>
          </v-flex>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OcorrenciasFiltros from '@/apps/5#Ocorrencia/components/Filtros.vue'
import VisualizacaoEmLista from '@/apps/5#Ocorrencia/components/VisualizacaoEmLista.vue'
import ListagemVazia from '@/apps/5#Ocorrencia/components/ListagemVazia.vue'
import Paginacao from '@/apps/5#Ocorrencia/components/Paginacao.vue'
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";

export default {
  computed: {
    ...mapGetters([
      "get_base",
      "get_bases",
      "get_ocorrencias",
      "get_especies",
      "get_hospedeiros",
      "get_familiahospedeiros",
    ]),
    FilteredOcurrencies() {
      let Ocurrencies = [];
      this.get_ocorrencias.docs.map(ocurrencie => {

        // if (this.filter.especie) {
        //   if (
        //     ocurrencie.especie.nome.toLowerCase().includes()
        //   ) {
        //     Ocurrencies.push(ocurrencie);
        //   }
        // } else if (

        // )

        product.preco_multiplo.map(preco => {
          if (preco.disponivel) {
            if (
              preco.nome.toLowerCase().includes(this.inputSearch.toLowerCase())
            ) {
              this.productSearchList.push(preco);
            } else if (
              product.code &&
              product.code
                .toLowerCase()
                .indexOf(this.inputSearch.toLowerCase()) > -1
            )
              return true;
          }
        });
      });
      return Ocurrencies
    },
    get_states() {
      let states = [];
      this.get_ocorrencias.docs.map(oco => {
        const haveState = states.filter(i => i.estado === oco.estado)
        if (haveState.length === 0) {
          states.push(oco)
        }
      });
      return states;
    },
    get_cities() {
      let cities = [];
      this.get_ocorrencias.docs.map(oco => {
        const haveCity = cities.filter(i => i.municipio === oco.municipio)
        if (haveCity.length === 0) {
          cities.push(oco)
        }
      });
      return cities;
    }
  },
  data() {
        return {
            show: "search",
            autores_modal: false,
            splash: true,
            base_lang: 'pt',
            accessToken: 'pk.eyJ1IjoicHRrbG9ycmFuIiwiYSI6ImNrM2JzbXRqZTBnZjkzbnFlM3VyYTVzazkifQ.kgDrdfqGfd6XTV5DXfeSwg', // your access token. Needed if you using Mapbox maps
            mapStyle:  'mapbox://styles/mapbox/satellite-streets-v12', // your map style
            // mapStyle:  'mapbox://styles/mapbox/light-v10', // your map style
            pesquisa: '',
            options: [],
            mapbox: Mapbox,
            coordinates: [],
            locations: [],
            center: [-50.50, -20],
            zoom: 14,
            filter: {}
        }
    },
  methods: {
    ...mapActions([
      'listar_ocorrencias',
      'listar_hospedeiros',
      'listar_familiahospedeiros',
      'listar_bases',
    ]),
    selectLang(lang) {
      this.base_lang = lang
    },
    goToCord(item) {
      this.center = [item.longitude, item.latitude]
    }
  },
  components: {
    OcorrenciasFiltros,
    VisualizacaoEmLista,
    ListagemVazia,
    Paginacao,
    MglMap, MglMarker, MglPopup
  },
  mounted() {
    setTimeout(() => {
      this.splash = false;
    }, 1000);
  },
  created() {
    this.listar_bases(this.$route.query.b);
    // this.listar_ocorrencias();
    // this.listar_familiahospedeiros();
    // this.listar_hospedeiros();
  }
}
</script>

<style>
.mapboxgl-ctrl-logo {
    display: none !important;
  }
  .mapboxgl-ctrl-bottom-right {
  display: none !important; 
}
.unselectedImg {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
}
</style>