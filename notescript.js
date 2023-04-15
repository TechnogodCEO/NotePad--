/** 
  * fetches saved notes from storage, saves them to notelist. if no saved notes in localstorage, creates localstorage key
*/
const fetchFromLocalStorage = () => {
  if (localStorage.getItem("notes") == null) {
    localStorage['notes'] = JSON.stringify([]);
  } else {
    // Fetch array from local storage
    // For each string in the array:
    //   - Create new dom element and append it to notes list
    // Make creation of a note element into a function
    storednotes = JSON.parse(localStorage['notes']);
    console.log(storednotes);
    for (const note of storednotes) {
      createNote(note);
    }
  }
}

/**
 * Creates a new note element in the DOM.
 */
const createNote = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  if (text.trim() === "") {
    alert("please put some text in ur note");
    return false;
  }
  // console.log("clicked");
  let note = document.createElement("li");
  note.innerHTML = text;
  console.log(note);
  let notelist = document.getElementById("notelist");
  notelist.appendChild(note);
  return note;
}

let noteform = document.getElementById("activeNoteForm");
/**
 * when note form is submitted, creates a new note and saves it to cache(localstorage)
 */
noteform.onsubmit = (event) => {
  let inputField = document.getElementById("activeNote");
  event.preventDefault(); // Stops page from reloading when submitting
  note = createNote(inputField.value);
  saveLocalNotes = JSON.parse(localStorage['notes']);
  saveLocalNotes.push(note.innerHTML);
  localStorage['notes'] = JSON.stringify(saveLocalNotes);
}

const noteScriptMain = () => {
  fetchFromLocalStorage();
}

noteScriptMain();