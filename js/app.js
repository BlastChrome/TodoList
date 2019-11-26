/* Program: TodoList web app
     Programmer: Nicholas Allen Jackson 
     Date: 11/15/2019 
     Version: 1.85
     Purpose: Making a simple Todo List app, just flexing a few muscles */

//function definitions
let add = e => {
  if (e.keyCode === 13 || e.target == add_btn) {
    if (todo_input.value == "") 
      alert("please enter a todo first! ");
    else {
      //placed the user input string into variable
      newTodo = todo_input.value;

      //created new li element with todo inside + self-destruct button
      list_item = document.createElement("li");
      list_item.innerHTML = newTodo + '<i class="fas fa-trash"></i>';

      //attach todo to list body
      todo_list.appendChild(list_item);

      //reset user input
      todo_input.value = "";
    }
  }
};
let del = e => {
  //finds event using event delegation
  if (e.target && e.target.className == "fas fa-trash") {
    //removes the parent li element
    event.target.parentNode.remove();
  }
};

//variable declarations
let add_btn = document.getElementById("add_todo_btn");
let todo_input = document.getElementById("todo_input");
let todo_list = document.getElementById("list");

//event listener(s)
add_btn.addEventListener("click", add);
todo_input.addEventListener("keydown", add);
todo_list.addEventListener("click", del);
