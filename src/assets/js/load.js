var qs = new URLSearchParams(window.location.search);
var gpg = qs.get('page');

function loadSidebar() {
    $("#sidebar").load("./sidebar.html");
}
this.loadSidebar = loadSidebar;

function loadPage(pg) {
    if (pg === "today") {
        $("#content").load('./today.html');
    } else if (pg === "upcoming") {
        $("#content").load('./upcoming.html');
    } else if (pg === "completed") {
        $("#content").load('./completed.html');
    } else if (pg === "compose") {
        $("#content").load('./compose.html');
    } else if (pg === "settings") {
        $("#content").load('./settings.html');
    } else {
        pg = "today";
        loadPage(pg);
    }

    if (pg === "today" || pg === "upcoming" || pg === "completed") {
        var dt = new Date();
        var dy = dt.getDay();
        if (dy === 0) {dy = "Sunday"} else if (dy === 1) {dy = "Monday"} else if (dy === 2) {dy = "Tuesday"} else if (dy === 3) {dy = "Wednesday"} else if (dy === 4) {dy = "Thursday"} else if (dy === 5) {dy = "Friday"} else if (dy === 6) {dy = "Saturday"} else {dy = "Error"}
        var fm = dy+", "+dt.getDate()+"/"+("0" + (dt.getMonth() + 1)).slice(-2)+"/"+dt.getFullYear();
        if (pg === "today"){loadPageTitle(fm);}

        loadPosts(dt.getFullYear()+"-"+("0" + (dt.getMonth() + 1)).slice(-2)+"-"+dt.getDate());
    }
}
this.loadPage = loadPage;

function loadPageTitle(pgt) {
    setTimeout(function() {
        document.getElementById('ttl').innerText = pgt;
    }, 1);
}
this.loadPageTitle = loadPageTitle;

async function loadPosts(tc) {
    console.log("loadTodayNotes started")
    const notesfile = await fetch("./notes.json");
    const notesParsed = await notesfile.json();
    var notes = await notesParsed.table;
    console.log(notes);
    var contentsDiv = document.getElementById("page-jsei");
    var notesLength = Object.keys(notes).length;
    console.log(notesLength)
    for (var i = 0; i < notesLength; i++) {
        var thisNote = notes[i];
        var thisNoteKeys = Object.keys(thisNote);
        console.log("ThisNoteKeys is "+thisNoteKeys)
        var thisNoteValues = Object.values(thisNote);
        console.log("ThisNoteValues is "+thisNoteValues)

        console.log("for loop iteration "+i)
        console.log("date: "+thisNoteValues[0]+" needs to be equal to TC:"+tc+" or endless")

        var upcomingBoolean = false;
        if (gpg === "upcoming") {
            if (tc === "endless") {
                upcomingBoolean = true;
            }
            else {
                var mba = new Date(tc);
                console.log("mba/today ("+mba.getFullYear()+"-"+("0" + (mba.getMonth() + 1)).slice(-2)+"-"+mba.getDate()+") must be before or equal to post's date ("+thisNoteValues[0]+") - RESULT: "+(mba <= new Date(thisNoteValues[0])));
                upcomingBoolean = mba <= new Date(thisNoteValues[0]);
            }
        }


        if ((gpg === "today" && thisNoteValues[4] === "visible") || (gpg === "completed" && thisNoteValues[4] === "completed") || (gpg === "upcoming" && thisNoteValues[4] === "visible")) {
            if (thisNoteValues[0] === tc || thisNoteValues[0] === "endless" || upcomingBoolean) {
                console.log("found post for today")
                var unCompleteIcon = "fa-check";
                var unComplete = "Complete";
                if (gpg === "completed") {unComplete = "Uncomplete"; unCompleteIcon = "fa-angle-left";}
                contentsDiv.innerHTML += `
                <div class="post post-${thisNoteValues[1]}">
                    <div class="post-ins">
                        <p class="post-info post-${thisNoteValues[1]}-info">${thisNoteValues[0]} | ${thisNoteValues[1]}</p>
                        <p class="post-title post-${thisNoteValues[1]}-title">${thisNoteValues[2]}</p>
                        <p class="post-content post-${thisNoteValues[1]}-content">${thisNoteValues[3]}</p>
                    </div>
                    <div class="post-options">
                        <button id="post-options-complete" class="post-option fa-solid ${unCompleteIcon}" onclick="option${unComplete}(${i})"></button>
                        <br><button id="post-options-edit" class="post-option fa-solid fa-pencil" onclick="optionEdit(${i})"></button>
                        <br><button id="post-options-delete" class="post-option fa-solid fa-trash-can" onclick="optionDelete(${i})"></button>
                    </div>
                </div>`;
            }
        }
    }
}
this.loadPosts = loadPosts;

function loadComplete() {
    loadSidebar();
    loadPage(gpg);
}
this.loadComplete = loadComplete;

function openURLInBrowser(url) {
    require('electron').shell.openExternal(url);
}
this.openURLInBrowser = openURLInBrowser;