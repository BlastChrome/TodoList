/* Program: TodoList web app
     Programmer: Nicholas Allen Jackson 
     Date: 11/15/2019 
     Version: 0.35
     Purpose: Making a simple Todo List app, just flexing a few muscles */

let addTodo = () => {
  if (todoInput.value == "") prompt("Please enter a Todo first! ");
  else {
    newTodo = todoInput.value;
    todos.push(newTodo);
    tDisplay = document.createElement("li");
    tDisplay.className += "list_item";
    tDisplay.innerHTML += newTodo + '<span id="del_button"> DEL</span>';
    todoDisplay.appendChild(tDisplay);
    todoInput.value = "";
    todoItemDisplay = document.querySelectorAll("li");
  }
};
let delTodo = () => {
  if (todos.length == 0) {
    prompt("Todo list is empty! ");
  } else { 
    dTodo = prompt("Please Enter the todo to be deleted"); 
    let i;
    for(i = 0; i < todos.length; i++){
      if(todos[i] == dTodo){
        todos.splice(i,1);  
        todoDisplay.childNodes[++i].remove(); 
        console.log("removed " + dTodo); 
      }
    } 
  }
};

let todos = [];
let newTodo;

let tDisplay;
let todoInput = document.getElementById("list-input");
let todoDisplay = document.getElementById("list");
let todoItemDisplay = document.querySelectorAll("li");

let addBtn = document.getElementById("add_button");
let delBtn = document.getElementById("del_button");

addBtn.addEventListener("click", addTodo);
delBtn.addEventListener("click", delTodo);
