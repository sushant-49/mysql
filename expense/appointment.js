var form = document.getElementById('my-form');
var itemList = document.getElementById('items');
var msg = document.querySelector('.msg');

// Form submit event
form.addEventListener('submit', addItem);

// Load items from localStorage when the page loads
//document.addEventListener('DOMContentLoaded', loadItems);

// Add item
function addItem(e) {
  e.preventDefault();
  var newItem = document.getElementById('name').value;
  var newItemm = document.getElementById('email').value;
  var newItemmm = document.getElementById('number').value;

  if (newItem === '' || newItemm === '' || newItemmm === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please add all fields';
    setTimeout(function () {
      msg.innerHTML = '';
      msg.classList.remove('error');
    }, 1000);
  } else {
    // Create new li element
    var li = document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    // Add text node with input value
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(document.createTextNode(' ' + newItemm));
    li.appendChild(document.createTextNode(' ' + newItemmm));

    // Create del button element
    var deleteBtn = document.createElement('button');
    var deleteBtnn = document.createElement('button');

    // Add classes to del button
    deleteBtn.className = 'btn btn-danger btn-xsm float-right delete';
    deleteBtnn.className = 'btn btn-default btn-xsm float-right edit';

    // Append text node
    deleteBtn.appendChild(document.createTextNode('delete'));
    deleteBtnn.appendChild(document.createTextNode('edit'));

    // Append button to li
    li.appendChild(deleteBtn);
    li.appendChild(deleteBtnn);

    // Append li to list
    itemList.appendChild(li);

  
    var itemData = {
      name: newItem,
      email: newItemm,
      number: newItemmm
    };
    //localStorage.setItem(newItemm, JSON.stringify(itemData));
    
    axios.post('https://localhost:3000/user/add-user',itemData)
      .then((response)=>{
        console.log(response);
      })
      .catch((err=>{
        console.log(err);
      }))


    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('number').value = '';
  }
}

// Load items from localStorage
document.addEventListener('DOMContentLoaded', loadItems);

function loadItems() {
  axios.get('https://localhost:3000/user/add-user')
    .then((response) => {
      const data = response.data;
      for (var i = 0; i < data.length; i++) {
        var itemData = data[i];
      // Create new li element
      var li = document.createElement('li');
      // Add class
      li.className = 'list-group-item';
      li.setAttribute('data-id', itemData._id);

      // Add text node with item data
      li.appendChild(document.createTextNode(itemData.name));
      li.appendChild(document.createTextNode(' ' + itemData.email));
      li.appendChild(document.createTextNode(' ' + itemData.number));

      // Create del button element
      var deleteBtn = document.createElement('button');
      var deleteBtnn = document.createElement('button');

      // Add classes to del button
      deleteBtn.className = 'btn btn-danger btn-xsm float-right delete';
      deleteBtnn.className = 'btn btn-default btn-xsm float-right edit';

      // Append text node
      deleteBtn.appendChild(document.createTextNode('delete'));
      deleteBtnn.appendChild(document.createTextNode('edit'));

      // Append button to li
      li.appendChild(deleteBtn);
      li.appendChild(deleteBtnn);

      // Append li to list
      itemList.appendChild(li);
    }
  })}


// Remove item
/*function removeItem(e) {
    if (e.target.classList.contains('delete')) {
      var li = e.target.parentElement;
      var id = li.getAttribute('data-id');
      axios.delete(`https://crudcrud.com/api/c61fb1ce3ebe48988069029f2e58a26c/data/${id}`)
        .then((response) => {
          console.log('Item deleted from CRUD API:', response);
  
          // Remove the item from the website
          itemList.removeChild(li);
        })
        .catch((err) => {
          console.log('Error deleting item:', err);
        });
    }
  }
// Edit item
function editItem(e) {
    if (e.target.classList.contains('edit')) {
      var li = e.target.parentElement;
      var id = li.getAttribute('data-id'); // Assuming 'data-id' attribute holds the user's _id
  
      // Fetch user details by ID from the CRUD API
      axios.get(`https://crudcrud.com/api/c61fb1ce3ebe48988069029f2e58a26c/data/${id}`)
        .then((response) => {
          var userData = response.data; // Assuming the response contains user data
  
          // Populate the registration form fields with user details
          document.getElementById('name').value = userData.name;
          document.getElementById('email').value = userData.email;
          document.getElementById('number').value = userData.number;
  
          // Store the user's ID in a hidden field or another suitable location
          // so you can later identify which user you're updating
          // For example, you can add a hidden input field with the user's ID
          document.getElementById('user-id').value = userData._id;
          itemList.removeChild(li);
        })
        .catch((err) => {
          console.log('Error fetching user data for editing:', err);
        });
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var userId = document.getElementById('user-id').value; // Get the stored user ID
  
    var updatedData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      number: document.getElementById('number').value,
    };
  
    // Make a PUT request to update the user details in the CRUD API
    axios.put(`https://crudcrud.com/api/c61fb1ce3ebe48988069029f2e58a26c/data/${userId}`, updatedData)
      .then((response) => {
        console.log('User details updated:', response);
  
        // Update the user details on the website (you may need to remove the old details
        // and add the updated details to the appropriate place)
        // Refresh the list or update the specific user's information
  
        // Clear the form fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('number').value = '';
        document.getElementById('user-id').value = ''; // Clear the stored user ID
      })
      .catch((err) => {
        console.log('Error updating user details:', err);
      });
  });
  // Delete event
itemList.addEventListener('click', removeItem);
// Edit event
itemList.addEventListener('click', editItem);*/