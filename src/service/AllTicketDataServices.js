import http from "/http-ticket";

class AllTicketsDataService {
  getAll() {
    return http.get("/api/Tickets/Labo/All");
  }

  get(id) {
    return http.get(`/api/Tickets/editlabo/${id}`);
  }

  create(data) {
    return http.post("/api/Tickets", data);
  }

  createComment(data) {
    return http.post("/api/Comments", data);
  }

  update(id, data) {
    return http.put(`/api/Tickets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/Tickets/Labo/${id}`);
  }

  email(data) {
    return http.post(`/api/Mail`, data);
  }

  login(data) {
    return http.post(`/api/Users/authenticate`, data);
  }
  assign(id) {
    return http.post(`/api/Tickets/Assignticket/${id}`);
  }
}

export default new AllTicketsDataService();
