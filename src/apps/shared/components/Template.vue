<template>
  <v-container
    style="flex-direction: column; background: #f5f5f5 "
    fluid
    class="molde pa-0 ma-0"
  >
    <v-layout column>
      <v-app-bar
        app
        color="#fff"
        dense
        :fixed="$vuetify.breakpoint.smAndDown"
        class="elevation-0"
        :style="
          $vuetify.breakpoint.smAndDown
            ? 'margin-bottom: 0px; border-radius: 0px'
            : 'border-radius: 0px;margin-bottom: 0px'
        "
        style="justify-content: center; align-items: center;"
      >
        <!-- <img height="40" src="../assets/logo.png" alt=""> -->

        <v-btn @click="drawer = !drawer" icon>
          <v-icon color="grey darken-3">mdi-menu</v-icon>
        </v-btn>

        <v-btn v-if="this.icon !== undefined" @click="goBack()" icon>
          <v-avatar class="elevation-0">
            <v-icon color="grey darken-3"> arrow_back </v-icon>
          </v-avatar>
        </v-btn>

        <!-- <span class="fonte ml-2" :style="`color: ${$theme.primary}`">{{
          title
        }}</span> -->
        <!-- <span class="fonte ml-2 white--text"> Bem Vindo(a) </span> -->

        <!-- <v-spacer></v-spacer> -->

        <!-- <v-flex class="px-2" md3>
            <v-text-field hide-details solo-inverted dark flat dense v-model="pesquisa" placeholder="Faça uma busca" :color="$theme.primary" append-icon="mdi-magnify"></v-text-field>
        </v-flex> -->

        <v-spacer></v-spacer>

        <!-- <v-menu bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon :color="$theme.icon_color">mdi-bell-outline</v-icon>
            </v-btn>
          </template>

          <v-list width="300">
            <v-list-item
              v-for="notification in getNotifications.received"
              :key="notification._id"
              @click="() => item.action()"
            >
              <v-list-item-avatar>
                <v-icon>mdi-bell-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="fonte">{{
                  notification.titlev-
                }}</v-list-item-title>
                <v-list-item-subtitle class="fonte">{{
                  notification.message
                }}</v-list-item-subtitle>
                <v-list-item-subtitle
                  class="orange--text fonte"
                  style="font-size: 9pt;"
                  >{{
                    $moment(notification.created_at).format("llll")
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu> -->

        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              :icon="$vuetify.breakpoint.smAndDown"
              :color="$theme.icon_color"
              v-on="on"
              rounded
              text
            >
              <v-icon :color="$theme.icon_color"
                >mdi-account-circle-outline</v-icon
              >
              <span
                v-if="$vuetify.breakpoint.smAndUp"
                class="fonte text-capitalize black--text mr-1 ml-1"
                >{{ pegarPrimeiroUltimoNome(getLoggedUser.nome) }}</span
              >
              <v-icon
                v-if="$vuetify.breakpoint.smAndUp"
                size="18"
                :color="$theme.icon_color"
                >mdi-chevron-down</v-icon
              >
            </v-btn>
          </template>

          <v-list nav dense>
            <v-list-item to="/logged-user">
              <v-list-item-title class="fonte">{{
                getLoggedUser.nome
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title class="fonte">Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu v-if="$vuetify.breakpoint.smAndDown" left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon :color="$theme.icon_color">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="item in options"
              :key="item.nome"
              @click="() => item.action()"
            >
              <v-list-item-title>{{ item.nome }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
        color="#f2f2f2"
        width="280"
        class="elevation-2"
        app
        v-model="drawer"
      >
        <v-card
          dark
          color="#fff"
          height="130"
          class="elevation-0 centraliza expande-horizontal"
          style="border-radius: 0px; margin-bottom: 0px;"
        >
          <img height="120" class="mr-3 ml-3" :src="$theme.logo" alt="" />
        </v-card>

        <div class="expande-horizontal pa-2 pb-0">
          <v-select
            outlined
            dense
            hide-details
            color="green"
            v-model="base"
            item-text="link"
            item-value="_id"
            @change="selectBase($event, true)"
            label="Selecione a base"
            :items="get_bases.docs"
          ></v-select>
        </div>

        <v-list nav dense>
          <template v-for="menu in menus">
            <div class="expande-horizontal" :key="menu.title">
              <v-list-item
                v-show="!menu.group"
                class=""
                active-class="menuAtivoHome"
                :to="menu.route"
              >
                <v-icon
                  class="mr-3"
                  :color="
                    $route.path === menu.route ? 'white' : $theme.icon_color
                  "
                >
                  {{ menu.icon }}
                </v-icon>
                <v-list-item-content>
                  <v-list-item-title
                    :class="
                      $route.path === menu.route ? 'white--text' : 'grey--text'
                    "
                    class="fonte"
                  >
                    {{ menu.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-group
                style="width: 100%;"
                v-show="menu.group"
                :color="$theme.primary"
              >
                <template v-slot:activator>
                  <v-list-item class="ml-0 pl-0">
                    <v-icon class="mr-2 pb-0" :color="$theme.primary">
                      {{ menu.icon }}
                    </v-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span class="fonte pt-2 black--text">
                          {{ menu.title }}
                        </span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <v-list-item
                  v-for="subitem in menu.subitens"
                  :key="subitem.route"
                  class="pl-3"
                  active-class="menuAtivoHome"
                  :to="subitem.route"
                >
                  <v-avatar>
                    <v-icon
                      :color="
                        $route.path === subitem.route
                          ? 'white'
                          : $theme.icon_color
                      "
                    >
                      mdi-chevron-right
                    </v-icon>
                  </v-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      :class="
                        $route.path === subitem.route
                          ? 'white--text'
                          : 'grey--text'
                      "
                      class="fonte"
                    >
                      {{ subitem.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </div>
          </template>
        </v-list>
        <div style="position: absolute; bottom: 0px">
          <v-list dense nav>
            <template v-for="(item, i) in getLoggedUser.empresas">
              <v-list-item :key="item._id">
                <v-icon class="mr-3" color="orange">mdi-crown</v-icon>
                <v-list-item-content>
                  <v-list-item-title class="orange--text">
                    {{ item.nome }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="grey--text">
                    Vence {{ getRemainPlanTime(item) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </div>
      </v-navigation-drawer>

      <v-main class="molde">
        <div
          v-if="$vuetify.breakpoint.smAndUp"
          class="expande-horizontal px-2 py-3"
          :style="`background: ${$theme.background}`"
        >
          <v-btn class="mr-4" @click="$router.go(-1)" icon>
            <v-icon color="grey">
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <span
            :style="`font-size: 16pt; color: #444`"
            class="fonte font-weight-bold text-capitalize"
          >
            {{ title }}
          </span>
          <v-spacer></v-spacer>
          <v-btn
            v-for="(item, i) in options"
            small
            :text="i !== 0"
            color="grey darken-4"
            class="elevation-0 animated flipInX delay-1s mr-1"
            @click="item.action()"
            :key="item.nome"
          >
            <span
              :class="i !== 0 ? 'black--text' : 'white--text'"
              class="fonte"
              >{{ item.nome }}</span
            >
            <v-icon class="ml-1" size="18" :color="i !== 0 ? '#333' : 'white'">
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </div>
        <slot></slot>
      </v-main>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["title", "options", "icon", "action", "origem"],
  data() {
    return {
      drawer: true,
      base: "",
      menus: [
        // {
        //   title: "Dashboard",
        //   icon: "mdi-check",
        //   route: "/dashboard",
        //   group: false
        // },
        {
          title: "Registro de Ocorrência",
          icon: "mdi-bug-check-outline",
          route: "/ocorrencias",
          group: false
        },
        // {
        //   title: "Gêneros",
        //   icon: "mdi-bug",
        //   route: "/generos",
        //   group: false
        // },
        {
          title: "Espécies",
          icon: "mdi-ladybug",
          route: "/especies",
          group: false
        },
        {
          title: "Famílias - Hospedeiros",
          icon: "mdi-family-tree",
          route: "/familiahospedeiros",
          group: false
        },
        {
          title: "Espécies - Hospedeiros",
          icon: "mdi-forest",
          route: "/especie-hospedeiro",
          group: false
        },
        // {
        //   title: "Hospedeiros",
        //   icon: "mdi-fruit-pear",
        //   route: "/hospedeiros",
        //   group: false
        // },
        {
          title: "Bases",
          icon: "mdi-shield-bug-outline",
          route: "/bases",
          group: false
        },
        {
          title: "Acessos",
          icon: "mdi-lock-outline",
          route: "/funcionarios",
          group: false
        }
        // {
        //   title: "Referências Bibliográficas",
        //   icon: "mdi-library",
        //   route: "/referenciasbibliograficas",
        //   group: false
        // },

        // {
        //   title: 'Suporte',
        //   icon: 'mdi-whatsapp',
        //   route: '/foruns',
        //   group: false
        // },
      ],
      getNotifications: {
        received: []
      }
    };
  },
  computed: {
    ...mapGetters([
      "getLoggedUser",
      "get_bases"
      // 'getNotifications'
    ])
  },
  methods: {
    ...mapActions([
      // 'listNotifications',
      "logout",
      "listar_bases",
    ]),
    getRemainPlanTime(enterprise) {
      let text = this.$moment(enterprise.data_expiracao_plano).fromNow();
      return text;
    },
    listNotifications() {},
    pegarPrimeiroUltimoNome(nome) {
      let n = nome.split(" ");
      let ultimo_nome = "";

      let primeiro_nome = n[0];

      if (n.length > 1) {
        ultimo_nome = n[n.length - 1];
      }

      return primeiro_nome + " " + ultimo_nome;
    },
    goBack() {
      if (this.action !== undefined) {
        this.action();
      } else {
        this.$router.go(-1);
      }
    },
    selectBase(base, reload) {
      localStorage.base = base;
      this.base = base;
      if (reload) {
        location.reload();
      }
    }
  },
  created() {
    this.drawer = this.$vuetify.breakpoint.smAndUp;
    this.listNotifications();
    this.listar_bases();
    this.selectBase(localStorage.base);
  }
};
</script>

<style>
.centraliza-tudo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.molde {
  display: flex;
  width: 100%;
  background: #e5e5e5;
}
</style>
