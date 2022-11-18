import { http } from "./config";
class BaseService {
  constructor(url) {
    this.url = url;
  }

  async listar(useCase, payload, page) {
    return http.post(`${this.url}/${page}`, { case: useCase, payload });
  }

  async salvar(useCase, payload) {
    return http.post(`${this.url}`, { case: useCase, payload });
  }

  async atualizar(useCase, payload) {
    return http.post(`${this.url}`, { case: useCase, payload });
  }

  async excluir(useCase, payload) {
    return http.post(`${this.url}`, { case: useCase, payload });
  }
}

export default BaseService;
