var qs = new URLSearchParams(window.location.search);
var gpg = qs.get('page');
const storage = require('electron-json-storage');
var { ipcRenderer } = require('electron');
const fs = require('fs');

var dataPath = "error";
this.dataPath = dataPath;

function loadSidebar() {
    $("#sidebar").load("./sidebar.html");
}
this.loadSidebar = loadSidebar;

function loadPage(pg) {
    let acceptedPages = ['today','upcoming','past','completed','compose','settings'];
    if (acceptedPages.includes(pg) && pg !== null) {
        $('#content').load(`./${pg}.html`);
    } else {
        window.location.href = "./index.html?page=today";
    }

    if (pg === "today" || pg === "upcoming" || pg === "past" || pg === "completed") {
        let dt = new Date();
        let daysFormatted = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dy = daysFormatted[dt.getDay()];
        let fm = dy+", "+("0" + dt.getDate()).slice(-2)+"/"+("0" + (dt.getMonth() + 1)).slice(-2)+"/"+dt.getFullYear();
        if (pg === "today"){loadPageTitle(fm);}

        setTimeout(function() {
            loadPosts(dt.getFullYear()+"-"+("0" + (dt.getMonth() + 1)).slice(-2)+"-"+("0" + dt.getDate()).slice(-2));
        }, 100);
    }
}
this.loadPage = loadPage;

function loadPageTitle(pgt) {
    setTimeout(function() {
        document.getElementById('ttl').innerText = pgt;
    }, 1);
}
this.loadPageTitle = loadPageTitle;

function loadTasks(tc) {
    const contentsDiv = document.getElementById("into-tasks");
    try {
        console.log("loadTodayNotes started")
        const notesfile = fs.readFileSync(dataPath+"/posts.fpf");
        console.log("notesFile got "+notesfile);
        const notesParsed = JSON.parse(notesfile);
        let notes = notesParsed.table;
        console.log("notes got "+notes);
        console.log("contentsDiv got "+contentsDiv);
        let notesLength = Object.keys(notes).length;
        console.log("notesLength got "+notesLength)
        let postsLoaded = 0;

        for (let i = 0; i < notesLength; i++) {
            let thisNote = notes[i];
            let thisNoteKeys = Object.keys(thisNote);
            console.log("ThisNoteKeys is " + thisNoteKeys)
            let thisNoteValues = Object.values(thisNote);
            console.log("ThisNoteValues is " + thisNoteValues)

            console.log("for loop iteration " + i)
            console.log("date: " + thisNoteValues[0] + " needs to be equal to TC:" + tc + " or endless")

            let upcomingBoolean = false;
            if (gpg === "upcoming") {
                if (tc === "endless") {
                    upcomingBoolean = true;
                }
                else {
                    let mba = new Date(tc);
                    console.log("mba/today (" + mba.getFullYear() + "-" + ("0" + (mba.getMonth() + 1)).slice(-2) + "-" + ("0" + mba.getDate()).slice(-2) + ") must be before or equal to post's date (" + thisNoteValues[0] + ") - RESULT: " + (mba <= new Date(thisNoteValues[0])));
                    upcomingBoolean = mba <= new Date(thisNoteValues[0]);
                }
            }
            if (gpg === "past" && thisNoteValues[0] !== "endless") {
                let mba = new Date();
                console.log("mba/today (" + mba.getFullYear() + "-" + ("0" + (mba.getMonth() + 1)).slice(-2) + "-" + ("0" + mba.getDate()).slice(-2) + ") must be before or equal to post's date (" + thisNoteValues[0] + ") - RESULT: " + (mba <= new Date(thisNoteValues[0])));
                upcomingBoolean = mba > new Date(thisNoteValues[0]);
            }


            if ((gpg === "today" && thisNoteValues[4] === "visible") || (gpg === "completed" && thisNoteValues[4] === "completed") || (gpg === "upcoming" && thisNoteValues[4] === "visible") || (gpg === "past" && thisNoteValues[4] === "visible")) {
                if ((gpg === "completed" || thisNoteValues[0] === tc || thisNoteValues[0] === "endless" || upcomingBoolean) && gpg !== "past" || gpg === "past" && upcomingBoolean) {
                    console.log("found post for today")
                    let unCompleteIcon = "fa-check";
                    let unComplete = "Complete";
                    if (gpg === "completed") { unComplete = "Uncomplete"; unCompleteIcon = "fa-angle-left"; }

                    let dateFormatted = thisNoteValues[0];
                    if (dateFormatted !== "endless") {
                        let dt = new Date(dateFormatted);
                        dateFormatted = ("0" + dt.getDate()).slice(-2)+"/"+("0" + (dt.getMonth() + 1)).slice(-2)+"/"+dt.getFullYear();
                    } else {dateFormatted = "ENDLESS";}

                    let typeFormatted = thisNoteValues[1].replace("note", "Note").replace("todo", "To-do list");
                    let todoContent = "";
                    if (thisNoteValues[1] === "todo") {
                        for (let it = 0; it < thisNoteValues[3].length; it++) {
                            console.log(Object.values(thisNoteValues[3])[it].val);
                            let checkedOut = Object.values(thisNoteValues[3])[it].val === true ? " checked" : "";
                            let checkedIns = Object.values(thisNoteValues[3])[it].val === true ? "check-" : "";
                            todoContent +=
                                `<div class="todo-point${checkedOut}" id="todo-${i}-${it}-checkwrap">
                                    <i onclick="toggleCheckT('task-${i}-point-${it}-check', ${i}, ${it})" id="task-${i}-point-${it}-check" class="fa-solid fa-${checkedIns}circle"></i>
                                    <label>${Object.values(thisNoteValues[3])[it].label}</label>
                                </div>`;
                        }
                    }
                    let contentElementType = thisNoteValues[1] === "note" ? "p" : "div";
                    let finalContent = thisNoteValues[1] === "note" ? `<span>${thisNoteValues[3]}</span>` : todoContent;

                    contentsDiv.innerHTML += `
                    <div class="task">
                        <p class="task-date">${dateFormatted}
                        <p class="task-title">${thisNoteValues[2]}</p>
                        <div class="task-contents">
                            ${finalContent}
                        </div>
                    </div>`;

                    
                    postsLoaded++;
                }
            }
        }
        console.log(postsLoaded);
        if (postsLoaded === 0) {
            contentsDiv.innerHTML += `<p class="noposts">Couldn't find any tasks</p>`;
        }
    }
    catch (err) {
        contentsDiv.innerHTML += `<p class="noposts">There seems to be an error with your tasks file<br><button class="button" onclick="location.reload()">Reload</button> <button class="button" onclick="fixPostsFile()">Fix (will delete tasks)</button></p>`;
        console.log(err);
    }
}

function fixPostsFile(wx) {
    if (!fs.existsSync(dataPath)){
        fs.mkdirSync(dataPath);
    }
    let data2Write = {table: [{"date": "endless","type": "note","title": "Welcome to Foxlmind...","content": "Thank you for using Foxlmind!<br>This was made completely for fun but if you want to support its development, you can <a onclick='openURLInBrowser(`https://patreon.com/foxlldev`)' href='#'>donate here</a>.<br>If not, that's fine, enjoy :)","state": "visible"}]};
    if (wx === true) {
        fs.writeFile(dataPath + "/posts.fpf", JSON.stringify(data2Write, null, 2), {flags: 'wx'}, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    } else {
        fs.writeFile(dataPath + "/posts.fpf", JSON.stringify(data2Write, null, 2), function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }
}
this.fixPostsFile = fixPostsFile;

ipcRenderer.on('json_path', (e, args) => {
    console.log('Found path ' + args.path);
    dataPath = args.path;
    this.dataPath = args.path;
});

function loadComplete() {
    console.log("fs got "+fs);
    if (!fs.existsSync(dataPath+"/posts.fpf")) {fixPostsFile(true);}
    console.log("dataPath got "+dataPath);
    console.log("storage getDataPath got "+storage.getDataPath());
    console.log("loadComplete got path "+dataPath);
    //loadSidebar();
    //loadPage(gpg);
    //loadTheme();
    //setTimeout(loadSettings,1);
    ipcRenderer.send('json_path');
    gpg = document.getElementById('top-title-day-text').innerText.toLowerCase();
    console.log(gpg);
    let dt = new Date();
    makeDate(dt, "", "");
    setTimeout(function() {loadTasksComplete(dt);}, 50);
}
this.loadComplete = loadComplete;

function loadTasksComplete(dt) {
    gpg = document.getElementById('top-title-day-text').innerText.toLowerCase();
    loadTasks(dt.getFullYear()+"-"+("0" + (dt.getMonth() + 1)).slice(-2)+"-"+("0" + dt.getDate()).slice(-2));
}

function makeDate(date, before, after) {
    let daysFormatted = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthsFormatted = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let fm = daysFormatted[date.getDay()]+", "+monthsFormatted[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
    document.getElementById('top-title-date').innerText = before+fm+after;
}

function openURLInBrowser(url) {
    require('electron').shell.openExternal(url);
}
this.openURLInBrowser = openURLInBrowser;