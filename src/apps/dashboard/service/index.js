import BaseService from "@/apps/shared/baseService";

class Service extends BaseService {
  constructor() {
    super("/dashboard");
  }
}

export default new Service();
