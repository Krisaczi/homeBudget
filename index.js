const addIncBtn = document.querySelector(".addIncome");
const addOutBtn = document.querySelector(".addOutcome");
const incomeList = document.querySelector(".incomeList");
const outcomeList = document.querySelector(".outcomeList");
const moneyLeft = document.querySelector("#moneyLeft");
const totalIncome = document.querySelector(".totalIncome");
const totalOutcome = document.querySelector(".totalOutcome");
const refreshBtn = document.querySelector("#refresh");
let salaryTotal = 0;
let businessTotal = 0;
let salesTotal = 0;
let dividendsTotal = 0;
let rentIncomeTotal = 0;
let freelanceTotal = 0;
let otherTotal = 0;

let groceriesTotal = 0;
let rentTotal = 0;
let mediaTotal = 0;
let internetTotal = 0;
let PhonesTotal = 0;
let entertainmentTotal = 0;
let diningOutTotal = 0;
let carTotal = 0;
let originalType = null;
let originalValue = 0;
let incomeTypes = [
  { type: "Salary", total: salaryTotal },
  { type: "Business", total: businessTotal },
  { type: "Sales", total: salesTotal },
  { type: "Dividends", total: dividendsTotal },
  { type: "RentIncome", total: rentIncomeTotal },
  { type: "Freelance", total: freelanceTotal },
  { type: "Other", total: otherTotal },
];

const outcomeTypes = [
  { type: "Groceries", total: groceriesTotal },
  { type: "Rent", total: rentTotal },
  { type: "Media", total: mediaTotal },
  { type: "Internet", total: internetTotal },
  { type: "Phones", total: PhonesTotal },
  { type: "Entertainment", total: entertainmentTotal },
  { type: "Diningout", total: diningOutTotal },
  { type: "Car", total: carTotal },
];
//Reset calculation
refreshBtn.addEventListener("click", () => {
  window.location.reload();
});

// Income Dropdown
function createIncomeDropdown(array) {
  const selectElement = document.createElement("select");
  selectElement.name = "incomeCategory";
  selectElement.id = "incomeCategory";
  selectElement.classList.add("listItems", "dropdown-item");

  array.map((item) => {
    const optionElement = document.createElement("option");
    optionElement.value = item.type;
    optionElement.textContent = item.type;
    selectElement.appendChild(optionElement);
  });

  return selectElement;
}

//Outcome Dropdown
function createOutcomeDropdown(array) {
  const selectElement = document.createElement("select");
  selectElement.name = "expenseCategory";
  selectElement.id = "expenseCategory";
  selectElement.classList.add("listItems", "dropdown-item");

  array.forEach((item) => {
    const optionElement = document.createElement("option");
    optionElement.value = item.type;
    optionElement.textContent = item.type;
    selectElement.appendChild(optionElement);
  });

  return selectElement;
}

const dropDownIncome = createIncomeDropdown(incomeTypes);
document.querySelector(".dropDownIncome").appendChild(dropDownIncome);

const dropDownOutcome = createOutcomeDropdown(outcomeTypes);
document.querySelector(".dropDownOutcome").appendChild(dropDownOutcome);

// Currency code updates

const updateCurrencyCodes = (newCurrencyCode) => {
  const currencyCodeElements = document.querySelectorAll(".currencyCode");
  currencyCodeElements.forEach((element) => {
    element.textContent = newCurrencyCode;
  });
};

//Total and H1 update
const updateTotal = () => {
  let incomeTotal = 0;
  const curr = document.querySelector(".currencyCode").textContent;
  Array.from(incomeList.children).forEach((li) => {
    const spanVal = li.querySelector(".incValue");
    if (spanVal) {
      incomeTotal += parseFloat(spanVal.innerText);
      spanVal.nextElementSibling.innerText = curr;
    }
  });

  let outcomeTotal = 0;
  Array.from(outcomeList.children).forEach((li) => {
    const spanVal1 = li.querySelector(".outValue");
    if (spanVal1) {
      outcomeTotal += parseFloat(spanVal1.innerText);
      spanVal1.nextElementSibling.innerText = curr;
    }
  });
  totalIncome.innerHTML = `${incomeTotal} <span class="currencyCode">${curr}</span>`;
  totalOutcome.innerHTML = `${outcomeTotal} <span class="currencyCode">${curr}</span>`;
  moneyLeft.innerHTML = `${incomeTotal - outcomeTotal} <span class="currencyCode">${curr}</span>`;
  const balance = incomeTotal - outcomeTotal;
  const title = document.querySelector("#title");
  title.innerHTML =
    balance < 0
      ? `Stop spending money. You have nothing left!!! <br> Your current budget is ${balance} <span class="currencyCode">${curr}</span>`
      : `You have ${balance} ${curr} left`;
  document.querySelector("#title").style.color = balance < 0 ? "red" : "black";
};

// Adding income item

addIncBtn.addEventListener("click", () => {
  const incomeType = document.querySelector("#incomeCategory").value;
  const incomeList = document.querySelector(".incomeList");
  const incomeValue = parseFloat(document.querySelector(".incomeValue").value);

  if (!isNaN(incomeValue) && incomeValue > 0) {
    const li = document.createElement("li");
    li.classList.add("listItems");
    li.innerHTML = `
    <div class="${incomeType}">${incomeType}: 
    </div>
    <div class="incomeAmount">
    <span class="incValue">${incomeValue}</span>
    <span class="currencyCode"></span>
    </div>
    <div>
      <i class="fa-regular fa-pen-to-square edit"></i>
      <i class="fa-regular fa-trash-can delete"></i>
    </div>`;

    incomeList.appendChild(li);
    document.querySelector(".dropDownIncome").value = "";
    document.querySelector(".incomeValue").value = "";

    updateTotal();
    updateChartData();
  } else {
    alert("Please provide a valid amount");
  }
});

// Income buttons and updates
incomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    li.remove();
    updateTotal();
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.closest("li");
    originalType = li.querySelector("div").classList[0];
    originalValue = parseFloat(li.querySelector(".incValue").innerText);

    const incomeValue = li.querySelector(".incValue").innerText;
    const dropdown = createIncomeDropdown(incomeTypes);
    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.classList.add("editValue");
    valueInput.value = incomeValue;

    const saveIcon = document.createElement("i");
    saveIcon.classList.add("fa-regular", "fa-floppy-disk", "save");
    li.innerHTML = "";
    li.appendChild(dropdown);
    li.appendChild(valueInput);
    li.appendChild(saveIcon);
  } else if (e.target.classList.contains("save")) {
    const li = e.target.closest("li");
    const newType = li.querySelector("#incomeCategory").value;
    const newValue = parseFloat(li.querySelector(".editValue").value);

    // Update the DOM and chart only if the new value is valid
    if (!isNaN(newValue) && newValue >= 0) {
      li.innerHTML = `
    <div class="${newType}"> ${newType}
      <span class="incValue">${newValue.toFixed(2)}</span>
      <span class="currencyCode"></span>
    </div>
    <div>
      <i class="fa-regular fa-pen-to-square edit"></i>
      <i class="fa-regular fa-trash-can delete"></i>
    </div>`;
      updateTotal();
    }
  }
});

// Adding outcome item
addOutBtn.addEventListener("click", () => {
  const outcomeType = document.querySelector("#expenseCategory").value;
  const outcomeList = document.querySelector(".outcomeList");
  const outcomeValue = document.querySelector(".outcomeValue").value;

  if (!isNaN(outcomeValue) && outcomeValue > 0) {
    const li = document.createElement("li");
    li.classList.add("listItems");

    li.innerHTML = `
    <div class="${outcomeType}">${outcomeType}: 
      <span class="outValue">${outcomeValue}</span>
      <span class="currencyCode"></span>
    </div>
    <div>
      <i class="fa-regular fa-pen-to-square edit"></i>
      <i class="fa-regular fa-trash-can delete"></i>
    </div>`;

    outcomeList.appendChild(li);

    document.querySelector(".dropDownOutcome").value = "Groceries";
    document.querySelector(".outcomeValue").value = "";

    updateTotal();
  } else {
    alert("Please provide a valid amount");
  }
});

//Outcome buttons and updates
outcomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");

    li.remove();
    updateTotal();
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.closest("li");
    const outcomeType =
      li.querySelector(".outValue").previousSibling.textContent;
    const outcomeValue = li.querySelector(".outValue").innerText;

    const dropdown = createOutcomeDropdown(outcomeTypes);
    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.classList.add("editValue");
    valueInput.value = outcomeValue;
    const outcomeValue1 = li.querySelector(".outValue").innerText;
    const saveIcon = document.createElement("i");
    saveIcon.classList.add("fa-regular", "fa-floppy-disk", "save");
    li.innerHTML = "";
    li.appendChild(dropdown);
    li.appendChild(valueInput);
    li.appendChild(saveIcon);
  } else if (e.target.classList.contains("save")) {
    const li = e.target.closest("li");
    const newType = li.querySelector("#expenseCategory").value;
    const newValue = parseFloat(li.querySelector(".editValue").value);
    updateTotal();

    if (!isNaN(newValue) && newValue > 0) {
      li.innerHTML = `
      <div>${newType}: 
        <span class="outValue">${newValue}</span>
        <span class="currencyCode"></span>
      </div>
      <div>
        <i class="fa-regular fa-pen-to-square edit"></i>
        <i class="fa-regular fa-trash-can delete"></i>
      </div>`;
      updateTotal();
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
    const dropdown = document.getElementById("currencyCodesDropdown");
    let curr = document.querySelector(".currencyCode");

    currList.forEach((el) => {
      const option = document.createElement("option");
      option.value = el;
      option.textContent = el;
      dropdown.append(option);
    });
    dropdown.addEventListener("change", function () {
      curr.textContent = this.value;
      updateCurrencyCodes(this.value);
      //updateTotal();
    });
  })

  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });
