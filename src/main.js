import Vue from "vue";
import store from "@/store";
import App from "./App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
import mask from "vue-the-mask";
import moment from "moment";
import "moment/locale/pt-br";
import "@/apps/shared";
import VueHtml2pdf from "vue-html2pdf";
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";
import { db, storage } from "./apps/shared/firebase";

Vue.use(mask);
Vue.use(VueHtml2pdf);
Vue.use(VueMapbox, { mapboxgl: Mapbox });

Vue.config.productionTip = false;

const theme = {
  name: "light",
  primary: "#4CAF50",
  icon_color: "#4CAF50",
  background: "#fff",
  background_content_color: "",
  background_drawer_color: "",
  appbar_color: "",
  gradient_menu_choise: "",
  logo: "img/logo_anastrepha.gif",
  logo_branca: "",
  // logo: 'https://firebase|storage.googleapis.com/v0/b/cosmos-home-site.appspot.com/o/5.png?alt=media&token=2a907ebf-0020-459e-8469-c3fddf254e8d',
  token_img: ""
};

Vue.prototype.$theme = theme;
Vue.prototype.$db = db;
Vue.prototype.$storage = storage;
Vue.prototype.$moment = moment;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
