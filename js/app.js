// Variable declarations
$add_btn = $('#add-btn'); 
$clr_btn = $('#delete-btn'); 
$input = $('#todo-input'); 
$list = $('ol');

// function declarations 
let add = e =>{ 
    if (e.which === 13 || e.target === $add_btn){
        if($input.val() == '')
            alert('please enter a todo first')
    }
};
let clr = e => {
    console.log("clear btn clicked");
}

// function call
$add_btn.on('click', add); 
$clr_btn.on('click', clr); 
$input.on('keypress', add); 

