function moveDate(dir, compose = false) {
    //let page = document.getElementById('top-title-page');
    let page = document.getElementById('top-title-day-text');
    //let date = document.getElementById('top-title-date');
    //let left = document.getElementById('top-title-day-left');
    //let right = document.getElementById('top-title-day-right');
    let cur = page.innerText.toLowerCase();

    console.log(cur);
    console.log(dir);

    let bp = "";
    let ap = "";

    switch(cur) {
        case "today":
            if (dir === 'left') {
                page.innerText = "Past";
                bp = "Before ";
            } else {
                page.innerText = "Upcoming";
                ap = " and later";
            }
            break;
        case "upcoming":
            if (dir === 'left') {
                page.innerText = "Today";
            } else return;
            break;
        case "past":
            if (dir === 'right') {
                page.innerText = "Today";
            } else return;
            break;
    }
    let dt = new Date();
    makeDate(dt, bp, ap);

    document.getElementById('into-tasks').innerHTML = "";
    loadTasksComplete(dt);
}
function loadChecks() {
    let sc = document.getElementById('showCompleted');
    sc.classList.remove('fa-circle');
    console.log(window.localStorage.getItem('showCompleted') === 'true');
    sc.classList.add(window.localStorage.getItem('showCompleted') === 'true' ? 'fa-check-circle' : 'fa-circle');
    if (window.localStorage.getItem('showCompleted') === 'true') sc.parentElement.classList.add('checked');
}
function toggleCheck(id, store=false) {
    let t = document.getElementById(id);
    if (t.parentElement.classList.contains('checked')) {
        t.classList.replace('fa-check-circle', 'fa-circle');
        t.parentElement.classList.remove('checked');
    } else {
        t.classList.replace('fa-circle', 'fa-check-circle');
        t.parentElement.classList.add('checked');
    }

    if (store) {
        window.localStorage.setItem(id, t.parentElement.classList.contains('checked'));
    }
}
function toggleCheckT(id, i, it) {
    let t = document.getElementById(id);
    if (t.parentElement.classList.contains('checked')) {
        t.classList.replace('fa-check-circle', 'fa-circle');
        t.parentElement.classList.remove('checked');
    } else {
        t.classList.replace('fa-circle', 'fa-check-circle');
        t.parentElement.classList.add('checked');
    }

    updateCheck(i, it, t.parentElement.classList.contains('checked'))
}

function popup(name) {
    switch(name) {
        case 'compose':
            let t = document.getElementById('compose-popup');
            let nt = "0";
            let nt2 = "1em";

            if (t.style.top === "100%") { nt = "0"; nt2 = "1em"; }
            else { nt = "100%"; nt2 = "calc(100% + 1em)"; }

            t.style.top = nt;
            t.children[0].style.top = nt;
            t.children[1].style.top = nt;
            t.children[1].children[0].style.top = nt;
            t.children[1].children[0].children[0].style.top = nt2;
            break;
        case 'settings':
            let s = document.getElementById('settings-popup');
            let ns = "0";
            let ns2 = "1em";

            if (s.style.top === "100%") { ns = "0"; ns2 = "1em"; }
            else { ns = "100%"; ns2 = "calc(100% + 1em)"; }

            s.style.top = ns;
            s.children[0].style.top = ns;

            loadThemesManager();

            break;
        case 'absolute':
            let a = document.getElementById('absolute-popup');
            if (a.style.top === "100%") { a.style.top = "0"; }
            else { a.style.top = "100%"; }
            break;
    }
}

let listOfDumbThingaMaJigs = [];
function rightClickThingy(id) {
    let isRightMB;
    let e = window.event;

    if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = e.which == 3; 
    else if ("button" in e)  // IE, Opera 
        isRightMB = e.button == 2; 
    
    let a = document.getElementById(id).children[0];
    listOfDumbThingaMaJigs.push(id);

    setTimeout(function(){if (isRightMB) { a.classList.add('open'); }},150)
}

function aaaaaaa() {
    setTimeout(function(){
        console.log(listOfDumbThingaMaJigs)
        for (let i=0; i<listOfDumbThingaMaJigs.length; i++) {
            // kill me
            let killme = document.getElementById(listOfDumbThingaMaJigs[i]).children[0];
            if (killme.classList.contains('open')) {
                killme.classList.remove('open');
                listOfDumbThingaMaJigs.splice(listOfDumbThingaMaJigs[i], 1);
            }
        }
    }, 140);
}