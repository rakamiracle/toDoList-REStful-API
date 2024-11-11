import http from "http";
import { TodoListService } from "./todolist-services.mjs";

const service = new TodoListService();
const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.method === "GET") {
    service.getTodoList(request, response);
  } else if (request.method === "POST") {
    service.createTodo(request, response);
  } else if (request.method === "PUT") {
    service.updateTodo(request, response);
  } else if (request.method === "DELETE") {
    service.deleteTodo(request, response);
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
