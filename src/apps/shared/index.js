import Vue from "vue";
import Template from "./components/Template";
import SendArchive from "./components/ModalSendArchive";
import SendArchiveFile from "./components/ModalSendArchiveFile";
import Empty from "./components/Empty";

Vue.component("layout", Template);
Vue.component("Empty", Empty);
Vue.component("SendArchive", SendArchive);
Vue.component("SendArchiveFile", SendArchiveFile);
