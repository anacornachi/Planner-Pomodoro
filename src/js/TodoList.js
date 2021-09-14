export class TodoList {
  constructor(selector) {
    this.todoList = document.querySelector(selector);
  }

  add(task) {
    this.todoList.innerHTML += `<li class="bg-white bg-opacity-30 h-24 flex justify-between rounded transform hover:scale-105 hover:shadow-sm w-full p-4">
    <h4 class="font-serif text-sm flex items-center align-middle w-4/5">${task}</h4>
    <div class="flex flex-col h-full items-center justify-center gap-3 w-1/5"><button class="text-green-700 rounded-full border border-green-700 hover:bg-green-700 hover:text-white h-10 w-10" title="Concluir tarefa">V</button><button data-delete-task class="text-primary__red rounded-full border border-red-700 hover:bg-red-700 hover:text-white h-10 w-10" title="Excluir tarefa">X</button></div></li>`;
    input.value = "";
  }
  delete() {}
}
