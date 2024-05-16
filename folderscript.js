fetchFromFolderLocalStorage = () => {
  if (localStorage.getItem("folders") == null) {
    localStorage['folders'] = JSON.stringify([]);
  } else {
    storedFolders = JSON.parse(localStorage['folders']);
    console.log(storedFolders);
    let i = 0;
    for (const folder of storedFolders) {
      createFolder(folder.name);
      i++
    }
  }
}

const createFolder = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  if (text.trim() === "") {
    alert("please put some text in ur folder name");
    return false;
  }
  // Create folder element
  let folder = document.createElement("li");
  let folderlist = document.getElementById("folderlist");
  folderlist.appendChild(folder);
  let folderButton = document.createElement("button");
  let folderNotelist = document.createElement("ul");
  folderButton.className = "folderButton button";
  folderNotelist.className = "folderNotes";
  folderButton.innerHTML = text;
  folder.value = text;
  folderNotelist.id = text;
  folder.appendChild(folderButton);
  folder.appendChild(folderNotelist);

  // Create the option in select list
  let selectFolder = document.getElementById("selectFolder");
  let folderOption = document.createElement("option");
  folderOption.innerHTML = text;
  folderOption.value = text;
  selectFolder.appendChild(folderOption);
  return folder;

}

let folderform = document.getElementById("activeFolderForm");

folderform.onsubmit = (event) => {
  let inputField = document.getElementById("activeFolder");
  for (const folder of JSON.parse(localStorage['folders'])){
    if (folder.name == inputField.value.trim()){
      alert("You cannot have folders with the same name")
      return false; 
    }
  }
  event.preventDefault(); // Stops page from reloading when submitting
  folder = createFolder(inputField.value);
  if (inputField.value.trim() !== "" && folder !==false) {
    saveLocalFolders = JSON.parse(localStorage['folders']);
    saveLocalFolders.push(
      {
        name: inputField.value,
        notes: []
      }
    );
    localStorage['folders'] = JSON.stringify(saveLocalFolders);
  }
/*
   * {
   *   name: "Name of Folder",
   *   notes: ["Note 1", "Note 2"]
   * }
*/
  // saveLocalNotes = JSON.parse(localStorage['folders']);
  // saveLocalNotes.push(note.innerHTML);
  // localStorage['folders'] = JSON.stringify(saveLocalNotes);
}

const folderScriptMain = () => {
  fetchFromFolderLocalStorage();
}

folderScriptMain();

module.exports = {
  createFolder
}