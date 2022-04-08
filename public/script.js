console.log(`We are Live with Starter App..`);

const DATA = [];

function sendLoginCreds() {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let payload = {
    username: username,
    password: password,
  };

  //send data to api endpoint
  const headers = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), //{"username":"johndoe","password":"pass"}
  };

  //send data to api endpoint to login
  const response = fetch("/api/login", headers);

  //log out the response, then log response
  response
    .then((response) => response.json())
    .then((responseJSON) => {
      //{"Data":{}}, "success": true, "message":"loremIpsum" }
      console.log(responseJSON);

      //Display Status/Login message
      document.getElementById("output").innerText = responseJSON.message;

      if (responseJSON.success === true) {
        //load app
        loadApplication(responseJSON.data);
      }
    });
}

function loadApplication(data) {
  contentArea();
  displayDataTable(data);
  addToNavUI(formNavItem);
  addToNavUI(dashboardNavItem);
  document
    .getElementsByClassName("dashboard")[0]
    .addEventListener("click", displayDataTable);
  document
    .getElementsByClassName("form")[0]
    .addEventListener("click", showForm);
}

//onLoginSubmit
let loginButton = document.getElementById("submit");
loginButton.addEventListener("click", function () {
  console.log("submit hit");
  sendLoginCreds(DATA);
});

//Update UI with DB Saved data
function displayDataTable(records) {
  contentArea();
  let tableRows = "";
  for (var i = 0; i < records.length; i++) {
    records[i].tableRows += `  <tr>
                      <th scope="row">${i}</th>
                      <td>${records[i].property1}</td>
                      <td>${records[i].property2}</td>
                  </tr>`;
  }
  let tableHTML = `
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Column1</th>
      <th scope="col">Column2</th>
    </tr>
  </thead>
  <tbody>
  ${tableRows}
  </tbody>
  </table>
  `;
  contentArea(tableHTML);
}

//clearContentArea
function contentArea(content) {
  let contentArea = document.getElementsByClassName("content-container")[0];
  contentArea.innerHTML = content;
}

//update Nav
function addToNavUI(apps) {
  let nav = document.getElementsByClassName("navbox")[0];
  nav.innerHTML += apps;
}

let formNavItem = `
                  <div class="navitem">
                  <a href="#">
                  <i class="fa-solid fa-square-plus form"></i>      
                  </a>
                  `;
let dashboardNavItem = `
                  <div class="navitem">
                  <a href="#">
                  <i class="fa-solid fa-table dashboard"></i>    
                  </a>
                  `;

function showForm() {
  contentArea();
  let FormHTML = `
                    <label for="col1">Column 1</label>
                    <input type="text" id="column1" name="col1" /><br /><br />

                    <label for="password">Column 2</label>
                    <input type="text"  id="column2" name="col1" /><br /><br />

                    <button class="login-btn" id="create" type="button" name="create" /> Create </button>
                    `;
  contentArea(FormHTML);
  document.getElementById("create").addEventListener("click", function () {
    let column1 = document.getElementById("column1").value;
    let column2 = document.getElementById("column2").value;

    createRecord(column1, column2);
  });
}

function createRecord(value1, value2) {
  let payload = {
    column1: value1,
    column2: value2,
  };

  //send data to api endpoint
  const headers = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), //{"column1":"abc","column2":"xyz"}
  };

  //send data to api endpoint to login
  const response = fetch("/api/create/record/v1", headers);
  console.log("Sent Req to: /api/create/record/v1");

  //log out the response, then log response
  response
    .then((response) => response.json())
    .then((responseJSON) => {
      //{"Data":{}}, "success": true, "message":"loremIpsum" }
      console.log(responseJSON);
    });
}
