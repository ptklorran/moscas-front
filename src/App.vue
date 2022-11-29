<template>
  <v-app dark id="app" :style="`background: ${$theme.background}`">
    <router-view />
    <ModalConfirmAction />
    <ModalLoading />
    <ModalGlobalMessage />
  </v-app>
</template>

<script>
import ModalConfirmAction from "@/apps/shared/components/ModalConfirmAction";
import ModalLoading from "@/apps/shared/components/ModalLoading";
import ModalGlobalMessage from "@/apps/shared/components/ModalGlobalMessage";

export default {
  components: {
    ModalConfirmAction,
    ModalLoading,
    ModalGlobalMessage,
  },
  created() {
    console.log("router", this.$router);
    console.log("route", this.$route);
    console.log("doc loca", document.location);
  }
};
</script>

<style>
.fonteMini {
  font-size: 8pt;
  color: #cccccc;
}
.click {
  cursor: pointer;
}
.item-table {
  border-radius: 6px;
  border: 1px solid #e2e2e2;
}
.bg-table {
  background: #f2f2f2;
}
.column {
  flex-direction: column;
}
.bg_white {
  background: #fff;
}
.expande-horizontal {
  display: flex;
  width: 100%;
}
.inflar {
  display: flex;
  width: 100%;
  min-height: 100vh;
}
.inflar-porcentagem {
  display: flex;
  height: 100%;
}
.centraliza {
  justify-content: center;
  align-items: center;
}
.wrap {
  flex-wrap: wrap;
}
.linha {
  flex-direction: row;
}
.fonte {
  font-family: 'Noto Sans HK', sans-serif;
  font-weight: 300;

}

.menuAtivoHome {
  background: linear-gradient(to right, #11998e, #38ef7d);
  border-radius: 1px;
  box-shadow: 0 2px 4px 1px rgba(87, 245, 19, 0.1);
}
.bg-card-dash {
  background: linear-gradient(#001A0D, #59B288);
}
.item {
  height: 40px;
}
.vertical-60 {
        height: 60vh;
}
.coluna {
    flex-direction: column;
}
</style>
