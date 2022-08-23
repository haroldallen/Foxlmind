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

function toggleCheck(id) {
    let t = document.getElementById(id);
    if (t.parentElement.classList.contains('checked')) {
        t.classList.replace('fa-check-circle', 'fa-circle');
        t.parentElement.classList.remove('checked');
    } else {
        t.classList.replace('fa-circle', 'fa-check-circle');
        t.parentElement.classList.add('checked');
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
    }
}