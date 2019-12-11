// scripts
const currentDate = document.querySelector("#current_date");
debugger;
const date = new Date();
currentDate.innerHTML = date.toDateString();

let apiResult = [];

// insert the fetched data to dropdown
insertData = async () => {
  try {
    debugger;
    let response = await fetchData();
    if (response) {
      apiResult = response;
      const multiSelect = document.querySelector("#multi-select");

      apiResult.forEach(createDropDownElement);
      function createDropDownElement(item) {
        let listElement = document.createElement("li");

        listElement.appendChild(document.createTextNode(item.name));
        listElement.setAttribute("value", item.region);
        debugger;
        listElement.addEventListener("click", function() {
          return add_selected_item(this, event);
        });
        multiSelect.appendChild(listElement);
      }
    } else {
      alert("HTTP-Error: " + response);
    }
  } catch (e) {
    console.error(e);
  }
};

// fetch operation
const fetchData = () => {
  const requestUrl = "https://restcountries.eu/rest/v2/all";

  return new Promise((resolve, reject) => {
    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
