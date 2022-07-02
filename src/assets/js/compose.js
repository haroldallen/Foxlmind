function composePostFromForm() {
    var type = document.getElementById("compose-form-type");
    var date = document.getElementById("compose-form-date");
    var title = document.getElementById("compose-form-title");
    var content = document.getElementById("compose-form-content");

    // Checks
    console.log(title.value +" and "+content.value)
    if (title.value === "" || content.value === "") {
        document.getElementById("error").style.display = "flex";
        document.getElementById("error-content").innerHTML = "<strong>Error</strong>: Please fill out all required fields!";
        return;
    }

    var dateFull = new Date(date.value);

    var newDateFull = dateFull.getFullYear()+"-"+("0" + (dateFull.getMonth() + 1)).slice(-2)+"-"+("0" + dateFull.getDate()).slice(-2);

    if (date.value === "") {newDateFull = "endless";}

    if (type.value.toLowerCase() === "note") {
        composeNote(newDateFull, title.value, content.value);
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