const input = document.querySelector("[data-priorities-input]");
const botao = document.querySelector("[data-priorities-button]");

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

const todoList = new TodoList("[data-list]");

botao.addEventListener("click", (event) => {
  event.preventDefault();
  todoList.add(input.value);
});

// SEGUNDA PARTE DO CODIGO - POMODORO

const headerPomodoro = document.querySelector("[data-header-pomodoro]");
const now = new Date();

const weekDayName = [
  "Domingo",
  "Segunda feira",
  "Terça feira",
  "Quarta feira",
  "Quinta feira",
  "Sexta feira",
  "Sábado",
];

const localDate = now.toLocaleDateString();

headerPomodoro.innerHTML += `<p class="text-primary__red text-3xl font-serif h-full flex align-middle items-center leading-normal">${
  weekDayName[now.getDay()]
}, <br>${localDate}</p>`;

//  TIMER

class Timer {
  constructor(selectors) {
    this.timer = document.querySelector(selectors.timer);
    this.pomodoroElement = document.querySelector(selectors.pomodoro);
    this.shortBreakElement = document.querySelector(selectors.shortBreak);
    this.longBreakElement = document.querySelector(selectors.longBreak);
    this.segundos = 0;
    this.minutos = 25;
    this.runTimer = console.log("Timer initialized");
    this.selected = "pomodoro";
  }

  selectButton(type) {
    const active = "bg-primary__red";
    const disabled = "bg-secondary__red";

    this.shortBreakElement.classList.replace(active, disabled);
    this.pomodoroElement.classList.replace(active, disabled);
    this.longBreakElement.classList.replace(active, disabled);

    switch (type) {
      case "pomodoro":
        this.pomodoroElement.classList.replace(disabled, active);
        break;
      case "shortBreak":
        this.shortBreakElement.classList.replace(disabled, active);
        break;
      case "longBreak":
        this.longBreakElement.classList.replace(disabled, active);
        break;
    }
  }

  start() {
    this.runTimer = setInterval(() => {
      if (this.segundos === 0) {
        this.segundos = 59;
        this.minutos--;
      } else {
        this.segundos--;
      }

      this.render();
    }, 1000);
  }

  render() {
    this.timer.innerHTML = `${
      this.minutos < 10 ? "0" + this.minutos : this.minutos
    }:${this.segundos < 10 ? "0" + this.segundos : this.segundos}`;
  }

  stop() {
    clearInterval(this.runTimer);
  }

  clear() {
    this.stop();
    this.minutos = 25;
    this.segundos = 0;

    this.render();
  }

  pomodoro() {
    this.stop();
    this.minutos = 25;
    this.segundos = 0;

    this.selectButton("pomodoro");
    this.render();
  }

  shortBreak() {
    this.stop();
    this.minutos = 5;
    this.segundos = 0;

    this.selectButton("shortBreak");
    this.render();
  }
  longBreak() {
    this.stop();
    this.minutos = 15;
    this.segundos = 0;

    this.selectButton("longBreak");
    this.render();
  }
}

const selectors = {
  timer: "[data-timer-pomodoro]",
  pomodoro: "[data-pomodoro]",
  shortBreak: "[data-short-break]",
  longBreak: "[data-long-break]",
};
const timer = new Timer(selectors);
