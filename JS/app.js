console.log("This is the best GetMaster you come across the internet");

//Utility functions:
function getElementDiv(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// Intialize a no. of parameter
let addedParamCount = 0;

// Hide the parameter box initially
let parametersBox = document.getElementById("parametersBox");
let requestJsonBox = document.getElementById("requestJsonBox");
parametersBox.style.display = "none";

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  parametersBox.style.display = "block";
  requestJsonBox.style.display = "none";
});

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  parametersBox.style.display = "none";
  requestJsonBox.style.display = "block";
});

// If user click on '+' button then add one parameter box more
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${
                          addedParamCount + 2
                        }</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${
                              addedParamCount + 2
                            }" placeholder="Enter Parameter ${
    addedParamCount + 2
  } Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${
                              addedParamCount + 2
                            }" placeholder="Enter Parameter ${
    addedParamCount + 2
  } Value">
                        </div>
                        <button class="btn btn-primary deleteParam"> - </button>
                    </div>`;

  // Convert element string into DOM
  let paramElement = getElementDiv(string);
  params.appendChild(paramElement);

  // Add an event listener to remove the parameter on clicking - button
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  addedParamCount++;
});

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // Show please wait in response box to request patience from User
  document.getElementById("responsePrism").innerHTML =
    "Please wait.. Fetching response...";

  // Fetch all the values user has entered
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  // If user has used params option instead of json, collect all the parameters in an object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  //Console all logs for debugging
  // console.log('Url is ', url);
  // console.log('requestType is ', requestType);
  // console.log('contentType is ', contentType);
  // console.log('Data is ', data);

  // If request type is GET, invoke fetch API to create a post request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  }
});
