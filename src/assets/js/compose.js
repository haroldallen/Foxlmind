var fs = require('fs');
this.fs = fs;
var notesFile = require('./notes.json');

function composePostFromForm() {
    var type = document.getElementById("compose-form-type");
    var date = document.getElementById("compose-form-date");
    var title = document.getElementById("compose-form-title");
    var content = document.getElementById("compose-form-content");

    if (type.value.toLowerCase() === "note") {
        composeNote(date.value, title.value, content.value);
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