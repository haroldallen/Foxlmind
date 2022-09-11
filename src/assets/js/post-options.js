async function optionComplete(id) {
    console.log("Attempting to mark post with id "+id+" completed")
    updateValueInPost(id, "state", "completed");
    reloadPage();
}
this.optionComplete = optionComplete;

async function optionUncomplete(id) {
    console.log("Attempting to mark post with id "+id+" uncompleted");
    updateValueInPost(id, "state", "visible");
    reloadPage();
}
this.optionUncomplete = optionUncomplete;

function optionEdit(id) {
    let tasks = document.getElementById('into-tasks').children;
    let task = tasks.namedItem('tid-'+id);
    let taskc = task.children[1];
    let taskType = task.children[1].children[2].classList.contains('todo') ? 'todo' : 'note';
    
    task.classList.add('editing');

    // title
    let prevTitle = taskc.children[1].innerHTML;
    taskc.children[1].innerHTML = `<input type='text' class='editinput mw text title' value='${prevTitle}'>`;

    // todo
    if (taskType === "todo") {
        let points = taskc.children[2].children;
        for (let i=0; i<points.length; i++) {
            let prevLabel = points[i].children[1].innerHTML;
            points[i].children[1].innerHTML = `<input type='text' class='editinput mw text point' value='${prevLabel}'>`;
            points[i].style.marginTop = "9px";
            points[i].style.marginBottom = "9px";
        }
    }
    // note
    else if (taskType === "note") {
        let prevContent = taskc.children[2].children[0].innerHTML;
        taskc.children[2].innerHTML = `<textarea class='editinput text content'>${prevContent}</textarea>`;
    }

    $("#"+taskc.id).append(`<span class='secondary smol hvr hvrul' onclick='submitEdit(${id})'><i class='fa-solid fa-check'></i> Finish editing</span>`);
}
this.optionEdit = optionEdit;

function submitEdit(id) {
    let tasks = document.getElementById('into-tasks').children;
    let task = tasks.namedItem('tid-'+id);
    let taskc = task.children[1];
    let taskType = task.children[1].children[2].classList.contains('todo') ? 'todo' : 'note';

    let newTitle = taskc.children[1].children[0].value;
    console.log("Editing NewTitle: "+newTitle);
    updateValueInPost(id, 'title', newTitle);

    setTimeout(function () {
        if (taskType === "todo") {
            let points = taskc.children[2].children;
            for (let i = 0; i < points.length; i++) {
                let newLabel = points[i].children[1].children[0].value;
                console.log("Editing NewPointLabel for point " + i + ": " + newLabel);
                setTimeout(function(){updateTodoValueInPost(id, i, 'label', newLabel);},50);
            }
        }
        else if (taskType === "note") {
            let newContent = taskc.children[2].children[0].value;
            console.log("Editing NewNoteContent: " + newContent);
            updateValueInPost(id, 'content', newContent);
        }

        //reloadPage();
    }, 100);
}

function optionFuncEditDate(id, newDate) {
    updateValueInPost(id, "date", newDate);
    reloadPage();
}
this.optionFuncEditDate = optionFuncEditDate;
function optionFuncEditTitle(id, newTitle) {
    updateValueInPost(id, "title", newTitle);
    reloadPage();
}
this.optionFuncEditTitle = optionFuncEditTitle;
function optionFuncEditNoteContent(id, newContent) {
    getValueInPost(id, "type", function(rv) {
        if (rv === "note") {
            updateValueInPost(id, "content", newContent);
            reloadPage();
        }
    })
}
this.optionFuncEditNoteContent = optionFuncEditNoteContent;
function optionFuncEditTodoLabel(pid, cid, newLabel) {
    getValueInPost(pid, "type", function(rv) {
        if (rv === "todo") {
            updateTodoValueInPost(pid, cid, "label", newLabel);
            reloadPage();
        }
    })
}
this.optionFuncEditTodoLabel = optionFuncEditTodoLabel;

function optionDelete(id) {
    console.log("Attempting to delete post with id "+id)
    deletePost(id);
    reloadPage();
}
this.optionDelete = optionDelete;

function updateCheck(pid, cid, checked) {
    updateTodoValueInPost(pid, cid, "val", checked);
}


function closeError() {
    document.getElementById("error").style.display = "none";
}
this.closeError = closeError;