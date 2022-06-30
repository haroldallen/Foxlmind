async function optionComplete(id) {
    console.log("Attempting to mark post with id "+id+" completed")
    updateValueInPost(id, "state", "completed");
}
this.optionComplete = optionComplete;

async function optionUncomplete(id) {
    console.log("Attempting to mark post with id "+id+" uncompleted");
    updateValueInPost(id, "state", "visible");
}
this.optionUncomplete = optionUncomplete;

function optionEdit(id) {
    console.log("Editing posts has not yet been implemented. ID: "+id)
}
this.optionEdit = optionEdit;

function optionDelete(id) {
    console.log("Attempting to delete post with id "+id)
    deletePost(id);
}
this.optionDelete = optionDelete;