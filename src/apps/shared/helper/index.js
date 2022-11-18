import store from "@/store";

export default new (class Helper {
  error(e) {
    console.log("tessasdasd", e.response);
    if (e.response.data.refresh_token) {
      sessionStorage.token = JSON.stringify(e.response.data.refresh_token);
      console.log("token alterado");
      location.reload();
    }
  }
})();
