function loadTheme() {
    if (window.localStorage.getItem('theme') === 'dark' || window.localStorage.getItem('theme') === 'light') {
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add(`theme-${window.localStorage.getItem('theme')}`);
    }
}
this.loadTheme = loadTheme;
function setTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
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
        } else {
            console.log('Error!');
            setTheme('light');
        }
        loadTheme();


    }
}
this.saveSettings = saveSettings;