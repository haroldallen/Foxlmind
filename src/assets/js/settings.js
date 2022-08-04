const { getCurrentWindow, dialog } = require('@electron/remote');

function loadTheme() {
    let theme = window.localStorage.getItem('theme');
    if (theme !== 'dark' && theme !== 'light' && theme !== 'myo') {window.localStorage.setItem('theme', 'light');}
    if (theme === 'dark' || theme === 'light' || theme == 'myo') {
        document.body.classList.remove('theme-dark', 'theme-light', 'theme-myo');
        document.body.classList.add(`theme-${theme}`);
    }
    if (theme === 'myo') {
        let d = {'sidebarcol': 'sidebar-background',
            'backgroundcol': 'content-background',
            'topbarcol': 'title-background',
            'postcol': 'post-color',
            'inputcol': 'input-background',
            'textcol': 'content-textcolor',
            'bordercol': 'border-color'};

        for (let i = 0; i < Object.keys(d).length; i++) {
            //console.log("property: "+Object.values(d)[i]);
            //console.log("new value: "+Object.keys(d)[i]);
            document.body.style.setProperty(`--${Object.values(d)[i]}`, window.localStorage.getItem(`myo-${Object.keys(d)[i]}`))
        }
    } else {
        document.body.removeAttribute('style');
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
        setTimeout(function() {
            document.getElementById(`settings-themes-${window.localStorage.getItem('theme')}`).checked = true;
            loadMYO
        }, 1);
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
    let options = document.getElementById('myo-options').children;
    for (let i = 0; i < options.length; i++) {
        let name = options[i].children[0].id.replace('settings-themes-myo-', '');
        options[i].children[0].value = window.localStorage.getItem('myo-'+name);
    }
}
this.loadMYO = loadMYO;

function saveMYO() {
    let options = document.getElementById('myo-options').children;
    for (let i = 0; i < options.length; i++) {
        let name = options[i].children[0].id.replace('settings-themes-myo-', '');
        window.localStorage.setItem('myo-'+name, options[i].children[0].value);
    }
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