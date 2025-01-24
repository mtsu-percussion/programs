function toggle(id) {
    let item = document.getElementById(id);

    if (item.classList.contains('item-open')) {
        conceal(id);
    } else {
        reveal(id);
    }
}
function reveal(id) {
    let item = document.getElementById(id);

    if (item.classList.contains('item-open')) {
        return;
    }

    let programNotes = item.getElementsByClassName("program-notes")[0];
    let container = programNotes.getElementsByClassName("note-container")[0];
    let height = container.offsetHeight;

    for (i = 0; i < container.children.length; i++) {
        let child = container.children.item(i);
        if (child.classList.contains('separator')) {
            height += child.offsetHeight;
            let style = getComputedStyle(child);
            let verticalMargin = parseInt(style.marginTop);
            height += verticalMargin;
        }
    }

    programNotes.style.height = (height + "px");
    item.classList.add('item-open');
}
function conceal(id) {
    let item = document.getElementById(id);

    if (item.classList.contains('item-open') == false) {
        return;
    }

    let programNotes = item.getElementsByClassName("program-notes")[0];

    programNotes.style.height = "0px";
    item.classList.remove('item-open');
}
function secret(id) {
    const hour = 8;
    const min = 45;
    const meridiem = "pm"

    let now = new Date();
    let mHour = hour;

    if (meridiem === "pm" && hour < 12) {
        mHour += 12;
    } else if (meridiem === "am" && hour === 12) {
        mHour = 0;
    }

    let sameHourTrigger = now.getHours() === mHour && now.getMinutes() >= min;
    let nextHourTrigger = now.getHours() > mHour;

    if (sameHourTrigger || nextHourTrigger) {
        conceal(id);
        updateTitle(id, "I - IV the Davilas");
        flashItem(id); 
    } else {
        toggle(id);
    }
}

function updateTitle(id, newName) {
    let item = document.getElementById(id);
    let piece = item.getElementsByClassName("title")[0];
    piece.textContent = newName;
}
function flashItem(id) {
    let item = document.getElementById(id);
    if (item.classList.contains("flash-item")) {
        return;
    }

    item.classList.add("flash-item");
}

function addTouchListeners() {
    let items = document.getElementsByClassName("program-item");

    for (let i = 0; i < items.length; i++) {
        addTouch(items[i].id);
    }
}

function addTouch(id) {
    let element = document.getElementById(id);

    element.addEventListener("click", function() {
        if (element.classList.contains("secret")) {
            secret(id);
        } else {
            toggle(id);
        }
    })
}

addTouchListeners();