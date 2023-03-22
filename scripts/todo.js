"use strict";

const todoContainer = document.getElementById("todo-container");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const taskInput = document.getElementById("input-task");

const todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
let userArr = JSON.parse(localStorage.getItem("userArr"));
let userIndex = JSON.parse(localStorage.getItem("userIndex"));
let isLogin = JSON.parse(localStorage.getItem("isLogin"));

if (currentUser.length > 0)
  renderTodoList(
    todoArr.filter((todo) => todo.owner == currentUser[userIndex].username)
  );

addBtn.addEventListener("click", addTodo);

function addTodo(e) {
  e.preventDefault();
  const todoItem = {
    task: taskInput.value,
    owner: currentUser[userIndex].username,
    isDone: false,
  };
  if (currentUser.length == 0) alert("Please login to use this function");
  else if (todoArr.findIndex((item) => item.task === todoItem.task) > 0)
    alert("This task is already added");
  else if (todoItem.task.trim().length == 0) alert("You must fill in a task");
  else {
    todoArr.push(todoItem);
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    const currentTodo = todoArr.filter(
      (todo) => todo.owner == currentUser[userIndex].username
    );
    renderTodoList(currentTodo);
  }
}

function renderTodoList(data) {
  todoList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `
    ${data[i].task}<span class="close">\u00D7</span>
    `;
    if (data[i].isDone) {
      li.classList.add("checked");
    } else li.classList.remove("checked");
    todoList.appendChild(li);
    taskInput.value = "";
  }
}

todoList.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
      const li = event.target.closest("li");
      const nodes = Array.from(li.closest("ul").children);
      const index = nodes.indexOf(li);
      todoArr[index].isDone = !todoArr[index].isDone;
      localStorage.setItem("todoArr", JSON.stringify(todoArr));
    }
  },
  false
);

//d. Delete Task
todoList.addEventListener("click", function (event) {
  if (
    event.target.tagName === "SPAN" &&
    confirm("Do you really want to delete this task?") === true
  ) {
    let li = event.target.parentElement;
    li.style.display = "none";
    const span = event.target.closest("li");
    const nodes = Array.from(span.closest("ul").children);
    const index = nodes.indexOf(span);
    todoArr.splice(index, 1);
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    window.location.reload(true);
  }
});
