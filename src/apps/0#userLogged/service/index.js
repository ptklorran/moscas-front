import { http } from "@/apps/shared/baseService/config";

class Service {
  listBalanceToken() {
    return http.post('/user/user/list-balance-token')
  }
  listBalanceUnilevel() {
    return http.post('/user/user/list-balance-unilevel')
  }
  listBalanceInvestment() {
    return http.post('/user/user/list-balance')
  }
}

export default new Service();
