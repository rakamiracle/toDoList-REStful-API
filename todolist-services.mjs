export class TodoListService {
    todolist = ["Tech", "Miracle"];
  
    getJsonTodoList() {
      return {
        code: 200,
        status: "OKE",
        data: this.todolist.map((value, index) => {
          return {
            id: index,
            todo: value,
          };
        }),
      };
    }
  
    getTodoList(request, response) {
      response.write(JSON.stringify(this.getJsonTodoList()));
      response.end();
    }
  
    createTodo(request, response) {
      let body = "";
  
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
  
      request.on("end", () => {
        try {
          const parsedData = JSON.parse(body);
          this.todolist.push(parsedData.todo);
  
          response.write(JSON.stringify(this.getJsonTodoList()));
          response.end();
        } catch (error) {
          response.statusCode = 400;
          response.end(JSON.stringify({ message: "Invalid JSON format" }));
        }
      });
    }
  
    updateTodo(request, response) {
      let body = "";
  
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
  
      request.on("end", () => {
        try {
          const parsedData = JSON.parse(body);
          const { id, todo } = parsedData;
  
          // Validasi ID dan data todo
          if (id >= 0 && id < this.todolist.length && todo) {
            this.todolist[id] = todo;
            response.write(JSON.stringify({ message: "Todo updated", id, todo }));
          } else {
            response.statusCode = 400;
            response.write(JSON.stringify({ message: "Invalid ID or todo" }));
          }
  
          response.end();
        } catch (error) {
          response.statusCode = 400;
          response.end(JSON.stringify({ message: "Invalid JSON format" }));
        }
      });
    }
    deleteTodo(request, response) {
      request.addListener("data", (data) => {
        const body = JSON.parse(data.toString());
        if (this.todolist[body.id]) {
          this.todolist.splice(body.id, 1);
        }
  
        response.write(this.getJsonTodoList());
        response.end();
      });
    }
  }
  