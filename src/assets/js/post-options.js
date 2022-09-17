async function optionComplete(id) {
    if (!document.getElementById('into-tasks').children[id].children[0].classList.contains('open')) return;
    console.log("Attempting to mark post with id "+id+" completed")
    updateValueInPost(id, "state", "completed");
    reloadPage();
}

async function optionUncomplete(id) {
    if (!document.getElementById('into-tasks').children[id].children[0].classList.contains('open')) return;
    console.log("Attempting to mark post with id "+id+" uncompleted");
    updateValueInPost(id, "state", "visible");
    reloadPage();
}

function optionEdit(id) {
    let tasks = document.getElementById('into-tasks').children;
    let task = tasks.namedItem('tid-'+id);
    if (!task.children[0].classList.contains('open')) return;
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

function submitEdit(id) {
    let tasks = document.getElementById('into-tasks').children;
    let task = tasks.namedItem('tid-'+id);
    let taskc = task.children[1];
    let taskType = task.children[1].children[2].classList.contains('todo') ? 'todo' : 'note';

    let newTitle = taskc.children[1].children[0].value;
    console.log("Editing NewTitle: "+newTitle);
    updateValueInPost(id, 'title', newTitle);

    setTimeout(function () {
        let time = 50;
        if (taskType === "todo") {
            let points = taskc.children[2].children;
            time += (points.length*50);
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
        setTimeout(function(){reloadPage();},time);
    }, 100);
}

function optionDelete(id) {
    console.log(document.getElementById('into-tasks').children[id].children[0]);
    if (!document.getElementById('into-tasks').children[id].children[0].classList.contains('open')) return;
    console.log("Attempting to delete post with id "+id)
    deletePost(id);
    reloadPage();
}

function updateCheck(pid, cid, checked) {
    updateTodoValueInPost(pid, cid, "val", checked);
}


function closeError() {
    document.getElementById("error").style.display = "none";
}