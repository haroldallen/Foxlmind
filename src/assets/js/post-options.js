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
    let posts = document.getElementById('page-jsei').children;
    let htp = posts.namedItem('pid-'+id);
    let thisPostType = htp.children[0].children[0].innerHTML.toString().split(' | ')[1].toLowerCase();

    htp.children[0].innerHTML += "<p style='margin-bottom: 0;'>Press enter on each field you want to save</p>";
    htp.classList.add('editing');

    // date
    let datedefaultvalue = htp.children[0].children[0].innerHTML.toString().split(' | ')[0].toLowerCase() === "endless" ? "" : htp.children[0].children[0].innerHTML.toString().split(' | ')[0];
    if (datedefaultvalue !== "") {
        let dt = datedefaultvalue.split('/');
        let formattedDt = dt[2]+"-"+dt[1]+"-"+dt[0]
        console.log("formattedDt got "+formattedDt);
        datedefaultvalue = formattedDt;
    }

    let dateendless = datedefaultvalue === "endless" ? " checked='checked'" : "";
    htp.children[0].children[0].innerHTML = "<fme class='downthing'><fme onkeydown='submitEdit(`date`, "+id+")' id='editingpost-"+id+"-datew' class='datewinput'><input id='editingpost-"+id+"-date' type='date' value='"+datedefaultvalue+"'>"+
        " or <input id='editingpost-"+id+"-endless' type='checkbox'"+dateendless+"> Endless? </fme> | "
        +thisPostType.replace('note', 'Note').replace(' list', '').replace('to-do', 'To-do list')+"</fme>";
    // title
    htp.children[0].children[1].innerHTML = "<input id='editingpost-"+id+"-title' type='text' value='"+htp.children[0].children[1].innerHTML+"' onkeydown='submitEdit(`title`, "+id+")'>";

    if (thisPostType === "note") {
        console.log("note")
        // note content
        htp.children[0].children[2].innerHTML = "<input id='editingpost-"+id+"-pcontent' type='text' value='"+htp.children[0].children[2].innerHTML+"' onkeydown='submitEdit(`pcontent`, "+id+")'>";
    } else if (thisPostType === "to-do list") {
        console.log("todo")
        let todos = htp.children[0].children[2].children;
        console.log(todos);

        // todo points
        for (let i = 0; i < todos.length; i++) {
            console.log(todos[i]);
            console.log(todos[i].children[0])
            console.log(todos[i].children[0].innerHTML)
            todos[i].children[0].innerHTML = "<input id='editingpost-"+id+"-tcontent-"+i+"' type='text' value='"+todos[i].children[0].innerHTML+"' onkeydown='submitEdit(`tcontent`, "+id+", "+i+")'>";
            /*getTodoValueInPost(id, i, "val", function(rv) {
                todos[i].children[1].checked = rv;
            });*/
        }
    } else {console.log("is " + thisPostType)}

    /*console.log("Editing posts has not yet been implemented. ID: "+id);
    document.getElementById("error").style.display = "flex";
    document.getElementById("error-content").innerHTML = "<strong>Error</strong>: This feature has not yet been implemented!";*/
}
this.optionEdit = optionEdit;

function submitEdit(type, id, tid = null) {
    if (event.keyCode !== 13) return;
    console.log(id+", "+type)
    console.log(document.getElementById('editingpost-'+id+'-'+type));
    switch(type) {
        case "date":
            if (document.getElementById('editingpost-'+id+'-endless').checked) {
                updateValueInPost(id, "date", "endless");
                return;
            }

            let nd = document.getElementById('editingpost-'+id+'-date').value;
            if (nd === "") return;
            updateValueInPost(id, "date", nd);
            break;
        case "title":
            updateValueInPost(id, "title", document.getElementById('editingpost-'+id+'-title').value);
            break;
        case "pcontent":
            updateValueInPost(id, "content", document.getElementById('editingpost-'+id+'-pcontent').value);
            break;
        case "tcontent":
            updateTodoValueInPost(id, tid, "label", document.getElementById('editingpost-'+id+'-tcontent-'+tid).value);
            break;
    }

    if (type !== "tcontent" && type !== "endless" && type !== "date")
        document.getElementById('editingpost-'+id+'-'+type).insertAdjacentHTML('afterend', `<i style="margin-left:5px;" class="fa-solid fa-square-check"></i>`);
    else if (type === "tcontent")
        document.getElementById('editingpost-'+id+'-'+type+'-'+tid).insertAdjacentHTML('afterend', `<i style="margin-left:5px;" class="fa-solid fa-square-check"></i>`);
    else if (type === "date" || type === "endless")
        document.getElementById('editingpost-'+id+'-'+"datew").insertAdjacentHTML('afterend', `<i style="margin-left:5px;" class="fa-solid fa-square-check"></i>`);
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