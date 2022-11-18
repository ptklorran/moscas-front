import { http } from "@/apps/shared/baseService/config";

class Service {
  auth(payload) {
    return http.post(`/signin`, payload);
  }
  
  signup(payload) {
    return http.post(`/signup`, payload);
  }

  forgotPassword(email) {
    return http.post(`/forgot-password`, email);
  }
  
  forgotPasswordFire(payload) {
    return http.post(`/forgot-password/${payload.token}`, payload);
  }
  
  activateAccount(id) {
    return http.post(`/activate-account/${id}`);
  }

}

export default new Service();
