var todoId = 0;

function composeSwitchTab(tabName) {
    let t = document.getElementById(`compose-popup-input-${tabName}`)
    let tab = document.getElementById(`compose-popup-input-tab-${tabName}`)

    for (let i = 0; i < tab.parentElement.children.length; i++) { tab.parentElement.children[i].classList.remove('open'); }
    tab.classList.add('open');

    for (let i = 0; i < tab.parentElement.parentElement.children[1].children[0].children.length; i++) { tab.parentElement.parentElement.children[1].children[0].children[i].style.display = "none"; }
    t.style.display = "block";
}

function composeTodoKeydown() {
    setTimeout(function () {
        let pointse = document.getElementById('compose-popup-content-points');
        let points = pointse.children;
        if (points[points.length - 1].children[1].value.length > 0) {
            $(`#${pointse.id}`).append(
                `<div class="compose-popup-content-point" id="compose-popup-content-point-${points.length}">
                <i onclick="toggleCheck('compose-point-${points.length}')" id="compose-point-${points.length}" class="hvr fa-solid fa-circle" style="margin-right: 5px;"></i>
                <input placeholder="Add another point..." onkeydown="composeTodoKeydown(event)" class="compose-popup-content-point-label" id="compose-popup-content-point-0-label" type="text">
            </div>`);
        }
        for (var i = 0; i < points.length; i++) {
            if (points[i].children[1].value.length === 0 && i !== 0 && i !== points.length - 1) pointse.removeChild(points[i]);
            if (i === points.length - 1) points[i].classList.add('notcontaining')
            else points[i].classList.remove('notcontaining')
        }
    }, 1);
}

function composePostFromForm() {
    let type = document.getElementById("compose-popup-input-tab-todo").classList.contains('open') ? "todo" : "note";
    //let date = document.getElementById("compose-form-date");
    let endless = document.getElementById("compose-popup-endless-i").classList.contains('fa-check-circle');
    let title = document.getElementById(`compose-popup-content-${type}-title`);
    let content = type === "note" ? document.getElementById("compose-popup-content-note") : null;
    let todos = type === "todo" ? document.getElementById("compose-popup-content-points") : null;

    // Checks
    //console.log(date.value);
    if (title.value === "" || (type === "note" && content.value === "") || (type === "todo" && todos.children[0].value === "")) {
        document.getElementById("compose-error").style.display = "flex";
        document.getElementById("compose-error-content").innerHTML = "<strong>Error</strong>: Please fill out all required fields!";
        return;
    }

    //let dateFull = new Date(date.value);
    let dateFull = new Date();

    let newDateFull = dateFull.getFullYear()+"-"+("0" + (dateFull.getMonth() + 1)).slice(-2)+"-"+("0" + dateFull.getDate()).slice(-2);

    if (endless.checked) {newDateFull = "endless";}

    if (type === "note") {
        composeNote(newDateFull, title.value, content.value);
    } else if (type === "todo") {
        let t = todos.children;
        let nt = [];
        for (let i=0; i<(todoId+1);i++) {
            if (t[i] !== null) {
                if (t[i].children[1] !== null) {
                    if (t[i].children[1].value !== "") {
                        let label = t[i].children[1].value;
                        let value = t[i].children[0].classList.contains('fa-check-circle');
                        nt.push({"label": label, "val": value});
                    }
                }
            }
        }
        composeTodo(newDateFull, title.value, nt);
    } else {
        console.log("Other types have not been implemented yet!");
    }
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

function removeTodo(id) {
    document.getElementById(`compose-form-todos`).children[id].remove();
}
this.removeTodo = removeTodo;

function closeComposeError() {
    document.getElementById("compose-error").style.display = "none";
}