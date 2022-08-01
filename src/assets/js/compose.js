let todoId = 0;
let qs = new URLSearchParams(window.location.search);
let roc = qs.get('roc');

function loadComposeDefaultDate() {
    let date = document.getElementById("compose-form-date");
    let today = new Date();
    date.value = today.getFullYear()+"-"+("0" + (today.getMonth() + 1)).slice(-2)+"-"+("0" + today.getDate()).slice(-2);
}
this.loadComposeDefaultDate = loadComposeDefaultDate;
loadComposeDefaultDate();

function composePostFromForm() {
    let type = document.getElementById("compose-form-type");
    let date = document.getElementById("compose-form-date");
    let endless = document.getElementById("compose-form-endless");
    let title = document.getElementById("compose-form-title");
    let content = document.getElementById("compose-form-content");
    let todos = document.getElementById("compose-form-todos");

    // Checks
    console.log(date.value);
    console.log(title.value +" and "+content.value+" and "+document.getElementById(`compose-form-todos`).children[0].value)
    if (title.value === "" || (type.value.toLowerCase()==="note" && content.value === "") || (type.value.toLowerCase()==="todo" && document.getElementById(`compose-form-todos`).children[0].value === "")) {
        document.getElementById("error").style.display = "flex";
        document.getElementById("error-content").innerHTML = "<strong>Error</strong>: Please fill out all required fields!";
        return;
    }

    let dateFull = new Date(date.value);

    let newDateFull = dateFull.getFullYear()+"-"+("0" + (dateFull.getMonth() + 1)).slice(-2)+"-"+("0" + dateFull.getDate()).slice(-2);

    if (date.value === "" || endless.checked) {newDateFull = "endless";}

    if (type.value.toLowerCase() === "note") {
        composeNote(newDateFull, title.value, content.value);
    } else if (type.value.toLowerCase() === "todo") {
        let t = todos.children;
        let nt = [];
        for (let i=0; i<(todoId+1);i++) {
            if (t[i] !== null) {
                if (t[i].children[1] !== null) {
                    if (t[i].children[1].value !== "") {
                        let label = t[i].children[1].value;
                        let value = t[i].children[0].checked;
                        nt.push({"label": label, "val": value});
                    }
                }
            }
        }
        composeTodo(newDateFull, title.value, nt);
    } else {
        console.log("Other types have not been implemented yet!");
    }

    // Send user back to page
    window.location.href = "./index.html?page="+roc;
}
this.composePostFromForm = composePostFromForm;

function composeNote(dateStr,title,content) {
    console.log("Compose post");
    writeToNotes({
        "date":dateStr,
        "type":"note",
        "title":title,
        "content":content,
        "state":"visible"
    });
}
this.composeNote = composeNote;

function composeTodo(dateStr,title,todos) {
    let t = [];
    for (let i=0; i<todos.length; i++) {
        t.push(todos[i]);
    }
    console.log(t);
    console.log("Compose post");
    writeToNotes({
        "date":dateStr,
        "type":"todo",
        "title":title,
        "content":t,
        "state":"visible"
    });
}
this.composeTodo = composeTodo;

function loadPostType() {
    let type = document.getElementById('compose-form-type');
    let content = document.getElementById("compose-form-content");
    let todos = document.getElementById("compose-form-todos-wrapper");

    content.style.display = "none";
    todos.style.display = "none";
    
    console.log(type.value.toLowerCase());
    if (type.value.toLowerCase() === "note") {content.style.display="block";}
    else if (type.value.toLowerCase() === "todo") {todos.style.display="block";}
}
this.loadPostType = loadPostType;
loadPostType();

function addTodo() {
    todoId++;
    $('#compose-form-todos').append(`
    <div class="compose-form-todo" id="compose-form-todo">
        <input class="compose-form-checkbox" type="checkbox">
        <input class="compose-form-input" placeholder="To-do label..." type="text">
        <button class="compose-form-button compose-form-button-red" onclick="removeTodo(${todoId})">X</button>
        <br>
    </div>`);
    // <div class="compose-form-todo"><input class="compose-form-checkbox" type="checkbox"><input class="compose-form-input" placeholder="Label..." type="text"><button class="compose-form-button compose-form-button-red" onclick="removeTodo(${todoId})">X</button></div>`
}
this.addTodo = addTodo;

function removeTodo(id) {
    document.getElementById(`compose-form-todos`).children[id].remove();
}
this.removeTodo = removeTodo;