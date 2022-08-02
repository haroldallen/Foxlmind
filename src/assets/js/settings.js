const { getCurrentWindow, dialog } = require('@electron/remote');

function loadTheme() {
    let theme = window.localStorage.getItem('theme');
    if (theme !== 'dark' && theme !== 'light' && theme !== 'myo') {window.localStorage.setItem('theme', 'light');}
    if (theme === 'dark' || theme === 'light' || theme == 'myo') {
        document.body.classList.remove('theme-dark', 'theme-light', 'theme-myo');
        document.body.classList.add(`theme-${theme}`);
    }
    if (theme === 'myo') {
        let sidebarCol = window.localStorage.getItem('myo-sidebarcol');
        let backgroundCol = window.localStorage.getItem('myo-backgroundcol');
        let topbarCol = window.localStorage.getItem('myo-topbarcol');
        let postCol = window.localStorage.getItem('myo-postcol');
        let inputCol = window.localStorage.getItem('myo-inputcol');
        let textCol = window.localStorage.getItem('myo-textcol');
        let borderCol = window.localStorage.getItem('myo-bordercol');
        document.body.style.setProperty('--sidebar-background', sidebarCol)
        document.body.style.setProperty('--content-background', backgroundCol)
        document.body.style.setProperty('--title-background', topbarCol)
        document.body.style.setProperty('--post-color', postCol)
        document.body.style.setProperty('--input-background', inputCol)
        document.body.style.setProperty('--content-textcolor', textCol)
        document.body.style.setProperty('--border-color', borderCol)
    } else {
        document.body.removeAttribute('style');
    }
    if (gpg === 'settings') {
        setTimeout(loadMYO, 1);
    }
}
this.loadTheme = loadTheme;
function setTheme(theme) {
    if (theme === 'dark' || theme === 'light' || theme === 'myo') {
        window.localStorage.setItem('theme', theme);
        loadTheme();
        return window.localStorage.getItem('theme');
    } else {
        console.log("error");
        return null;
    }
}
this.setTheme = setTheme;

function loadSettings() {
    if (gpg === "settings") {
        document.getElementById(`settings-themes-${window.localStorage.getItem('theme')}`).checked = true;
    }
}
this.loadSettings = loadSettings;
function saveSettings() {
    if (gpg === "settings") {
        // Themes
        if (document.getElementById(`settings-themes-dark`).checked === true) {
            setTheme('dark');
        } else if (document.getElementById(`settings-themes-light`).checked === true) {
            setTheme('light');
        } else if (document.getElementById(`settings-themes-myo`).checked === true) {
            setTheme('myo');
        } else {
            console.log('Error!');
            setTheme('light');
        }
        saveMYO();
        loadTheme();
    }
}
this.saveSettings = saveSettings;

function dropdownMYO() {
    let icon = document.getElementById('myo-dropicon');
    let content = document.getElementById('myo-content');
    if (icon.classList.contains('fa-caret-right')) {
        icon.classList.replace('fa-caret-right', 'fa-caret-down')
        content.style.display = "block";
        loadMYO();
    } else {
        icon.classList.replace('fa-caret-down', 'fa-caret-right')
        content.style.display = "none";
    }
}
this.dropdownMYO = dropdownMYO;

function loadMYO() {
    let into_sidebarcol = document.getElementById('settings-themes-myo-sidebarcol');
    let into_backgroundcol = document.getElementById('settings-themes-myo-backgroundcol');
    let into_topbarcol = document.getElementById('settings-themes-myo-topbarcol');
    let into_postcol = document.getElementById('settings-themes-myo-postcol');
    let into_inputcol = document.getElementById('settings-themes-myo-inputcol');
    let into_textcol = document.getElementById('settings-themes-myo-textcol');
    let into_bordercol = document.getElementById('settings-themes-myo-bordercol');
    
    let val_sidebarcol = window.localStorage.getItem('myo-sidebarcol');
    let val_backgroundcol = window.localStorage.getItem('myo-backgroundcol');
    let val_topbarcol = window.localStorage.getItem('myo-topbarcol');
    let val_postcol = window.localStorage.getItem('myo-postcol');
    let val_inputcol = window.localStorage.getItem('myo-inputcol');
    let val_textcol = window.localStorage.getItem('myo-textcol');
    let val_bordercol = window.localStorage.getItem('myo-bordercol');

    console.log("sidebarcol got "+val_sidebarcol)
    into_sidebarcol.value = val_sidebarcol;
    console.log("backgroundcol got "+val_backgroundcol)
    into_backgroundcol.value = val_backgroundcol;
    console.log("topbarcol got "+val_topbarcol)
    into_topbarcol.value = val_topbarcol;
    console.log("postcol got "+val_postcol)
    into_postcol.value = val_postcol;
    console.log("inputcol got "+val_inputcol)
    into_inputcol.value = val_inputcol;
    console.log("textcol got "+val_textcol)
    into_textcol.value = val_textcol;
    console.log("bordercol got "+val_bordercol)
    into_bordercol.value = val_bordercol;
}
this.loadMYO = loadMYO;

function saveMYO() {
    let into_sidebarcol = document.getElementById('settings-themes-myo-sidebarcol');
    let into_backgroundcol = document.getElementById('settings-themes-myo-backgroundcol');
    let into_topbarcol = document.getElementById('settings-themes-myo-topbarcol');
    let into_postcol = document.getElementById('settings-themes-myo-postcol');
    let into_inputcol = document.getElementById('settings-themes-myo-inputcol');
    let into_textcol = document.getElementById('settings-themes-myo-textcol');
    let into_bordercol = document.getElementById('settings-themes-myo-bordercol');
    
    window.localStorage.setItem('myo-sidebarcol', into_sidebarcol.value)
    window.localStorage.setItem('myo-backgroundcol', into_backgroundcol.value)
    window.localStorage.setItem('myo-topbarcol', into_topbarcol.value)
    window.localStorage.setItem('myo-postcol', into_postcol.value)
    window.localStorage.setItem('myo-inputcol', into_inputcol.value)
    window.localStorage.setItem('myo-textcol', into_textcol.value)
    window.localStorage.setItem('myo-bordercol', into_bordercol.value)
}
this.saveMYO = saveMYO;

async function importMYO() {
    let file = await dialog.showOpenDialog(getCurrentWindow(), {
        filters: [
            {
                name: 'Foxlmind theme files',
                extensions: ['ftf']
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
            let keys = Object.keys(pfile);
            let values = Object.values(pfile);

            for (let i = 0; i < keys.length; i++) {
                console.log("iteration "+i+", "+keys[i]+" is "+values[i])
                window.localStorage.setItem(`myo-${keys[i]}`, values[i]);
            }
            loadMYO();
        }
    } else {
        document.getElementById('error-content').style.display = block;
        document.getElementById('error-content').innerHTML = "<strong>Error</strong>: File was null"
    }
}
this.importMYO = importMYO;

async function importPosts() {
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
        document.getElementById('error-content').style.display = block;
        document.getElementById('error-content').innerHTML = "<strong>Error</strong>: File was null"
    }
}
this.importPosts = importPosts;