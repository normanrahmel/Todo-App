let titles = [];
let notes = [];

let trashTitles = [];
let trashNotes = [];
load();


function render() {


    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const note = notes[i];
        notesContainer.innerHTML += /*html*/ `
        
        <div class="card">
            <b><h3>${title}</h3></b>

            <div class="input-group mb-3">

                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input">
                </div>
                
                <textarea type="text" class="form-control" aria-label="Text input with checkbox" rows="3">${note}</textarea>
            </div>


            <button onclick="deleteContact(${i})" type="button" class="btn btn-secondary">Notiz Löschen</button>
        </div>
    
        `;
    }


}


function addNotes() {

    let title = document.getElementById('title');
    let note = document.getElementById('note');
    titles.push(title.value);
    notes.push(note.value);
    render();
    save();

}


function deleteContact(i) {
    trashTitles.push(titles[i]);
    trashNotes.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    save();

}


function renderTrash() {
    let ContainerTrash = document.getElementById("ContainerTrash");
    ContainerTrash.innerHTML = '';

    for (let i = 0; i < trashTitles.length; i++) {
        const title = trashTitles[i];
        const note = trashNotes[i];
        ContainerTrash.innerHTML += /*html*/ `
        
        <div class="card">
            <b><h3>${title}</h3></b>

            <div class="input-group mb-3">

                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input">
                </div>
                
                <textarea type="text" class="form-control" aria-label="Text input with checkbox" rows="3">${note}</textarea>
            </div>

        </div>
    
        `;
    }


}


//localStorage. Hier werden die Arrays im Local Storage gespeichert
function save() {
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);
    //Trash
    let trashTitlesAsText = JSON.stringify(trashTitles);
    //JSON.stringify wandelt ein Array in Text um
    let trashNotesAsText = JSON.stringify(trashNotes);

    localStorage.setItem('notes', notesAsText);
    //mit setItem lädt man eine Variable in den localStorage 
    localStorage.setItem('titles', titlesAsText);
    //Trash
    localStorage.setItem('trashTitles', trashTitlesAsText);
    localStorage.setItem('trashNotes', trashNotesAsText);
}

//Variablen laden. Wenn das Programm neu gestartet wird dann werden die Arrays aus dem localStorage geladen.
function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    //Trash
    let trashTitlesAsText = localStorage.getItem('trashTitles'); //mit getItem lädt man eine Variable aus dem localStorage 
    let trashNotesAsText = localStorage.getItem('trashNotes');

    if (titlesAsText && notesAsText && trashTitlesAsText && trashNotesAsText) {
        //Diese if Abfrage testet ob die Arrays "titlesAsText" usw. existieren. Nur wenn das Existiert dann wird der Code
        titles = JSON.parse(titlesAsText);
        //JSON.parse wandelt Text in ein Array um
        notes = JSON.parse(notesAsText);
        trashTitles = JSON.parse(trashTitlesAsText);
        trashNotes = JSON.parse(trashNotesAsText);
    }
}

//