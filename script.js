const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearButton = document.getElementById('clear');
const formButton = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromLocalStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item));
  resetUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

    const newItem = itemInput.value;
    // Validate Input
    if (newItem === '') {
     alert('Item cannot be empty');
     return;
    }

    // Check for edit mode
    if (isEditMode) {
      const itemToEdit = itemList.querySelector('.edit-mode');
  
      removeItemFromStorage(itemToEdit.textContent);
      itemToEdit.classList.remove('edit-mode');
      itemToEdit.remove();
      isEditMode = false;
    } else {
      if (checkIfItemExists(newItem)) {
        alert('This item already exists');
        return;
      }
    }
    addItemToDOM(newItem);
    // Add Item to localStorage
    addItemToLocalStorage(newItem);
    resetUI();
    itemInput.value = '';
  }

function addItemToDOM(item) {
    // Create List Item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    
    // Add li to the DOM
    itemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes; 
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

// Create Icon inside of button
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToLocalStorage(item) {

  // Simply call getItemsFromLocalStorage on line 65 to make code DRY
  const itemsFromStorage = getItemsFromLocalStorage();
  itemsFromStorage.push(item);
  // Convert to JSON string and set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromLocalStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains
    ('remove-item')) {
      removeItem(e.target.parentElement.parentElement);
    } else {
      setItemToEdit(e.target)
    }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromLocalStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
  .querySelectorAll('li')
  .forEach((i) => i.classList.remove('edit-mode'));
'/'
  item.classList.add('edit-mode');
  formButton.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formButton.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

    // Clicking the x targets the parent button, which is the 
    // button, then the parent of that which is the li item and removes it.
  
function removeItem(item) {
   if (confirm('Are you sure?')) {
    // Remove item form DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);
    resetUI();
   }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromLocalStorage();

  // Filter item to be removed

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Reset to local storage

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // Clear From local storage
    localStorage.removeItem('items');
    resetUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach(item => {
    // firstChild because the text is the first thing inside the li
    const itemName = item.firstChild.textContent.toLowerCase();

    // indexOf will check for matches in text. If there are any 
    // matches, it will return true. If not, it will return -1
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none';
    }
  });
}

function resetUI() {
  itemInput.value = '';
    const items = itemList.querySelectorAll('li');
  // Could add css class instead of none or block
    if (items.length === 0) {
      clearButton.style.display = 'none';
      itemFilter.style.display = 'none';
    } else {
      clearButton.style.display = 'block';
      itemFilter.style.display = 'block';
    }
    formButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formButton.style.backgroundColor = '#333';
  
    isEditMode = false;
  }

// Initialize App

  // Event Listeners  
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearButton.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

resetUI();
