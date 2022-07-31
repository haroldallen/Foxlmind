function loadTheme() {
    var theme = window.localStorage.getItem('theme');
    if (theme !== 'dark' && theme !== 'light' && theme !== 'myo') {window.localStorage.setItem('theme', 'light');}
    if (theme === 'dark' || theme === 'light' || theme == 'myo') {
        document.body.classList.remove('theme-dark', 'theme-light', 'theme-myo');
        document.body.classList.add(`theme-${theme}`);
    }
    if (theme === 'myo') {
        var sidebarCol = window.localStorage.getItem('myo-sidebarcol');
        var backgroundCol = window.localStorage.getItem('myo-backgroundcol');
        var topbarCol = window.localStorage.getItem('myo-topbarcol');
        var postCol = window.localStorage.getItem('myo-postcol');
        var composeinputCol = window.localStorage.getItem('myo-composeinputcol');
        var textCol = window.localStorage.getItem('myo-textcol');
        var borderCol = window.localStorage.getItem('myo-bordercol');
        document.body.style.setProperty('--sidebar-background', sidebarCol)
        document.body.style.setProperty('--content-background', backgroundCol)
        document.body.style.setProperty('--title-background', topbarCol)
        document.body.style.setProperty('--post-color', postCol)
        document.body.style.setProperty('--compose-bbc', composeinputCol)
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
    var icon = document.getElementById('myo-dropicon');
    var content = document.getElementById('myo-content');
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
    var into_sidebarcol = document.getElementById('settings-themes-myo-sidebarcol');
    var into_backgroundcol = document.getElementById('settings-themes-myo-backgroundcol');
    var into_topbarcol = document.getElementById('settings-themes-myo-topbarcol');
    var into_postcol = document.getElementById('settings-themes-myo-postcol');
    var into_composeinputcol = document.getElementById('settings-themes-myo-composeinputcol');
    var into_textcol = document.getElementById('settings-themes-myo-textcol');
    var into_bordercol = document.getElementById('settings-themes-myo-bordercol');
    
    var val_sidebarcol = window.localStorage.getItem('myo-sidebarcol');
    var val_backgroundcol = window.localStorage.getItem('myo-backgroundcol');
    var val_topbarcol = window.localStorage.getItem('myo-topbarcol');
    var val_postcol = window.localStorage.getItem('myo-postcol');
    var val_composeinputcol = window.localStorage.getItem('myo-composeinputcol');
    var val_textcol = window.localStorage.getItem('myo-textcol');
    var val_bordercol = window.localStorage.getItem('myo-bordercol');

    console.log("sidebarcol got "+val_sidebarcol)
    into_sidebarcol.value = val_sidebarcol;
    console.log("backgroundcol got "+val_backgroundcol)
    into_backgroundcol.value = val_backgroundcol;
    console.log("topbarcol got "+val_topbarcol)
    into_topbarcol.value = val_topbarcol;
    console.log("postcol got "+val_postcol)
    into_postcol.value = val_postcol;
    console.log("composeinputcol got "+val_composeinputcol)
    into_composeinputcol.value = val_composeinputcol;
    console.log("textcol got "+val_textcol)
    into_textcol.value = val_textcol;
    console.log("bordercol got "+val_bordercol)
    into_bordercol.value = val_bordercol;
}
this.loadMYO = loadMYO;

function saveMYO() {
    var into_sidebarcol = document.getElementById('settings-themes-myo-sidebarcol');
    var into_backgroundcol = document.getElementById('settings-themes-myo-backgroundcol');
    var into_topbarcol = document.getElementById('settings-themes-myo-topbarcol');
    var into_postcol = document.getElementById('settings-themes-myo-postcol');
    var into_composeinputcol = document.getElementById('settings-themes-myo-composeinputcol');
    var into_textcol = document.getElementById('settings-themes-myo-textcol');
    var into_bordercol = document.getElementById('settings-themes-myo-bordercol');
    
    window.localStorage.setItem('myo-sidebarcol', into_sidebarcol.value)
    window.localStorage.setItem('myo-backgroundcol', into_backgroundcol.value)
    window.localStorage.setItem('myo-topbarcol', into_topbarcol.value)
    window.localStorage.setItem('myo-postcol', into_postcol.value)
    window.localStorage.setItem('myo-composeinputcol', into_composeinputcol.value)
    window.localStorage.setItem('myo-textcol', into_textcol.value)
    window.localStorage.setItem('myo-bordercol', into_bordercol.value)
}
this.saveMYO = saveMYO;