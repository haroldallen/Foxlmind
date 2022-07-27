let qs = new URLSearchParams(window.location.search);
let gpg = qs.get('page');
const storage = require('electron-json-storage');
let { ipcRenderer } = require('electron');
let fs = require('fs');
this.fs = fs;

let dataPath = "error";
this.dataPath = dataPath;

ipcRenderer.send('json_path');
ipcRenderer.on('json_path', (e, args) => {
    console.log('Found path ' + args.path);
    dataPath = args.path;
    this.dataPath = args.path;
});

function loadSidebar() {
    $("#sidebar").load("./sidebar.html");
}
this.loadSidebar = loadSidebar;

function loadPage(pg) {
    switch (pg) {
        case "today":
            $("#content").load('./today.html');
            break;
        case "upcoming":
            $("#content").load('./upcoming.html');
            break;
        case "completed":
            $("#content").load('./completed.html');
            break;
        case "compose":
            $("#content").load('./compose.html');
            break;
        case "settings":
            $("#content").load('./settings.html');
            break;
        default:
            window.location.href = "./index.html?page=today";
    }
    if (pg === "today" || pg === "upcoming" || pg === "completed") {
        let dt = new Date();
        let dy = dt.getDay();
        if (dy === 0) {dy = "Sunday"} else if (dy === 1) {dy = "Monday"} else if (dy === 2) {dy = "Tuesday"} else if (dy === 3) {dy = "Wednesday"} else if (dy === 4) {dy = "Thursday"} else if (dy === 5) {dy = "Friday"} else if (dy === 6) {dy = "Saturday"} else {dy = "Error"}
        let fm = dy+", "+("0" + dt.getDate()).slice(-2)+"/"+("0" + (dt.getMonth() + 1)).slice(-2)+"/"+dt.getFullYear();
        if (pg === "today"){loadPageTitle(fm);}

        loadPosts(dt.getFullYear()+"-"+("0" + (dt.getMonth() + 1)).slice(-2)+"-"+("0" + dt.getDate()).slice(-2));
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
    const notesfile = await fetch(dataPath+"/posts.json");
    const notesParsed = await notesfile.json();
    let notes = await notesParsed.table;
    console.log(notes);
    let contentsDiv = document.getElementById("page-jsei");
    let notesLength = Object.keys(notes).length;
    console.log(notesLength)
    let postsLoaded = 0;
    for (let i = 0; i < notesLength; i++) {
        let thisNote = notes[i];
        let thisNoteKeys = Object.keys(thisNote);
        console.log("ThisNoteKeys is "+thisNoteKeys)
        let thisNoteValues = Object.values(thisNote);
        console.log("ThisNoteValues is "+thisNoteValues)

        console.log("for loop iteration "+i)
        console.log("date: "+thisNoteValues[0]+" needs to be equal to TC:"+tc+" or endless")

        let upcomingBoolean = false;
        if (gpg === "upcoming") {
            if (tc === "endless") {
                upcomingBoolean = true;
            }
            else {
                let mba = new Date(tc);
                console.log("mba/today ("+mba.getFullYear()+"-"+("0" + (mba.getMonth() + 1)).slice(-2)+"-"+("0" + mba.getDate()).slice(-2)+") must be before or equal to post's date ("+thisNoteValues[0]+") - RESULT: "+(mba <= new Date(thisNoteValues[0])));
                upcomingBoolean = mba <= new Date(thisNoteValues[0]);
            }
        }


        if ((gpg === "today" && thisNoteValues[4] === "visible") || (gpg === "completed" && thisNoteValues[4] === "completed") || (gpg === "upcoming" && thisNoteValues[4] === "visible")) {
            if (gpg==="completed" || thisNoteValues[0] === tc || thisNoteValues[0] === "endless" || upcomingBoolean) {
                console.log("found post for today")
                let unCompleteIcon = "fa-check";
                let unComplete = "Complete";
                if (gpg === "completed") {unComplete = "Uncomplete"; unCompleteIcon = "fa-angle-left";}

                if (thisNoteValues[1] === "todo") {
                    let contentPart = "";
                    for (let it=0;it<thisNoteValues[3].length; it++) {
                        console.log(Object.values(thisNoteValues[3])[it].val);
                        if (Object.values(thisNoteValues[3])[it].val === true) {
                            contentPart += 
                            `<label class="rcontainer" id="todo-${i}-${it}-checkwrap">${Object.values(thisNoteValues[3])[it].label}
                                <input type="checkbox" id="todo-${i}-${it}-checkbox" onclick="updateCheck(${i},${it})" checked="checked">
                                <span class="rcheckmark"></span>
                            </label><br>`;
                        } else {
                            contentPart += 
                            `<label class="rcontainer" id="todo-${i}-${it}-checkwrap">${Object.values(thisNoteValues[3])[it].label}
                                <input type="checkbox" id="todo-${i}-${it}-checkbox" onclick="updateCheck(${i},${it})">
                                <span class="rcheckmark"></span>
                            </label><br>`;
                        }
                    }
                    contentsDiv.innerHTML += `
                    <div class="post post-${thisNoteValues[1]}">
                        <div class="post-ins">
                            <p class="post-info post-${thisNoteValues[1]}-info">${thisNoteValues[0]} | ${thisNoteValues[1]}</p>
                            <p class="post-title post-${thisNoteValues[1]}-title">${thisNoteValues[2]}</p>
                            <p class="post-content post-${thisNoteValues[1]}-content">${contentPart}</p>
                        </div>
                        <div class="post-options">
                            <button id="post-options-complete" class="post-option fa-solid ${unCompleteIcon}" onclick="option${unComplete}(${i})"></button>
                            <br><button id="post-options-edit" class="post-option fa-solid fa-pencil" onclick="optionEdit(${i})"></button>
                            <br><button id="post-options-delete" class="post-option fa-solid fa-trash-can" onclick="optionDelete(${i})"></button>
                        </div>
                    </div>`;
                } else if (thisNoteValues[1] === "note") {
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
                postsLoaded++;
            }
        }
    }
    console.log(postsLoaded);
    if (postsLoaded === 0) {
        contentsDiv.innerHTML += `<p class="noposts">Couldn't find any posts</p>`;
    }
}
this.loadPosts = loadPosts;

function loadApp() { // Originally loadComplete, renamed given its in a way pretty much the app itself.. While yes Electron referred to as a app its more so a desktop layer than even a wrapper. 
    if (!fs.existsSync(dataPath+"/posts.json")) {
        let data2Write = {table: [{"date": "endless","type": "note","title": "Welcome to Foxlmind...","content": "Thank you for using Foxlmind!<br>This was made completely for fun but if you want to support its development, you can <a onclick='openURLInBrowser(`https://patreon.com/foxlldev`)' href='#'>donate here</a>.<br>If not, that's fine, enjoy :)","state": "visible"},{"date": "endless","type": "note","title": "Tribute to Technoblade","content": "https://youtu.be/DPMluEVUqS0","state": "visible"}]};
        fs.writeFile(dataPath+"/posts.json", JSON.stringify(data2Write, null, 2), { flag: 'wx' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }
    console.log(dataPath);
    console.log(storage.getDataPath());
    console.log("loadApp got path "+dataPath);
    loadTheme();
    loadSidebar();
    loadPage(gpg);
    setTimeout(loadSettings,1);
}
this.loadApp = loadApp;

function openURLInBrowser(url) {
    require('electron').shell.openExternal(url);
}
this.openURLInBrowser = openURLInBrowser;