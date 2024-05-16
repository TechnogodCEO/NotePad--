const folderscript = require("folderscript");

my_notesFolder = folderscript.createFolder("my notes");
saveLocalFolders = JSON.parse(localStorage['folders']);
saveLocalFolders.push({
        name: "my notes",
        notes: []
      });
localStorage['folders'] = JSON.stringify(saveLocalFolders);

/** 
  * fetches saved notes from storage, saves them to notelist. if no saved notes in localstorage, creates localstorage key
*/
const fetchFromLocalStorage = () => {
  if (localStorage.getItem("folders") == null) {
    localStorage['folders'] = JSON.stringify([]);
    console.log(localStorage['folders'])
  } else {
    // Fetch array from local storage
    // For each string in the array:
    //   - Create new dom element and append it to notes list
    // Make creation of a note element into a function
    storednotes = JSON.parse(localStorage['folders']);
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

  // check the selected folder
  let folderSelect = document.getElementById("selectFolder");
  console.log(folderSelect.options.length)
  let selectedFolder = folderSelect.options[folderSelect.selectedIndex].text;


  // create the note in the folder  
  if (selectedFolder) { // puts in specific folder
    let note = document.createElement("li");
    note.innerHTML = text;
    let folderList = JSON.parse(localStorage['folders'])
    // console.log(folderList[0].notes);  gets content from notes use in future
    if (selectedFolder !== "my notes"){
      counter = 0 
      for (let i in folderList){
        if (selectedFolder == i.toString()){
           let sFL = document.getElementById("i")
           sFL.appendChild(note); 
        }
        counter++
      }
    } else {
      let sFL = document.getElementById("notelist")
      sFL.appendChild(note);
    } 
    // for i in range()
    const newlist = folderList.map((folder) => {
      if (folder.name == selectedFolder) {
        folder.notes.push(text);
      }
      return folder;
    })
    localStorage['folders'] = JSON.stringify(newlist);
    // TODO: give the folder element (li) an id
    // Find the list of notes for the selected folder in the DOM
    // Append the note as a child to that list
    return note;
  } else { //puts in main list
    let note = document.createElement("li");
    note.innerHTML = text;
    let notelist = document.getElementById("notelist");
    notelist.appendChild(note);
    return note;
  }
}

let noteform = document.getElementById("activeNoteForm");
/**
 * when note form is submitted, creates a new note and saves it to cache(localstorage)
 */
noteform.onsubmit = (event) => {
  let inputField = document.getElementById("activeNote");
  event.preventDefault(); // Stops page from reloading when submitting
  note = createNote(inputField.value);
  if (inputField.value.trim() !== "") {
    saveLocalNotes = JSON.parse(localStorage['folders']);
    saveLocalNotes.push(note.innerHTML);
    localStorage['folders'] = JSON.stringify(saveLocalNotes);
  }
}

const noteScriptMain = () => {
  fetchFromLocalStorage();
}

noteScriptMain();