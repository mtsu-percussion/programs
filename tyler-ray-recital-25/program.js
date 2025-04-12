addTouchListeners();

function addTouchListeners() {
    let items = document.getElementsByClassName("program-item");

    for (let i = 0; i < items.length; i++) {
        addTouch(items[i].id);
    }
}
function addTouch(id) {
    let element = document.getElementById(id);

    element.addEventListener("click", function() {
        toggle(id);
    })
}

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