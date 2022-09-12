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
    contentsDiv.innerHTML = "";
    try {
        const notesfile = fs.readFileSync(dataPath+"/posts.fpf");
        const notesParsed = JSON.parse(notesfile);
        let notes = notesParsed.table;
        let notesLength = Object.keys(notes).length;
        console.log("Loading tasks ("+notesLength+") ...")
        let postsLoaded = 0;

        for (let i = 0; i < notesLength; i++) {
            let thisNote = notes[i];
            let thisNoteKeys = Object.keys(thisNote);
            let thisNoteValues = Object.values(thisNote);

            console.log("Loading task " + i)
            console.log("Task date: " + thisNoteValues[0] + "... Today: " + tc)
            
            let upcomingBoolean = false;
            let todayDate = new Date(tc);
            let taskDate = new Date(thisNoteValues[0]);
            if (gpg === "upcoming") {
                if (tc === "endless") {
                    upcomingBoolean = true;
                } else {
                    upcomingBoolean = (todayDate < taskDate && todayDate !== taskDate);
                }
            }
            if (gpg === "past" && thisNoteValues[0] !== "endless") {
                upcomingBoolean = (todayDate > taskDate && todayDate !== taskDate);
            }


            if (gpg === "today" || gpg === "upcoming" || gpg === "past") {
                if ((thisNoteValues[0] === tc || thisNoteValues[0] === "endless" || upcomingBoolean) && gpg !== "past" || (gpg === "past" && upcomingBoolean)) {
                    if ((!document.getElementById('showCompleted').parentElement.classList.contains('checked')) && thisNoteValues[4] === "completed") continue;
                    console.log("Task "+i+" matches filter")
                    let unCompleteIcon = "fa-check";
                    let unComplete = "Complete";
                    if (thisNoteValues[4] === "completed") { unComplete = "Uncomplete"; unCompleteIcon = "fa-angle-left"; }

                    let dateFormatted = thisNoteValues[0];
                    if (dateFormatted !== "endless") {
                        let dt = new Date(dateFormatted);
                        dateFormatted = ("0" + dt.getDate()).slice(-2)+"/"+("0" + (dt.getMonth() + 1)).slice(-2)+"/"+dt.getFullYear();
                    } else {dateFormatted = "ENDLESS";}

                    let typeFormatted = thisNoteValues[1].replace("note", "Note").replace("todo", "To-do list");
                    let todoContent = "";
                    if (thisNoteValues[1] === "todo") {
                        for (let it = 0; it < thisNoteValues[3].length; it++) {
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
                    <div name="tid-${i}" class="task-wrapper" id="task-wrapper-${i}">
                        <div class="task-options">
                            <i onclick="option${unComplete}(${i})" class="task-option complete fa-solid ${unCompleteIcon}"></i>
                            <i onclick="optionEdit(${i})" class="task-option edit fa-solid fa-pencil"></i>
                            <i onclick="optionDelete(${i})" class="task-option delete fa-solid fa-trash"></i>
                        </div>
                        <div class="task" id="task-${i}" onmousedown="rightClickThingy('task-wrapper-${i}')">
                            <p class="task-date">${dateFormatted}
                            <p class="task-title">${thisNoteValues[2]}</p>
                            <div class="task-contents ${thisNoteValues[1]}">${finalContent}</div>
                        </div>
                    </div>`;

                    
                    postsLoaded++;
                }
            }
        }
        console.log("Loaded "+postsLoaded+" tasks");
        if (postsLoaded === 0) {
            contentsDiv.innerHTML += `<p class="noposts">Couldn't find any tasks</p>`;
        }
    }
    catch (err) {
        contentsDiv.innerHTML += `<p class="noposts">There seems to be an error with your tasks file<br><button class="hvr btn btn-circle btn-accent" onclick="location.reload()">Reload</button> <button class="hvr btn btn-circle btn-gray" onclick="fixPostsFile()">Fix (will delete tasks)</button></p>`;
        console.error(err);
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
            console.log("Fixed tasks file (WX=true)");
        });
    } else {
        fs.writeFile(dataPath + "/posts.fpf", JSON.stringify(data2Write, null, 2), function (err) {
            if (err) throw err;
            console.log("Fixed tasks file (WX=false)");
        });
    }
}
this.fixPostsFile = fixPostsFile;

ipcRenderer.on('json_path', (e, args) => {
    console.log('DataPath: ' + args.path);
    dataPath = args.path.replaceAll('\\', '/');
    this.dataPath = args.path.replaceAll('\\', '/');
});

function loadComplete() {
    console.warn("%cWARNING!\n"+"%cSome console commands can cause irreversable damage to Foxlmind and your machine. Only use if you know what you are doing...\n\n"+"%cCopyright Notice"+"%cThis software is using the MIT License, and it's original creator is Foxlldev (https://foxl.design). Use forks of this software at your own risk.\n\n"+"%cSummary\n"+"%cdont be an idiot", "color: red; text-decoration: underline;", "color: yellow", "color: red; text-decoration: underline", "color: skyblue", "color: yellow; text-decoration: underline", "color: white")
    if (!fs.existsSync(dataPath+"/posts.fpf")) {fixPostsFile(true);}
    ipcRenderer.send('json_path');

    let daytxt = document.getElementById('top-title-day-text');
    if (localStorage.getItem('temp-gtp') === "past") daytxt.innerText = "Past";
    else if (localStorage.getItem('temp-gtp') === "upcoming") daytxt.innerHTML = "Upcoming";
    localStorage.setItem('temp-gtp', 'default');

    let dt = new Date();
    makeDate(dt, "", "");
    loadTheme();
    loadChecks();
    setTimeout(function() {loadTasksComplete(dt);}, 10);
}
this.loadComplete = loadComplete;

function reloadPage() {
    gpg = document.getElementById('top-title-day-text').innerText.toLowerCase();
    localStorage.setItem('temp-gtp', gpg);
    window.location.reload();
}

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