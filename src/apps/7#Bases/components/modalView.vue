<template>
  <v-dialog
    width="700"
    persistent
    transition="slide-x-transition"
    v-model="get_modal_view_base"
  >
    <v-card class="expande-horizontal wrap">
      <div class="expande-horizontal px-1 pr-3 py-3">
        <v-btn dark @click="fecha_modal_view_base" icon>
          <v-icon color="grey">
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <span style="font-size: 17pt; width: 100%;" class="fonte">
          Configure a Base
        </span>
        <div class="expande-horizontal"></div>
        <v-btn class="elevation-3" icon @click="fecha_modal_view_base">
          <v-icon color="red">
            mdi-close
          </v-icon>
        </v-btn>
      </div>

      <div class="expande-horizontal wrap py-6 pt-0 pb-0">
        <div class="expande-horizontal wrap">
          <v-flex xs12 class="px-3">
            <h3 class="fonte font-weight-bold">Escolha a imagem da base:</h3>
          </v-flex>
          <v-flex class="pa-3" xs12>
            <div class="expane-horizontal">
              <img
                v-for="(img, index) in imgs"
                style="width: 100px; border-radius: 3px; cursor: pointer"
                class="mr-6"
                :class="{ selectedImg: img === get_base.img }"
                :key="`image-${index}`"
                @click="setImg(img)"
                :src="img"
                alt=""
              />
            </div>
          </v-flex>
        </div>
        <v-flex class="px-3" xs12>
          <v-text-field
            outlined
            dense
            hint="Este link será parte do link de endereço da base"
            prefix="Link: "
            v-mask="['XXXXXXXXXXXXXXXXXx']"
            background-color="#f2f2f2"
            v-model="get_base.link"
          ></v-text-field>
        </v-flex>
        <v-tabs background-color="#f2f2f2" v-model="tabs">
          <v-tab>Português</v-tab>
          <v-tab>Inglês</v-tab>
        </v-tabs>
        <v-flex class="pa-3" xs12>
          <div v-if="tabs === 0" class="expande-horizontal column">
            <v-form ref="form" class="expande-horizontal wrap">
              <v-flex xs12 md6 class="pr-2">
                <span class="fonte"> Nome da base </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_base.nome.pt"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6 class="pl-2">
                <span class="fonte"> Subtitulo da base </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_base.subtitulo.pt"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="pl-2">
                <span class="fonte"> Descrição da base </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_base.descricao['pt']"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>
            </v-form>
          </div>
          <div v-if="tabs === 1" class="expande-horizontal column">
            <v-form ref="form" class="expande-horizontal wrap">
              <v-flex xs12 md6 class="pr-2">
                <span class="fonte"> Nome da base </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_base.nome.en"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6 class="pl-2">
                <span class="fonte"> Subtitulo da base </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_base.subtitulo.en"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="pl-2">
                <span class="fonte"> Descrição da base </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="get_base.descricao.en"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>
            </v-form>
          </div>
          <div
            style="background: #e0e0e0; border-radius: 4px;"
            class="pa-3 mt-6 expande-horizontal column"
          >
            <h3>Autores</h3>
            <v-list color="transparent" v-if="get_base.autores">
              <v-list-item
                v-for="(autor, index) in get_base.autores"
                :key="`author-item-${index}`"
              >
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    {{ autor.nome }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ autor.descricao }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="removeAuthor(index)">remover</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <div v-else>
              Não há autores cadastrados, cadastre abaixo!
            </div>
            <div>
              <v-flex xs12 class="pr-2">
                <span class="fonte"> Nome do author </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="author.nome"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="pr-2">
                <span class="fonte"> Descrição </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="author.descricao"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>
              <v-btn @click="addAuthor">Adicionar Autor</v-btn>
            </div>
          </div>
          <div
            style="background: #e0e0e0; border-radius: 4px;"
            class="pa-3 mt-6 expande-horizontal column"
          >
            <h3>Colaboradores</h3>
            <v-list color="transparent" v-if="get_base.colaboradores">
              <v-list-item
                v-for="(autor, index) in get_base.colaboradores"
                :key="`author-item-${index}`"
              >
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    {{ autor }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="removeColaborador(index)">remover</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <div v-else>
              Não há colaboradores cadastrados, cadastre abaixo!
            </div>
            <div>
              <v-flex xs12 class="pr-2">
                <span class="fonte"> Nome do colaborador </span>
                <v-text-field
                  solo-inverted
                  dense
                  flat
                  v-model="colaborador"
                  :color="$theme.primary"
                  :rules="[v => !!v || 'Preencha este campo']"
                ></v-text-field>
              </v-flex>
              <v-btn @click="addColaborador">Adicionar Colaborador</v-btn>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 class="px-3">
          <span class="fonte font-weight-bold"> Como citar </span>
          <v-textarea
            solo-inverted
            dense
            flat
            v-model="get_base.como_citar"
            :color="$theme.primary"
            :rules="[v => !!v || 'Preencha este campo']"
          ></v-textarea>
        </v-flex>
      </div>

      <div class="expande-horizontal">
        <v-btn large dark @click="valida_form" tile block color="green">
          <span class="fonte"> Salvar </span>
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      tabs: 0,
      author: {},
      colaborador: "",
      imgs: [
        "img/img_anastrepha_base.jpg",
        "img/img_parasitoide.jpg",
        "img/img_lonchaeidae.jpg"
      ]
    };
  },
  computed: {
    ...mapGetters(["get_base", "get_modal_view_base", "getLoggedUser"])
  },
  methods: {
    ...mapActions(["criar_base", "atualizar_base", "fecha_modal_view_base"]),
    valida_form() {
      if (this.$refs.form.validate()) {
        this.get_base._id ? this.atualizar_base() : this.criar_base();
      }
    },
    addAuthor() {
      if (!this.get_base.autores) {
        this.get_base.autores = [];
      }
      this.get_base.autores.push(this.author);
      this.author = {};
    },
    addColaborador() {
      if (!this.get_base.colaboradores) {
        this.get_base.colaboradores = [];
      }
      this.get_base.colaboradores.push(this.colaborador);
      this.colaborador = "";
    },
    removeAuthor(index) {
      this.get_base.autores.splice(index, 1);
      this.$forceUpdate();
    },
    removeColaborador(index) {
      this.get_base.colaboradores.splice(index, 1);
      this.$forceUpdate();
    },
    setImg(img) {
      this.get_base.img = img;
      this.$forceUpdate();
    }
  }
};
</script>

<style>
.selectedImg {
  border: 5px solid #00ffdd;
}
.unselectedImg {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
}
</style>
