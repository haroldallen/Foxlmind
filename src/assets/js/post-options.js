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
    console.log("Editing posts has not yet been implemented. ID: "+id);
    document.getElementById("error").style.display = "flex";
    document.getElementById("error-content").innerHTML = "<strong>Error</strong>: This feature has not yet been implemented!";
}
this.optionEdit = optionEdit;

function optionDelete(id) {
    console.log("Attempting to delete post with id "+id)
    deletePost(id);
    location.reload();
}
this.optionDelete = optionDelete;

function updateCheck(pid, cid) {
    var checked = document.getElementById(`todo-${pid}-${cid}-checkbox`).checked;
    updateTodoValueInPost(pid, cid, "val", checked);
}


function closeError() {
    document.getElementById("error").style.display = "none";
}
this.closeError = closeError;