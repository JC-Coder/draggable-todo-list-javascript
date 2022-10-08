const todos = document.querySelectorAll('.todo');
const all_status = document.querySelectorAll('.status');
let draggedTodo = null; 

// add event listener to all todo elements
todos.forEach((todo) => {
    todo.addEventListener('dragstart', dragStart);
    todo.addEventListener('dragend', dragEnd);
})

// drag start 
function dragStart(){
    draggedTodo = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 1);
};

// dragend 
function dragEnd(){
    setTimeout(() => {
        this.style.display = "block";
    }, 1);
    draggedTodo = null;
}

// add event listener to all status container 
all_status.forEach(status => {
    status.addEventListener('dragover', dragOver);
    status.addEventListener('dragenter', dragEnter);
    status.addEventListener('dragleave', dragLeave);
    status.addEventListener('drop', dragDrop);
});

// dragover 
function dragOver(e){
    e.preventDefault();
    console.log('dragover');
}

// dragenter
function dragEnter(){
    console.log('dragenter');
    this.style.border = "1px dashed #ccc";
}

//dragleave 
function dragLeave(){
    console.log('dragleave');
    this.style.border = "none";
}

// drag drop
function dragDrop(){
    this.appendChild(draggedTodo);
    console.log('drag drop');
    this.style.border = "none";  
}


/* Create Todo  */

const todo_submit = document.getElementById('todo-submit');

todo_submit.addEventListener('click', createTodo);

function createTodo(){
    const todo_div = document.createElement("div");
    const input_val = document.getElementById('todo-input').value;
    const txt = document.createTextNode(input_val);

    todo_div.appendChild(txt);
    todo_div.classList.add('todo');
    todo_div.setAttribute("draggable", "true");

    /* create span element  */
    const span = document.createElement("span");
    const span_txt = document.createTextNode("\u00D7");
        span.classList.add("close");
        span.appendChild(span_txt);

    todo_div.appendChild(span);

    /* i used a new javascript feature here to get the element id and append the created div to it . Instead of doing 
    document.getElementById('no_status'); i called the id directly 
    no_status
    */

    no_status.appendChild(todo_div);

    /* i had to add this event listener to the newly created elements so the drag and drop will work . 
    why add them since we already have it on our code above ? 
    because the DOM have been painted and those functions already ran before this is added 
    */

    todo_div.addEventListener('dragstart', dragStart);
    todo_div.addEventListener('dragend', dragEnd);

    // add eventlistner to the span 
    span.addEventListener("click", () => {
        span.parentElement.style.display = "none";
    });

    // reset input value in add todo form 
    document.getElementById('todo-input').value = '';
    todo_form.classList.remove('active');
    overlay.classList.remove('active');
}



// Close Todo 

const close_btns = document.querySelectorAll('.close');

close_btns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.parentElement.style.display = "none";
    });
});