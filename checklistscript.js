const fetchFromChecklistLocalStorage = () => {
  if (localStorage.getItem("checklist") == null) {
    localStorage['checklist'] = JSON.stringify([]);
  } else {
    storedChecklist = JSON.parse(localStorage['checklist']);
    console.log(storedChecklist);
    let i = 0;
    for (const checkItem of storedChecklist) {
      createCheckItem(checkItem.note, checkItem.checked, i);
      i++
    }
  }
}

let checkItemForm = document.getElementById("activeCheckItemForm");

checkItemForm.onsubmit = (event) => {
  event.preventDefault(); // Stops page from reloading when submitting
  let inputField = document.getElementById("activeCheckItem");
  saveLocalCheckItems = JSON.parse(localStorage['checklist']);

  localLength = saveLocalCheckItems.length 
  
  note = createCheckItem(inputField.value, false, localLength);
  if (inputField.value.trim() !== "") {
    saveLocalCheckItems.push({ note: note, checked: false });
    localStorage['checklist'] =       
    JSON.stringify(saveLocalCheckItems);
  }
}

const createCheckItem = (text, checked, index) => {
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
  checkbox.id = index; 
  checkbox.checked = checked;
  checkbox.onchange = handleCheckmark; // Add on change listener to checkbox
  let checkContent = document.createElement("span");
  checkbox.type = "checkbox";
  checkContent.innerHTML = text;
  checkItem.appendChild(checkbox);
  checkItem.appendChild(checkContent);

  let checklist = document.getElementById("checklist");
  checklist.appendChild(checkItem);
  return text;
}

const handleCheckmark = (event) => {
  // Get items from local storage
  saveLocalCheckItems = JSON.parse(localStorage['checklist']);
  let checkbox = event.currentTarget; // Get the checkbox element
  let checkboxID = checkbox.id // Get the index of the item
  let checkboxStatus = checkbox.checked // Get the new checked status of the checkbox

  // Update the object in localstorage with the new checked status
  let checkboxObject = saveLocalCheckItems[checkboxID]
  checkboxObject.checked = checkboxStatus
  saveLocalCheckItems[checkboxID] = checkboxObject; // Replace the old object with the new one
  localStorage['checklist'] = JSON.stringify(saveLocalCheckItems) // Save to LS
}

const checklistMain = () => {
  fetchFromChecklistLocalStorage();
}



checklistMain();