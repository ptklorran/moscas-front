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
      <v-flex v-if="show === 'select_base'" xs12>
        <div class="pa-3 expande-horizontal centraliza wrap">
          <v-flex class="pa-2" :key="base._id" v-for="base in get_bases.docs" xs12 md3>
            <v-card @click="selectBase(base)" class="fonte">
              <v-img contain style="border-radius: 3px;" height="200" :src="base.img"></v-img>
              <v-divider></v-divider>
              <v-list class="pa-0">
                <v-list-item class="pa-2 ma-0">
                  <v-list-item-content>
                    <v-list-item-title v-if="base.nome"> {{ base.nome.en }} </v-list-item-title>
                    <v-list-item-subtitle v-if="base.subtitulo">
                      {{ base.subtitulo.en }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="green--text" style="font-size: 9pt; font-weight: 500;">
                      Atualizado {{ $moment(base.updated_at).format('llll') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </div>
      </v-flex>
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
                    item-value="nome"
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
                    <v-flex xs6 class="pl-0">
                      <div class="expande-horizontal centraliza px-5">
                        <v-btn @click="show='view'" dark class="fonte font-weight-bold" color="green" small outlined> {{ base_lang === 'pt' ? 'Ver resultados' : 'See results' }} <v-icon size="18" class="mt-1 ml-2">mdi-magnify</v-icon> </v-btn>
                        <v-btn text @click="clearFilters" dark class="fonte font-weight-bold ml-1" color="green" small outlined> {{ base_lang === 'pt' ? 'Limpar filtros' : 'Clear filters' }} </v-btn>
                      </div>
                    </v-flex>
                  </div>
                  <div class="expande-horizontal centraliza">
                    {{ FilteredOcurrencies.length }} {{ base_lang === 'pt' ? 'registros encontrados' : 'records found' }}
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 md6>
                <div class="expande-horizontal column">
                  <v-img contain  style="height: 380px; border-radius: 6px;" :src="get_base.img" alt=""> </v-img>
                  <span> {{ base_lang === 'pt' ? 'Atualizado' : 'Updated at' }} {{ $moment(get_base.updated_at).format('L') }} </span>
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
          <v-btn icon class="mx-1" @click="zoom--" small>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn class="mr-1" text small>
            {{ zoom }}
          </v-btn>
          <v-btn icon class="" @click="zoom++" small>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div style="display: flex; height: 50vh">
          <MglMap :interactive="true" :zoom="zoom" :showZoom="true" :center="center" style="background-color: #555" :accessToken="accessToken" :mapStyle.sync="mapStyle">
              <div v-for="item in FilteredOcurrencies" :key="item._id">
                  <MglMarker :coordinates="[(converteCord(item.longitude) || 0), converteCord(item.latitude || 0)]" color="#F9A825">
                      <MglPopup showed :coordinates="[converteCord(item.longitude || 0), converteCord(item.latitude || 0)]" anchor="top">
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
          <VisualizacaoEmLista :FilteredOcurrencies="FilteredOcurrencies" :ext="true" :goToCord="goToCord" :hideDelete="true" v-show="get_ocorrencias.docs.length > 0" />
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
      Ocurrencies = this.get_ocorrencias.docs.filter(ocurrencie => {
        if (
          !this.filter.especie &&
          !this.filter.familiahospedeiro &&
          !this.filter.nomecientifico &&
          !this.filter.estado &&
          !this.filter.municipio
        ) {
          return true;
        }
        if (this.filter.especie && ocurrencie.especie && ocurrencie.especie.nome.toLowerCase().indexOf(this.filter.especie.toLowerCase()) > -1) return true;
        if (this.filter.familiahospedeiro && ocurrencie.familiahospedeiro && ocurrencie.familiahospedeiro.nome.indexOf(this.filter.familiahospedeiro.toLowerCase()) > -1) return true;
        if (this.filter.nomecientifico && ocurrencie.hospedeiro && ocurrencie.hospedeiro.nome.toLowerCase().indexOf(this.filter.hospedeiro.toLowerCase()) > -1) return true;
        if (this.filter.estado && ocurrencie.estado && ocurrencie.estado.toLowerCase().indexOf(this.filter.estado.toLowerCase()) > -1) return true;
        if (this.filter.municipio && ocurrencie.municipio && ocurrencie.municipio.toLowerCase().indexOf(this.filter.municipio.toLowerCase()) > -1) return true;
        return false;
      })
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
            mapStyle:  'mapbox://styles/mapbox/light-v10',
            mapbox: Mapbox,
            coordinates: [],
            locations: [],
            zoom: 6,
            center: [-51.153764, 0.004270],
            options: [],
            // mapStyle:  'mapbox://styles/mapbox/satellite-streets-v12', // your map style
            pesquisa: '',
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
    clearFilters() {
      this.filter = {};
    },
    goToCord(item) {
      this.center = [this.converteCord(item.longitude), this.converteCord(item.latitude)]
    },
    converteCord(item) {
      const directionTypes = {
        'N': true,
        'S': false,
        'W': false,
      }
      const degresIsPositive = directionTypes[item.direcao]
      const degres = parseInt(item.grau)
      const minutes = parseFloat(item.minuto) / 60
      const seconds = parseFloat(item.segundo) / 3600
      const sum = degres+minutes+seconds
      return parseFloat(`${degresIsPositive ? '' : '-' }${sum}`)
    },
    selectBase(base) {
      localStorage.base = base._id;
      localStorage.base_body = JSON.stringify(base);
      this.$store.commit("set_base", base);
      this.show = "search"
      this.$router.push(`/?b=${base.link.toLowerCase()}`)
      this.listar_bases(base.link.toLowerCase())
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
    const sub = document.location.hostname.split('.')
    if(sub.length === 4) {
      this.listar_bases(sub[0]);
    } else {
      this.listar_bases(false);
      this.show = "select_base"
    }
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