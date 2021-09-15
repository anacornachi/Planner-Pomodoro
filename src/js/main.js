const input = document.querySelector("[data-priorities-input]");
const botao = document.querySelector("[data-priorities-button]");

class TodoList {
  constructor(selector) {
    this.todoList = document.querySelector(selector);
    this.arrayTodos = [];
  }

  add(task) {
    this.arrayTodos.push({ task, done: false });
    input.value = "";
    this.renderTodos();
  }
  conclude(index) {
    this.arrayTodos = this.arrayTodos.map((item, indice) => {
      if (indice === index) {
        item.done = true;
      }

      return item;
    });
    this.renderTodos();
  }
  delete(index) {
    // Método 1 - Array Filter
    // this.arrayTodos = this.arrayTodos.filter(
    //   (item, indice) => indice !== index
    // );

    // Método 2 - Array Splice
    this.arrayTodos.splice(index, 1);

    this.renderTodos();
  }
  renderTodos() {
    console.log({ todos: this.arrayTodos });
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

const teste = document.querySelector("[data-timer-pomodoro]");

let segundos = 0;
let minutos = 0;
var myVar = setInterval(myTimer, 1000);

function startTimer() {}

function myTimer() {
  if (segundos === 59) {
    segundos = 0;
    minutos++;
  } else {
    segundos++;
    console.log(segundos);
  }
  teste.innerHTML = `${minutos < 10 ? "0" + minutos : minutos}:${
    segundos < 10 ? "0" + segundos : segundos
  }`;
}

function myStopFunction() {
  clearInterval(myVar);
}

class Timer {
  // constructor(DEVE RECEBER O TIPO DE BOTAO DE QUE FOI CLICADO)
}

const timer = new Timer(document.querySelector("[data-timer-pomodoro]"));
