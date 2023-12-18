//function to validate data //
function validateForm() {
  var name = document.getElementById("name").value;
  var amounts = document.getElementById("amounts").value;
  var discription = document.getElementById("discription").value;
  var category = document.getElementById("category").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }
  if (amounts == "") {
    alert("Amount is required");
    return false;
  } else if (amounts < 0) {
    alert("Amount must be positive number");
    return false;
  }
  return true;
}

// function to show data from local storage//
function showData() {
  var expenselist;
  if (localStorage.getItem("expenselist") == null) {
    expenselist = [];
  } else {
    expenselist = JSON.parse(localStorage.getItem("expenselist"));
  }
  var html = "";
  expenselist.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.amounts + "</td>";
    html += "<td>" + element.discription + "</td>";
    html += "<td>" + element.category + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button></td>';
    html += "<tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();

// Function to add data to local storage //
function AddData() {
  if (validateForm() == true) {
    var name = document.getElementById("name").value;
    var amounts = document.getElementById("amounts").value;
    var discription = document.getElementById("discription").value;
    var category = document.getElementById("category").value;

    var expenselist;
    if (localStorage.getItem("expenselist") == null) {
      expenselist = [];
    } else {
      expenselist = JSON.parse(localStorage.getItem("expenselist"));
    }

    expenselist.push({
      name: name,
      amounts: amounts,
      discription: discription,
      category: category,
    });

    localStorage.setItem("expenselist", JSON.stringify(expenselist));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("amounts").value = "";
    document.getElementById("discription").value = "";
    document.getElementById("category").value = "";
  }
}

//function to delete data from local storage//
function deleteData(index) {
  var expenselist;
  if (localStorage.getItem("expenselist") == null) {
    expenselist = [];
  } else {
    expenselist = JSON.parse(localStorage.getItem("expenselist"));
  }

  expenselist.splice(index, 1);
  localStorage.setItem("expenselist", JSON.stringify(expenselist));
  showData();
}

//function to edit data from local storage//
function updateData(index) {
  // ADD button will hide and update button will show //
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  var expenselist;
  if (localStorage.getItem("expenselist") == null) {
    expenselist = [];
  } else {
    expenselist = JSON.parse(localStorage.getItem("expenselist"));
  }

  document.getElementById("name").value = expenselist[index].name;
  document.getElementById("amounts").value = expenselist[index].amounts;
  document.getElementById("discription").value = expenselist[index].discription;
  document.getElementById("category").value = expenselist[index].category;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true) {
      expenselist[index].name = document.getElementById("name").value;
      expenselist[index].amounts = document.getElementById("amounts").value;
      expenselist[index].discription =
        document.getElementById("discription").value;
      expenselist[index].category = document.getElementById("category").value;

      localStorage.setItem("expenselist", JSON.stringify(expenselist));

      showData();

      document.getElementById("name").value = "";
      document.getElementById("amounts").value = "";
      document.getElementById("discription").value = "";
      document.getElementById("category").value = "";

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}
