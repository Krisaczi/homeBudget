const addIncBtn = document.querySelector("#income-add");
const addOutBtn = document.querySelector("#outcome-add");
const incomeList = document.querySelector("#list-income");
const outcomeList = document.querySelector("#list-outcome");
const moneyLeft = document.querySelector("#budget-left");
const totalIncome = document.querySelector("#income-summary");
const totalOutcome = document.querySelector("#outcome-summary");
const refreshBtn = document.querySelector("#refresh");
let isEditing = false;
let originalType = null;
let originalValue = 0;

let incomeTypes = [
  "Salary",
  "Business",
  "Sales",
  "Dividends",
  "RentIncome",
  "Other",
];

const outcomeTypes = [
  "Groceries",
  "Rent",
  "Media",
  "Internet",
  "Phones",
  "Entertainment",
  "Diningout",
  "Car",
];
//Reset calculation
refreshBtn.addEventListener("click", () => {
  window.location.reload();
});

// Income Dropdown
function createIncomeDropdown(array) {
  const selectElement = document.createElement("select");
  selectElement.name = "income-category";
  selectElement.id = "income-category";
  selectElement.classList.add("list-items", "dropdown-item");

  array.map((item) => {
    const optionElement = document.createElement("option");
    optionElement.value = item;
    optionElement.textContent = item;
    selectElement.appendChild(optionElement);
  });

  return selectElement;
}

//Outcome Dropdown
function createOutcomeDropdown(array) {
  const selectElement = document.createElement("select");
  selectElement.name = "expense-category";
  selectElement.id = "expense-category";
  selectElement.classList.add("list-items", "dropdown-item");

  array.forEach((item) => {
    const optionElement = document.createElement("option");
    optionElement.value = item;
    optionElement.textContent = item;
    selectElement.appendChild(optionElement);
  });

  return selectElement;
}

const dropDownIncome = createIncomeDropdown(incomeTypes);
document.querySelector(".drop-down-income").appendChild(dropDownIncome);

const dropDownOutcome = createOutcomeDropdown(outcomeTypes);
document.querySelector(".drop-down-outcome").appendChild(dropDownOutcome);

// Currency code updates

const updateCurrencyCodes = (newcurrencCode) => {
  const currencyCodeElements = document.querySelectorAll(".currency-code");
  currencyCodeElements.forEach((element) => {
    element.textContent = newcurrencCode;
  });
};

//Total and H1 update
const updateTotal = () => {
  let incomeTotal = 0;
  const curr = document.querySelector(".currency-code").textContent;
  Array.from(incomeList.children).forEach((li) => {
    const spanVal = li.querySelector(".inc-value");
    if (spanVal) {
      incomeTotal += parseFloat(spanVal.innerText);
      spanVal.nextElementSibling.innerText = curr;
    }
  });

  let outcomeTotal = 0;
  Array.from(outcomeList.children).forEach((li) => {
    const spanVal1 = li.querySelector(".out-value");
    if (spanVal1) {
      outcomeTotal += parseFloat(spanVal1.innerText);
      spanVal1.nextElementSibling.innerText = curr;
    }
  });
  totalIncome.innerHTML = `${incomeTotal} <span class="currency-code">${curr}</span>`;
  totalOutcome.innerHTML = `${outcomeTotal} <span class="currency-code">${curr}</span>`;
  moneyLeft.innerHTML = `${incomeTotal - outcomeTotal} <span class="currency-code">${curr}</span>`;
  const balance = (incomeTotal - outcomeTotal).toFixed(2);
  const title = document.querySelector("#title-summary");
  title.innerHTML =
    balance < 0
      ? `Stop spending money. You have nothing left!!! <br> Your current budget is ${balance} <span class="currency-code">${curr}</span>`
      : `You have ${balance} <span class="currency-code">${curr}</span> left`;
  document.querySelector("#title-summary").style.color =
    balance < 0 ? "red" : "black";
  updateCurrencyCodes(curr);
};

// Adding income item

addIncBtn.addEventListener("click", (e) => {
  if (isEditing) {
    e.preventDefault();
    alert("Please finish editing before adding a new income type.");
  } else {
    const incomeType = document.querySelector("#income-category").value;
    const incomeList = document.querySelector(".income-list");
    const incomeValue = parseFloat(
      document.querySelector(".income-value").value
    );

    if (!isNaN(incomeValue) && incomeValue > 0) {
      const li = document.createElement("li");
      li.classList.add("list-items");
      li.innerHTML = `
    <div class="${incomeType}">${incomeType}: 
    </div>
    <div class="incomeAmount">
    <span class="inc-value">${incomeValue.toFixed(2)}</span>
    <span class="currency-code"></span>
    </div>
    <div>
      <i class="fa-regular fa-pen-to-square edit"></i>
      <i class="fa-regular fa-trash-can delete"></i>
    </div>`;

      incomeList.appendChild(li);
      document.querySelector(".drop-down-income").value = "";
      document.querySelector(".income-value").value = "";

      updateTotal();
    } else {
      alert("Please provide a valid amount");
    }
  }
});

// Income buttons and updates
incomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    li.remove();
    updateTotal();
  } else if (e.target.classList.contains("edit")) {
    isEditing = true;
    const li = e.target.closest("li");
    originalType = li.querySelector("div").classList[0];
    originalValue = parseFloat(li.querySelector(".inc-value").innerText);

    const incomeValue = li.querySelector(".inc-value").innerText;
    const dropdown = createIncomeDropdown(incomeTypes);
    const valueInput = document.createElement("input");
    valueInput.type = "number";
    valueInput.classList.add("edit-value");
    valueInput.value = incomeValue;

    const saveIcon = document.createElement("i");
    saveIcon.classList.add("fa-regular", "fa-floppy-disk", "save");
    li.innerHTML = "";
    li.appendChild(dropdown);
    li.appendChild(valueInput);
    li.appendChild(saveIcon);
  } else if (e.target.classList.contains("save")) {
    isEditing = false;
    const li = e.target.closest("li");
    const newType = li.querySelector("#income-category").value;
    const newValue = parseFloat(li.querySelector(".edit-value").value);

    // Update the DOM and only if the new value is valid
    if (!isNaN(newValue) && newValue > 0) {
      li.innerHTML = `
      <div class="${newType}">${newType}: 
      </div>
      <div class="incomeAmount">
      <span class="inc-value">${newValue.toFixed(2)}</span>
      <span class="currency-code"></span>
      </div>
      <div>
        <i class="fa-regular fa-pen-to-square edit"></i>
        <i class="fa-regular fa-trash-can delete"></i>
      </div>`;
      updateTotal();
    } else {
      alert("Please provide a valid amount");
    }
  }
});

// Adding outcome item
addOutBtn.addEventListener("click", (e) => {
  if (isEditing) {
    e.preventDefault();
    alert("Please finish editing before adding a new income type.");
  } else {
    const outcomeType = document.querySelector("#expense-category").value;
    const outcomeList = document.querySelector(".outcome-list");
    const outcomeValue = parseFloat(
      document.querySelector(".outcome-value").value
    );

    if (!isNaN(outcomeValue) && outcomeValue > 0) {
      const li = document.createElement("li");
      li.classList.add("list-items");

      li.innerHTML = `
      <div class="${outcomeType}">${outcomeType}: 
      </div>
      <div class="outcomeAmount">
      <span class="out-value">${outcomeValue.toFixed(2)}</span>
      <span class="currency-code"></span>
      </div>
      <div>
        <i class="fa-regular fa-pen-to-square edit"></i>
        <i class="fa-regular fa-trash-can delete"></i>
      </div>`;

      outcomeList.appendChild(li);

      document.querySelector(".drop-down-outcome").value = "Groceries";
      document.querySelector(".outcome-value").value = "";

      updateTotal();
    } else {
      alert("Please provide a valid amount");
    }
  }
});

//Outcome buttons and updates
outcomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    li.remove();
    updateTotal();
  } else if (e.target.classList.contains("edit")) {
    isEditing = true;
    const li = e.target.closest("li");
    originalType = li.querySelector("div").classList[0];
    originalValue = parseFloat(li.querySelector(".out-value").innerText);

    const outcomeValue = li.querySelector(".out-value").innerText;
    const dropdown = createOutcomeDropdown(outcomeTypes);
    const valueInput = document.createElement("input");
    valueInput.type = "number";
    valueInput.classList.add("edit-value");
    valueInput.value = outcomeValue;

    const saveIcon = document.createElement("i");
    saveIcon.classList.add("fa-regular", "fa-floppy-disk", "save");
    li.innerHTML = "";
    li.appendChild(dropdown);
    li.appendChild(valueInput);
    li.appendChild(saveIcon);
  } else if (e.target.classList.contains("save")) {
    isEditing = false;
    const li = e.target.closest("li");
    const newType = li.querySelector("#expense-category").value;
    const newValue = parseFloat(li.querySelector(".edit-value").value);

    if (!isNaN(newValue) && newValue > 0) {
      li.innerHTML = `
      <div class="${newType}">${newType}: 
    </div>
    <div class="outcomeAmount">
    <span class="out-value">${newValue.toFixed(2)}</span>
    <span class="currency-code"></span>
    </div>
    <div>
      <i class="fa-regular fa-pen-to-square edit"></i>
      <i class="fa-regular fa-trash-can delete"></i>
    </div>`;
      updateTotal();
    } else {
      alert("Please provide a valid amoint");
    }
  }
});

// Currency codes API request

const apiKey = "24f87096185677184d196bf1";
const URL = "https://v6.exchangerate-api.com/v6/YOUR-API-KEY/quota";

fetch("https://v6.exchangerate-api.com/v6/24f87096185677184d196bf1/latest/USD")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const currList = Object.keys(data.conversion_rates);
    const dropdown = document.getElementById("cc-dropdown");
    let curr = document.querySelector(".currency-code");

    currList.forEach((el) => {
      const option = document.createElement("option");
      option.value = el;
      option.textContent = el;
      dropdown.append(option);
    });
    dropdown.addEventListener("change", function () {
      curr.textContent = this.value;
      updateCurrencyCodes(this.value);
    });
  })

  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });
