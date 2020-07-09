/* Program: TodoList web app
     Programmer: Nicholas Allen Jackson 
     Date: 11/15/2019 
     Version: 1.92
     Purpose: Making a simple Todo List app, just flexing a few muscles */

//function definitions
let add = e => {
  //input validation
  if (e.keyCode === 13 || e.target == add_btn) {
    if (todo_input.value == "") alert("please enter a todo first! ");
    else {
      //placed the user input string into variable
      newTodo = todo_input.value;

      //created new li element with todo text,del-btn,and edit-btn;
      list_item = document.createElement("li"); 
      list_item.classList.add('container');
      list_actions = document.createElement("div");
      list_actions.className += "list_actions";
      list_item.innerHTML =
        "<p class='todo-item'>" +
        newTodo +
        "</p>" +
        '<div class="icon-container edit-btn"><span class="iconify" data-icon="ic:outline-edit" data-inline="false" data-height="1.6rem"></span> </i></div>' +
        '<div class="icon-container trash-btn"> <span class="iconify" data-icon="carbon:trash-can" data-inline="false" data-height="1.6rem"></span></i></div> '; 

        

      //attach todo to list body
      todo_list.appendChild(list_item);

      //reset user input text field
      todo_input.value = "";
    }
  }
};
let clear = () => {
  //checks to see if the list is already empty
  if (todo_list.childElementCount < 1) alert("list empty!");
  else {
    do {
      answer = prompt(
        "this action will delete the ENTIRE todo list, will you proceed?(Y/N)"
      );
      //final deletion confirmation
      if (answer === "y" || answer === "Y") {
        todo_list.innerHTML = "";
        alert("deletion complete! ");
        break;
      } else if (answer === "n" || answer === "N" || answer == '') {
        alert("OK!");
        break;
      } else {
        if (answer == "") alert("please give an input!");
        else alert("invalid input: " + answer + "??");
        alert("please resubmit your edit");
      }
    } while (answer != "Y" || answer != "y" || answer != "n" || answer != "N");
  }
};
let edit = e => {  
  //checks for edit btn class
  if (e.target.className == "icon-container edit-btn") { 
    redo = e.target.parentNode.firstElementChild;
    redoN = redo.textContent;
    do {
      redo.textContent = prompt("Edit " + redo.textContent);
      if (redo.textContent.length > 27 || redo.textContent.length < 1) {
        if (redo.textContent.length > 27) {
          alert("todo too long");
          redo.textContent = redoN;
        } else if (redo.textContent.length < 1){
          alert("Todo too short");
          redo.textContent = redoN;
        }
      }
    } while (redo.textContent.length > 27);
  } 
};
let del = e => { 
  if ( e.target.className == "icon-container trash-btn") {
    e.target.parentNode.remove();
  } 
}; 
let done = e => {
  if(e.target.className == "todo-item"){ 
    e.target.classList.add('done');
  } else if(e.target.className == "todo-item done"){
    e.target.classList.remove('done');
  }
};


//variable declarations
let add_btn = document.getElementById("add-btn");
let clear_btn = document.getElementById("delete-btn");
let todo_input = document.getElementById("todo-input");
let todo_list = document.getElementById("todo-items-container"); 


//event listener(s)
add_btn.addEventListener("click", add);
todo_input.addEventListener("keydown", add);
clear_btn.addEventListener("click", clear);

//todo item(s) listener(s)
todo_list.addEventListener("click", del);
todo_list.addEventListener("click", edit); 
todo_list.addEventListener('click', done);
