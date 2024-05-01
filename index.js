const addIncBtn = document.querySelector(".addIncome");
const addOutBtn = document.querySelector(".addOutcome");
const incomeList = document.querySelector(".incomeList");
const outcomeList = document.querySelector(".outcomeList");
const moneyLeft = document.querySelector("#moneyLeft");
const totalIncome = document.querySelector(".totalIncome");
const totalOutcome = document.querySelector(".totalOutcome");
const refreshBtn = document.querySelector("#refresh");
const incomeTypes = [
  "Salary",
  "Business",
  "Sales",
  "Dividends",
  "Rent",
  "Royalty Income",
  "Freelance",
  "Other",
];

const outcomeTypes = [
  "Groceries",
  "Rent",
  "Media",
  "Internet",
  "Mobile phones",
  "Life insurance",
  "Entertainment",
  "Dining out",
  "Gas",
  "Investments",
  "Loan repayment",
];
//Reset calculation
refreshBtn.addEventListener("click", () => {
  window.location.reload();
});

function createIncomeDropdown(array) {
  const selectElement = document.createElement("select");
  selectElement.name = "incomeCategory";
  selectElement.id = "incomeCategory";
  selectElement.classList.add("listItems", "dropdown-item");

  array.forEach((item) => {
    const optionElement = document.createElement("option");
    optionElement.value = item;
    optionElement.textContent = item;
    selectElement.appendChild(optionElement);
  });

  return selectElement;
}
function createOutcomeDropdown(array) {
  const selectElement = document.createElement("select");
  selectElement.name = "expenseCategory";
  selectElement.id = "expenseCategory";
  selectElement.classList.add("listItems", "dropdown-item");

  array.forEach((item) => {
    const optionElement = document.createElement("option");
    optionElement.value = item;
    optionElement.textContent = item;
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
let salaryTotal = 0;
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
  title.textContent = `You have ${balance} ${curr} left`;
  document.querySelector("#title").style.color = balance < 0 ? "red" : "black";
  const incomeValues = [salaryTotal];
  updateChartData(myPieChart, incomeValues);
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

    if (incomeType === "Salary") {
      salaryTotal += incomeValue;
      console.log("Updated SalaryTotal:", salaryTotal);
    }
  } else {
    alert("Please provide a valid amount");
  }

  updateTotal();
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
    <div>${outcomeType}: 
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
  } else {
    alert("Please provide a valid amount");
  }

  updateTotal();
});

// Income buttons and updates
incomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    updateTotal();
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.closest("li");
    const incomeType =
      li.querySelector(".incValue").previousSibling.textContent;

    const incomeValue = li.querySelector(".incValue").innerText;

    const dropdown = createIncomeDropdown(incomeTypes);
    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.classList.add("editValue");
    valueInput.value = incomeValue;
    const incomeValue1 = li.querySelector(".incValue").innerText;
    const saveIcon = document.createElement("i");
    saveIcon.classList.add("fa-regular", "fa-floppy-disk", "save");
    li.innerHTML = "";
    li.appendChild(dropdown);
    li.appendChild(valueInput);
    li.appendChild(saveIcon);
    updateTotal();
  } else if (e.target.classList.contains("save")) {
    const li = e.target.closest("li");
    const newType = li.querySelector("#incomeCategory").value;
    const newValue = parseFloat(li.querySelector(".editValue").value);
    updateTotal();

    if (!isNaN(newValue) && newValue > 0) {
      li.innerHTML = `
      <div>${newType}: 
        <span class="incValue">${newValue}</span>
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

//Outcome buttons and updates
outcomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
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
    updateTotal();
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

// const spanVal1 = li.querySelector(".outValue");
//     if (spanVal1) {
//       outcomeTotal += parseFloat(spanVal1.innerText);
//       spanVal1.nextElementSibling.innerText = curr;
//     }

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

const incomeData = {
  labels: incomeTypes, // This should be an array of categories
  datasets: [
    {
      label: "Income Distribution",
      data: [salaryTotal], // Replace this with an array of values for each category
      backgroundColor: [
        "red",
        "yellow",
        "orange",
        "purple",
        "green",
        "violet",
        "gray",
        "brown",
        "magenta",
        "blue",
        "pink",
        "salmon",
        "crimson",
      ],
      hoverOffset: 4,
    },
  ],
};

// Function to update the pie chart data
function updateChartData(chart, incomeValues) {
  chart.data.datasets[0].data = incomeValues;
  chart.update();
}

// Function to create the pie chart
function createPieChart(data) {
  const ctx = document.getElementById("myPieChart").getContext("2d");
  return new Chart(ctx, {
    type: "pie",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Income Distribution",
        },
      },
    },
  });
}

// Example usage:
const myPieChart = createPieChart(incomeData);
// Call updateChartData with the actual values to update the pie chart
