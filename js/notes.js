// при загрузке страницы взять заметки из локального хранилища
const addNote = (noteText = "") => {
    const notesDom = document.querySelector(".notes");

    const liDom = document.createElement("li");
    liDom.classList.add("note");

    const textAreaDom = document.createElement("textarea");
    textAreaDom.rows = 3;

    textAreaDom.innerHTML = noteText.trim();

    textAreaDom.classList.add("note__text");

    notesDom.appendChild(liDom);
    liDom.appendChild(textAreaDom);

    autofit(textAreaDom);
    //todo запомнить размеры заметки
}

let arrNotes;

const viewNotes = () => {

    (localStorage.getItem("notes")) ? arrNotes = JSON.parse(localStorage.getItem("notes")): arrNotes = [];

    for (let note of arrNotes) {
        addNote(note);
    }
    addNote();
}



document.addEventListener("change", (e) => {

    // при изменении добавляем заметку
    // если стала пустая, то удаляем
    const index = [...document.querySelector(".notes").children].indexOf(e.target.parentElement);
    if (e.target.value.trim() == "") {


        if (document.querySelectorAll(".note").length > 1) {

            arrNotes.splice(index, 1);
            e.target.parentElement.remove();
        }
    } else {

        // поменять значение в массиве

        (index > arrNotes.length) ? arrNotes.push(e.target.value): arrNotes[index] = e.target.value;

        // проверить есть ли последний пустой элемент
        if (document.querySelector(".note:last-child .note__text").value) {
            addNote();
        }

    }

    localStorage.setItem("notes", JSON.stringify(arrNotes));
});

const autofit = (elem) => {
    const heightScroll = elem.scrollHeight;
    let width = elem.clientWidth;
    let height = elem.clientHeight;
    if (heightScroll > height) {
        if (heightScroll > width * 2) {
            elem.style.width = width * 2 + "px";
            elem.style.height = heightScroll / 2 + "px";
        } else {
            elem.style.height = heightScroll + "px";

        }
    }



}


document.addEventListener("input", (e) => {
    // автоматически менять размер элемента

    if (e.target.tagName.toLowerCase() == "textarea") {

        autofit(e.target);

    }
});



document.addEventListener("DOMContentLoaded", viewNotes);