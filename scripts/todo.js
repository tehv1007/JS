"use strict";

const taskInput = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const list = document.getElementById("todo-list");

let userArr = JSON.parse(localStorage.getItem("userArr"));
let userIndex = JSON.parse(localStorage.getItem("userIndex"));
let loginUser = JSON.parse(localStorage.getItem("loginUser"));
let isLogin = JSON.parse(localStorage.getItem("isLogin"));

//b. Hiển thị các Task
window.onload = loadTasks;
function loadTasks() {
  // Kiểm tra localStorage có task nào không
  if (localStorage.getItem("tasks") === null) {
    list.innerHTML = "";
    return;
  }
  list.innerHTML = "";

  //render tasks
  let todoArr = Array.from(JSON.parse(localStorage.getItem("tasks")));
  todoArr.forEach((task) => {
    if (task.owner === loginUser[userIndex].username) {
      const li = document.createElement("li");
      const t = document.createTextNode(task.task);
      li.appendChild(t);
      list.appendChild(li);
      task.value = "";

      const span = document.createElement("span");
      const txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      if (task.isDone) {
        li.classList.add("checked");
      } else li.classList.remove("checked");
    }
  });
}

// Tạo mới task item
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  // Validate input
  if (isLogin === false) {
    alert("Please login to use this function!");
  } else if (taskInput.value === "") {
    alert("Please add some task!");
    return false;
  }

  //a. add task to local storage
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      {
        task: taskInput.value,
        owner: loginUser[userIndex].username,
        isDone: false,
      },
    ])
  );

  // create list item
  const li = document.createElement("li");
  const t = document.createTextNode(taskInput.value);
  li.appendChild(t);
  list.appendChild(li);
  taskInput.value = ""; // clear input

  const span = document.createElement("span");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
});

// c. Toggle Task
list.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      let todoArr = Array.from(JSON.parse(localStorage.getItem("tasks")));
      event.target.classList.toggle("checked");
      const li = event.target.closest("li");
      const nodes = Array.from(li.closest("ul").children);
      const index = nodes.indexOf(li);
      todoArr[index].isDone = !todoArr[index].isDone;
      localStorage.setItem("tasks", JSON.stringify(todoArr));
    }
  },
  false
);

//d. Delete Task
list.addEventListener("click", function (event) {
  if (event.target.tagName === "SPAN") {
    let todoArr = Array.from(JSON.parse(localStorage.getItem("tasks")));
    let div = event.target.parentElement;
    div.style.display = "none";
    const span = event.target.closest("li");
    const nodes = Array.from(span.closest("ul").children);
    const index = nodes.indexOf(span);
    todoArr.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(todoArr));
  }
});

// const task = {
//   task: taskInput.value,
//   owner: loginUser[userIndex].username,
//   isDone: false,
// };
// const tasks = localStorage.getItem("userArr")
//   ? JSON.parse(localStorage.getItem("userArr"))
//   : [];
// tasks.push(task);
// localStorage.setItem("tasks", JSON.stringify(tasks));
