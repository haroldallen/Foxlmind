async function optionComplete(id) {
    console.log("Attempting to mark post with id "+id+" completed")
    updateValueInPost(id, "state", "completed");
    location.reload();
}
this.optionComplete = optionComplete;

async function optionUncomplete(id) {
    console.log("Attempting to mark post with id "+id+" uncompleted");
    updateValueInPost(id, "state", "visible");
    location.reload();
}
this.optionUncomplete = optionUncomplete;

function optionEdit(id) {
    var posts = document.getElementById('page-jsei').children;
    var htp = posts.namedItem('pid-'+id);
    var thisPostType = htp.children[0].children[0].innerHTML.toString().split(' | ')[1].toLowerCase();

    /* Date */
    var datedefaultvalue = htp.children[0].children[0].innerHTML.toString().split(' | ')[0].toLowerCase() === "endless" ? "" : htp.children[0].children[0].innerHTML.toString().split(' | ')[0];
    htp.children[0].children[0].innerHTML = "<input id='editingpost-"+id+"-date' type='date' value='"+datedefaultvalue+"' onkeydown='submitEdit(`date`, "+id+")'> | "+thisPostType;
    /* Title */
    htp.children[0].children[1].innerHTML = "<input id='editingpost-"+id+"-title' type='text' value='"+htp.children[0].children[1].innerHTML+"' onkeydown='submitEdit(`title`, "+id+")'>";

    if (thisPostType === "note") {
        console.log("note")
        /* Note Content */
        htp.children[0].children[2].innerHTML = "<input id='editingpost-"+id+"-pcontent' type='text' value='"+htp.children[0].children[2].innerHTML+"' onkeydown='submitEdit(`pcontent`, "+id+")'>";
    } else if (thisPostType === "todo") {
        console.log("todo")
        var todos = htp.children[0].children[2].children;
        console.log(todos);

        for (var i = 0; i < todos.length; i++) {
            console.log(todos[i]);
            console.log(todos[i].children[0])
            console.log(todos[i].children[0].innerHTML)
            console.log(todos[i].children[0].innerHTML.toString())
        }
    } else {console.log("is " + thisPostType)}

    console.log("Editing posts has not yet been implemented. ID: "+id);
    document.getElementById("error").style.display = "flex";
    document.getElementById("error-content").innerHTML = "<strong>Error</strong>: This feature has not yet been implemented!";
}
this.optionEdit = optionEdit;

function submitEdit(type, id) {
    if (event.keyCode !== 13) return;
    console.log(id+", "+type)
    console.log(document.getElementById('editingpost-'+id+'-'+type));
    switch(type) {
        case "date":
            var nd = document.getElementById('editingpost-'+id+'-date').value;
            if (nd === "") return;
            updateValueInPost(id, "date", nd);
            break;
        case "title":
            updateValueInPost(id, "title", document.getElementById('editingpost-'+id+'-title').value);
            break;
        case "pcontent":
            updateValueInPost(id, "content", document.getElementById('editingpost-'+id+'-pcontent').value);
            break;
    }

    document.getElementById('editingpost-'+id+'-'+type).parentElement.innerHTML += `<i style="margin-left:5px;" class="fa-solid fa-square-check"></i>`;
}

function optionFuncEditDate(id, newDate) {
    updateValueInPost(id, "date", newDate);
    location.reload();
}
this.optionFuncEditDate = optionFuncEditDate;
function optionFuncEditTitle(id, newTitle) {
    updateValueInPost(id, "title", newTitle);
    location.reload();
}
this.optionFuncEditTitle = optionFuncEditTitle;
function optionFuncEditNoteContent(id, newContent) {
    getValueInPost(id, "type", function(rv) {
        if (rv === "note") {
            updateValueInPost(id, "content", newContent);
            location.reload();
        }
    })
}
this.optionFuncEditNoteContent = optionFuncEditNoteContent;
function optionFuncEditTodoLabel(pid, cid, newLabel) {
    getValueInPost(pid, "type", function(rv) {
        if (rv === "todo") {
            updateTodoValueInPost(pid, cid, "label", newLabel);
            location.reload();
        }
    })
}
this.optionFuncEditTodoLabel = optionFuncEditTodoLabel;

function optionDelete(id) {
    console.log("Attempting to delete post with id "+id)
    deletePost(id);
    location.reload();
}
this.optionDelete = optionDelete;

function updateCheck(pid, cid) {
    let checked = document.getElementById(`todo-${pid}-${cid}-checkbox`).checked;
    updateTodoValueInPost(pid, cid, "val", checked);
}


function closeError() {
    document.getElementById("error").style.display = "none";
}
this.closeError = closeError;