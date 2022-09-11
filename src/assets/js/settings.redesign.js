const { getCurrentWindow, dialog } = require('@electron/remote');

async function importTasks() {
    let file = await dialog.showOpenDialog(getCurrentWindow(), {
        filters: [
            {
                name: 'Foxlmind post files',
                extensions: ['fpf']
            }
        ]
    });

    if (file !== undefined || file !== null) {
        if (file.filePaths.length === 0) {console.log("error")}
        else {
            let a = file.filePaths[0].split('\\')
            let b = a[a.length-1];
            console.log("file named " + b);

            let rfile = fs.readFileSync(file.filePaths[0]);
            console.log(rfile);
            let pfile = JSON.parse(rfile);
            console.log(pfile);
            let keys = Object.keys(pfile.table);
            let values = Object.values(pfile.table);

            let old = fs.readFileSync(dataPath+'/posts.fpf');
            let pold = JSON.parse(old);
            let told = pold.table;
            let vold = Object.values(told);
            let njson = {"table":[]};

            for (let i = 0; i < told.length; i++) {
                console.log("iteration(2) "+i+", "+vold[i])
                njson.table[i] = vold[i];
            }
            for (let i = 0; i < keys.length; i++) {
                let ni = njson.table.length+i;
                if (i>0) {ni = njson.table.length+i-1};
                console.log("iteration "+i+" / "+ni+", "+keys[ni]+" is "+values[ni])
                njson.table[ni] = values[i];
            }
            fs.writeFile(dataPath+'/posts.fpf', JSON.stringify(njson, null, 2), (err) => {if(err) {throw(err);}});
        }
    } else {
        //document.getElementById('error-content').style.display = block;
        //document.getElementById('error-content').innerHTML = "<strong>Error</strong>: File was null"
    }
}

function confirmResetTasks() {
    document.getElementById('absolute-popup').style.top = "0";
    document.getElementById('absolute-header').innerText = "Are you sure?";
    document.getElementById('absolute-details').innerHTML = "<p style='margin-bottom: 10px'>Resetting your tasks file will permenantly delete all tasks!</p><button class='hvr btn btn-circle btn-accent' onclick='resetTasks()'>Reset</button> <button class='hvr btn btn-circle btn-gray' onclick='popup(`absolute`)'>Cancel</button>";
}

function resetTasks() {
    if (!fs.existsSync(dataPath+"/posts.fpf")) {fixPostsFile(true);}
    else { fixPostsFile(false); }
    reloadPage();
}

function fixThemesDir() {
    fs.mkdirSync(dataPath+"/themes");
}

async function loadThemesManager() {
    document.getElementById('settings-themes').innerHTML = `
        <div class="settings-theme-wrapper"><div class="settings-theme builtin" onclick="selectTheme('night')"><div class="settings-theme-top"><p class="settings-theme-name">Night</p><p class="settings-theme-builtin">Built-in</p></div></div></div>
        <div class="settings-theme-wrapper"><div class="settings-theme builtin" onclick="selectTheme('dark')"><div class="settings-theme-top"><p class="settings-theme-name">Dark</p><p class="settings-theme-builtin">Built-in</p> </div></div></div>
        <div class="settings-theme-wrapper"><div class="settings-theme builtin" onclick="selectTheme('light')"><div class="settings-theme-top"><p class="settings-theme-name">Light</p><p class="settings-theme-builtin">Built-in</p></div></div></div>`;
    
    if (!fs.existsSync(dataPath+"/themes/")) { fixThemesDir(); }
    let themeLocs = [];
    let files = fs.readdirSync(dataPath+"/themes/");
    for (let i=0; i<files.length; i++) {
        let af = fs.readFileSync(dataPath+"/themes/"+files[i]);
        let jf = JSON.parse(af);
        let officialThemeStngs = ['backgroundcol', 'backgroundurl', 'backgroundblur', 'accentcol', 'accenthvrcol', 'secondcol', 'secondhvrcol', 'textcol', 'stextcol', 'linkcol', 'scrollfgcol', 'scrollbgcol'];
        if (jf !== null) {
            let ajf = Array.from(jf);
            let gotall = true;
            for (let ii = 0; ii < ajf.length; ii++) {
                if (!officialThemeStngs.includes(Object.keys(jf)[ii])) { gotall = false; }
            }
            console.log(gotall);
            if (gotall) { themeLocs.push(dataPath+"/themes/"+files[i]); }
            console.log(themeLocs);
        }
    }
    console.log("e")
    for (let i=0; i<themeLocs.length; i++) {
        console.log("e 2");
        try {
            let theme = fs.readFileSync(themeLocs[i]);
            console.log(theme);
            if (theme !== null) {
                let jtheme = JSON.parse(theme);

                if (jtheme !== null) {
                    $('#settings-themes').append(`
                    <div class="settings-theme-wrapper"><div class="settings-theme" onclick="selectTheme('${themeLocs[i]}')">
                        <div class="settings-theme-top">
                            <p class="settings-theme-name">${jtheme.name}</p>
                            <p class="settings-theme-builtin">${jtheme.version} by ${jtheme.author}</p>
                        </div>
                    </div></div>`);
                }
            }
        }
        catch(err){
            console.error(err);
        }
    }
    visualizeSelectedTheme();
}

function selectTheme(loc) {
    window.localStorage.setItem('theme', loc);
    let c = document.getElementById('settings-themes').children;
    visualizeSelectedTheme();
    loadTheme();
}

function visualizeSelectedTheme() {
    let c = document.getElementById('settings-themes').children;
    for (let i=0; i<c.length; i++) {
        c[i].classList.remove('selected');
        if (c[i].children[0].getAttribute('onclick') === `selectTheme('${window.localStorage.getItem('theme')}')`) { c[i].classList.add('selected') }
    }
}

function loadTheme() {
    document.body.classList.remove('night','dark','light');
    document.body.style = "";
    let theme = window.localStorage.getItem('theme');
    console.log(theme);
    if (theme !== "night" && theme !== "dark" && theme !== "light" && theme !== null && theme !== "null") {
        let af = fs.readFileSync(theme.toString());
        let jf = JSON.parse(af);
        let nonStyleVariables = ["name", "author", "version"]
        for (let i = 0; i < Object.keys(jf).length; i++) {
            if (Object.keys(jf)[i] === "backgroundurl" && Object.values(jf)[i] === "") continue;
            if (nonStyleVariables.includes(Object.keys(jf)[i])) continue;
            document.body.style.setProperty(`--${Object.keys(jf)[i]}`, Object.values(jf)[i]);
        }
    }

    if (theme === "night" || theme === "dark" || theme === "light") { document.body.classList.add(theme); }
    if (theme === "null" || theme === null) { window.localStorage.setItem('theme', 'dark'); }
}