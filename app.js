let timeline = [];

const objNote = {
    id: '',
    title: '',
    text: ''
}

let editing = false;

const form = document.querySelector('#form');
const titleInput = document.querySelector('#title');
const textInput = document.querySelector('#text');
const btnAddInput = document.querySelector('#btnAdd');

form.addEventListener('submit', checkForm);

function checkForm(e) {
    e.preventDefault();

    if(titleInput.value === '' || textInput.value === '') {
        alert('All fields are required.');
        return;
    }

    if(editing) {
        editNote();
        editing = false;
    } else {
        objNote.id = Date.now();
        objNote.title = titleInput.value;
        objNote.text = textInput.value;

        addNote();
    }
}

function addNote() {

    timeline.push({...objNote});

    showNotes();

    form.reset();
    cleanObject();
}

function cleanObject() {
    objNote.id = '';
    objNote.title = '';
    objNote.text = '';
}

function showNotes() {
    cleanHTML();

    const divNotes = document.querySelector('.div-notes');
    
    timeline.forEach(note => {
        const {id, title, text} = note;

        const paragraph = document.createElement('p');
        paragraph.textContent = `${id} - ${title} - ${text} - `;
        paragraph.dataset.id = id;

        const editBtn = document.createElement('button');
        editBtn.onclick = () => loadNote(note);
        editBtn.textContent = 'Edit';
        editBtn.classList.add('btn', 'btn-edit');
        paragraph.append(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.onclick = () => deleteNote(id);
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn', 'btn-delete');
        paragraph.append(deleteBtn);

        const hr = document.createElement('hr');

        divNotes.appendChild(paragraph);
        divNotes.appendChild(hr);
    });
}

function loadNote(note) {
    const {id, title, text} = note;

    titleInput.value = title;
    textInput.value = text;

    objNote.id = id;

    form.querySelector('button[type="submit"]').textContent = 'Update';
    
    editing = true;
}

function editNote() {

    objNote.title = titleInput.value;
    objNote.text = textInput.value;

    timeline.map(note => {

        if(note.id === objNote.id) {
            note.id = objNote.id;
            note.title = objNote.title;
            note.text = objNote.text;

        }

    });

    cleanHTML();
    showNotes();
    form.reset();

    form.querySelector('button[type="submit"]').textContent = 'Add';
    
    editing = false;
}

function deleteNote(id) {

    timeline = timeline.filter(note => note.id !== id);

    cleanHTML();
    showNotes();
}

function cleanHTML() {
    const divNotes = document.querySelector('.div-notes');
    while(divNotes.firstChild) {
        divNotes.removeChild(divNotes.firstChild);
    }
}