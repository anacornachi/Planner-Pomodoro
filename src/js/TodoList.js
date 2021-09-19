class TodoList {
  constructor(selector) {
    this.todoList = document.querySelector(selector);
    this.arrayTodos;

    this.getTodos();
    this.renderTodos();
  }

  getTodos() {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos === null) {
      localStorage.setItem("todos", "[]");
      this.arrayTodos = [];
      return;
    }

    this.arrayTodos = todos;
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.arrayTodos));
  }

  add(task) {
    this.arrayTodos.push({ task, done: false });
    input.value = "";
    this.renderTodos();
    this.save();
  }
  conclude(index) {
    this.arrayTodos = this.arrayTodos.map((item, indice) => {
      if (indice === index) {
        item.done = true;
      }

      return item;
    });
    this.renderTodos();
    this.save();
  }
  delete(index) {
    // Método 1 - Array Filter
    // this.arrayTodos = this.arrayTodos.filter(
    //   (item, indice) => indice !== index
    // );

    // Método 2 - Array Splice
    this.arrayTodos.splice(index, 1);

    this.renderTodos();
    this.save();
  }
  renderTodos() {
    // ${todo.done ? 'bg-green' : 'bg-white'} - Isto é um operador ternário
    this.todoList.innerHTML = this.arrayTodos
      .map(
        (todo, index) => `<li class="${
          todo.done
            ? "bg-green-400 bg-opacity-100 text-white"
            : "bg-white bg-opacity-30"
        } h-24 flex justify-between rounded transform  hover:shadow-xl w-full p-4">
          <h4 class="font-serif text-sm flex items-center align-middle w-4/5">${
            todo.task
          }</h4>
          <div class="flex flex-col h-full items-center justify-center gap-3 w-1/5">
          <button onclick="todoList.conclude(${index})" class="${
          todo.done ? "bg-green-700 text-white hidden" : "text-green-700"
        } rounded-full border border-green-700 hover:bg-green-700 hover:text-white h-10 w-10" title="Concluir tarefa">V</button>
          <button id="delete-task" onclick="todoList.delete(${index})" class="${
          todo.done
            ? "text-white border-white"
            : "text-primary__red border-red-700"
        } rounded-full border hover:bg-red-700
         hover:text-white h-10 w-10" title="Excluir tarefa">X</button></div></li>`
      )
      .join(" ");
  }
}
