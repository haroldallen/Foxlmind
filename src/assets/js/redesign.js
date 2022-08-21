function moveDate(dir, compose = false) {
    //let page = document.getElementById('top-title-page');
    let page = document.getElementById('top-title-day-text');
    let date = document.getElementById('top-title-date');
    let left = document.getElementById('top-title-day-left');
    let right = document.getElementById('top-title-day-right');
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

function composeSwitchTab(tabName) {
    let t = document.getElementById(`compose-popup-input-${tabName}`)
    let tab = document.getElementById(`compose-popup-input-tab-${tabName}`)

    for (let i = 0; i < tab.parentElement.children.length; i++) { tab.parentElement.children[i].classList.remove('open'); }
    tab.classList.add('open');

    for (let i = 0; i < tab.parentElement.parentElement.children[1].children[0].children.length; i++) { tab.parentElement.parentElement.children[1].children[0].children[i].style.display = "none"; }
    t.style.display = "block";
}

function composeTodoKeydown() {
    setTimeout(function () {
        let pointse = document.getElementById('compose-popup-content-points');
        let points = pointse.children;
        if (points[points.length - 1].children[1].value.length > 0) {
            $(`#${pointse.id}`).append(
                `<div class="compose-popup-content-point" id="compose-popup-content-point-${points.length}">
                <i onclick="toggleCheck('compose-point-${points.length}')" id="compose-point-${points.length}" class="hvr fa-solid fa-circle" style="margin-right: 5px;"></i>
                <input placeholder="Add another point..." onkeydown="composeTodoKeydown(event)" class="compose-popup-content-point-label" id="compose-popup-content-point-0-label" type="text">
            </div>`);
        }
        for (var i = 0; i < points.length; i++) {
            if (points[i].children[1].value.length === 0 && i !== 0 && i !== points.length - 1) pointse.removeChild(points[i]);
            if (i === points.length - 1) points[i].classList.add('notcontaining')
            else points[i].classList.remove('notcontaining')
        }
    }, 1);
}