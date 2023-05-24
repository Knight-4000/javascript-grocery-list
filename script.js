const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearButton = document.getElementById('clear');

function addItem(e) {
  e.preventDefault();

    const newItem = itemInput.value;
    // Validate Input
    if (newItem === '') {
     alert('Item cannot be empty');
     return;
    }
    // Create List Item
const li = document.createElement('li');
li.appendChild(document.createTextNode(newItem));

const button = createButton('remove-item btn-link text-red');
li.appendChild(button);

// Add li to the DOM
itemList.appendChild(li);

resetUI();
itemInput.value = '';
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

// Event Listeners

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);

resetUI();