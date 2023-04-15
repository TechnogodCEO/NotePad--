const fetchFromChecklistLocalStorage = () => {
  if (localStorage.getItem("checklist") == null) {
    localStorage['checklist'] = JSON.stringify([]);
  } else {
    storedChecklist = JSON.parse(localStorage['checklist']);
    console.log(storedChecklist);
    for (const checkItem of storedChecklist) {
      createCheckItem(checkItem);
    }
  }
}

let checkItemForm = document.getElementById("activeCheckItemForm");

checkItemForm.onsubmit = (event) => {
  event.preventDefault(); // Stops page from reloading when submitting
  let inputField = document.getElementById("activeCheckItem");
  note = createCheckItem(inputField.value);
  saveLocalCheckItems = JSON.parse(localStorage['checklist']);
  saveLocalCheckItems.push(note);
  localStorage['checklist'] = JSON.stringify(saveLocalCheckItems);
}

const createCheckItem = (text) => {
  if (typeof text !== "string") {
    return false;
  }
  if (text.trim() === "") {
    alert("please put some text in ur note");
    return false;
  }
  console.log("clicked");
  let checkItem = document.createElement("div");
  let checkbox = document.createElement("input");
  let checkContent = document.createElement("span");
  checkbox.type = "checkbox";
  checkContent.innerHTML = text;
  checkItem.appendChild(checkbox);
  checkItem.appendChild(checkContent);
  
  let checklist = document.getElementById("checklist");
  checklist.appendChild(checkItem);
  return text;
}

const checklistMain = () => {
  fetchFromChecklistLocalStorage();
}

checklistMain();