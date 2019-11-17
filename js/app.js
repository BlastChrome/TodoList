/* Program: TodoList web app
     Programmer: Nicholas Allen Jackson 
     Date: 11/15/2019 
     Version: 0.03 
     Purpose: Making a simple Todo List app, just flexing a few muscles */ 

let addTodo = () => {
    if(userInput.value == '')
        prompt("Please enter a Todo first! "); 
    else{
        nTodo = userInput.value; 
        todos.push(nTodo); 
        console.log("added " + nTodo); 
        userInput.value = '';
    }      
} 
let delTodo = () => {
    if(todos.length === 0){
        prompt("Todo list is empty! "); 
    } else {
        dTodo = prompt("Enter the todo you wish to delete! "); 
        for(let i = 0; i < todos.length; i++){
            if(todos[i] === dTodo) 
                todos.splice(i,1);
            }
        }
}


let todos = []; 
let userInput = document.getElementById('list-input');
let addBtn = document.getElementById('add_button');  
let delBtn = document.getElementById('del_button');  
let nTodo;



addBtn.addEventListener('click',addTodo); 
delBtn.addEventListener('click', delTodo);





