const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearButton = document.getElementById('clear');

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

    // Clicking the x targets the parent button, which is the 
    // button, then the parent of that which is the li item and removes it.
  
function removeItem(e) {
    if (e.target.parentElement.classList.contains
    ('remove-item')) {
        if (confirm('Are you really sure?')) {
            e.target.parentElement.parentElement.remove();
            resetUI();
        }
    }
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
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
    const items = itemList.querySelectorAll('li');
  // Could add css class instead of none or block
    if (items.length === 0) {
      clearButton.style.display = 'none';
      itemFilter.style.display = 'none';
    } else {
      clearButton.style.display = 'block';
      itemFilter.style.display = 'block';
    }
  }

// Initialize App

  // Event Listeners  
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', removeItem);
  clearButton.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

resetUI();

