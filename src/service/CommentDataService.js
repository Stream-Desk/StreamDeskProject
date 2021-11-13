import http from "/http-ticket";

class CommentService {
  getAll() {
    return http.get("/api/Comments");
  }

  get(id) {
    return http.get(`/api/Comments/commentsByTicketId/${id}`);
  }

  createComment(data) {
    return http.post("/api/Comments", data);
  }

  update(id, data) {
    return http.put(`/api/Comments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/Comments/${id}`);
  }
}

export default new CommentService();
