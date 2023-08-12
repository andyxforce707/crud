// validate form input
function validateForm() {
  var name = document.getElementById('name').value;
  var age = document.getElementById('age').value;
  var address = document.getElementById('address').value;
  var email = document.getElementById('email').value;

  if (name == '' || name.length > 20) {
    alert('name required / character is too long');
    return false;
  }

  if (age == '' || age.length > 20) {
    alert('age is required / character is too long');
    return false;
  } else if (age < 1) {
    alert('age must be positive number');
    return false;
  }
  if (address == '' || address.length > 30) {
    alert('addresss is required / character is too long');
    return false;
  }
  if (email == '' || email.length > 30) {
    alert('email is required / character is too long');
    return false;
  } else if (!email.includes('@')) {
    alert('Invalid email adress, must be include an "@" character');
    return false;
  }
  return true;
}

// function to show data from localstorage
function showData() {
  var peopleList;
  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }
  var html = '';

  peopleList.forEach(function (element, index) {
    html += '<tr>';
    html += '<td>' + element.name + '</td>';
    html += '<td>' + element.age + '</td>';
    html += '<td>' + element.address + '</td>';
    html += '<td>' + element.email + '</td>';
    html +=
      '<td style="display:flex; gap: 2px; justify-content: space-evenly"><button onclick="deleteData(' +
      index +
      ')" class="btn" style="cursor: pointer;border-radius: 6px;background: red;color:white;border:none" title="Click to Delete Data">Delete</button><button onclick="updateData(' +
      index +
      ')" class="btn" style="cursor: pointer;border-radius: 6px;background: magenta;color:white;border:none" title="Click to Update Data">Update</button></td>';
    html += '</tr>';
  });

  document.querySelector('#crudTable tbody').innerHTML = html;
}

// loads all data when the document is loaded
document.onload = showData();

// function to add data from localstorage
function addData() {
  // if form is validate
  if (validateForm() == true) {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var address = document.getElementById('address').value;
    var email = document.getElementById('email').value;

    var peopleList;
    if (localStorage.getItem('peopleList') == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }
    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });

    localStorage.setItem('peopleList', JSON.stringify(peopleList));
    showData();
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('address').value = '';
    document.getElementById('email').value = '';
  }
}

// function to delete data from localstorage
function deleteData(index) {
  var peopleList;
  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }

  peopleList.splice(index, 1);
  localStorage.setItem('peopleList', JSON.stringify(peopleList));
  showData();
}

// function to update data from local storage
function updateData(index) {
  // submit button will hide and update will show for updating of data in local storage
  document.getElementById('submit').style.display = 'none';
  document.getElementById('update').style.display = 'block';

  var peopleList;
  if (localStorage.getItem('peopleList') == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem('peopleList'));
  }

  document.getElementById('name').value = peopleList[index].name;
  document.getElementById('age').value = peopleList[index].age;
  document.getElementById('address').value = peopleList[index].address;
  document.getElementById('email').value = peopleList[index].email;

  document.querySelector('#update').onclick = function () {
    if (validateForm() == true) {
      peopleList[index].name = document.getElementById('name').value;
      peopleList[index].age = document.getElementById('age').value;
      peopleList[index].address = document.getElementById('address').value;
      peopleList[index].email = document.getElementById('email').value;

      localStorage.setItem('peopleList', JSON.stringify(peopleList));

      showData();

      document.getElementById('name').value = '';
      document.getElementById('age').value = '';
      document.getElementById('address').value = '';
      document.getElementById('email').value = '';

      // update button will hide and submit will show for updating of data in local storage
      document.getElementById('submit').style.display = 'block';
      document.getElementById('update').style.display = 'none';
    }
  };
}
