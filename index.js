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
  // const incomeValues = [
  //   salaryTotal,
  //   businessTotal,
  //   salesTotal,
  //   dividendsTotal,
  //   rentIncomeTotal,

  //   freelanceTotal,
  //   otherTotal,
  // ];
  // const outcomeValues = [
  //   groceriesTotal,
  //   rentTotal,
  //   mediaTotal,
  //   internetTotal,
  //   PhonesTotal,
  //   entertainmentTotal,
  //   diningOutTotal,
  //   carTotal,
  // ];
  updateChartData(myPieChart, incomeTypes);
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
    }
    if (incomeType === "Business") {
      businessTotal += incomeValue;
    }
    if (incomeType === "Sales") {
      salesTotal += incomeValue;
    }
    if (incomeType === "Dividends") {
      dividendsTotal += incomeValue;
    }
    if (incomeType === "RentIncome") {
      rentIncomeTotal += incomeValue;
    }

    if (incomeType === "Freelance") {
      freelanceTotal += incomeValue;
    }
    if (incomeType === "Other") {
      otherTotal += incomeValue;
    }

    updateTotal();

    updateChartData(myPieChart, [
      salaryTotal,
      businessTotal,
      salesTotal,
      dividendsTotal,
      rentIncomeTotal,
      freelanceTotal,
      otherTotal,
    ]);
  } else {
    alert("Please provide a valid amount");
  }
});

// Income buttons and updates
incomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    const value = parseFloat(li.querySelector(".incValue").innerText);
    const incomeType = li.querySelector("div").classList[0];

    if (incomeType === "Salary") {
      salaryTotal -= value;
    } else if (incomeType === "Business") {
      businessTotal -= value;
    } else if (incomeType === "Sales") {
      salesTotal -= value;
    } else if (incomeType === "Dividends") {
      dividendsTotal -= value;
    } else if (incomeType === "RentIncome") {
      rentIncomeTotal -= value;
    } else if (incomeType === "Freelance") {
      freelanceTotal -= value;
    } else if (incomeType === "Other") {
      otherTotal -= value;
    }

    li.remove();
    updateTotal();
    updateChartData(myPieChart, [
      salaryTotal,
      businessTotal,
      salesTotal,
      dividendsTotal,
      rentIncomeTotal,
      freelanceTotal,
      otherTotal,
    ]);
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
    updateTotal();
    // updateChartData(myPieChart, [
    //   salaryTotal,
    //   businessTotal,
    //   salesTotal,
    //   dividendsTotal,
    //   rentIncomeTotal,
    //   freelanceTotal,
    //   otherTotal,
    // ]);
    // updateChartData(
    //   myPieChart,
    //   incomeTypes.map((type) => type.total)
    // );
  } else if (e.target.classList.contains("save")) {
    const li = e.target.closest("li");
    const newType = li.querySelector("#incomeCategory").value;
    const newValue = parseFloat(li.querySelector(".editValue").value);

    // Find the income type objects
    const originalTypeObject = incomeTypes.find(
      (type) => type.type === originalType
    );
    const newTypeObject = incomeTypes.find((type) => type.type === newType);

    // Check if the original type is different from the new type before subtracting
    if (originalType !== newType) {
      originalTypeObject.total -= originalValue;
      newTypeObject.total += newValue;
    } else {
      // If the type hasn't changed, only update the total if the value has changed
      if (newValue !== originalValue) {
        originalTypeObject.total -= originalValue;
        originalTypeObject.total += newValue;
      }
    }

    // Ensure no negative totals
    if (originalTypeObject.total < 0) {
      originalTypeObject.total = 0;
    }
    if (newTypeObject.total < 0) {
      newTypeObject.total = 0;
    }

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
      // updateChartData(
      //   myPieChart,
      //   incomeTypes.map((type) => type.total)
      // );
      updateChartData(myPieChart, [
        salaryTotal,
        businessTotal,
        salesTotal,
        dividendsTotal,
        rentIncomeTotal,
        freelanceTotal,
        otherTotal,
      ]);
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
    <div class="${outcomeType} listItem">${outcomeType}: 
      </div>
      <div>
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

    if (outcomeType === "Groceries") {
      groceriesTotal += outcomeValue;
    }
    if (outcomeType === "Rent") {
      rentTotal += outcomeValue;
    }
    if (outcomeType === "Media") {
      mediaTotal += outcomeValue;
    }
    if (outcomeType === "Internet") {
      internetTotal += outcomeValue;
    }
    if (outcomeType === "Phones") {
      PhonesTotal += outcomeValue;
    }
    if (outcomeType === "Entertainment") {
      entertainmentTotal += outcomeValue;
    }
    if (outcomeType === "Diningout") {
      diningOutTotal += outcomeValue;
    }
    if (outcomeType === "Car") {
      carTotal += outcomeValue;
    }

    updateTotal();
    updateChartData(myPieChart2, outcomeValues);
  } else {
    alert("Please provide a valid amount");
  }
});

//Outcome buttons and updates
outcomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    const value = parseFloat(li.querySelector(".outValue").innerText);
    const outcomeType = li.querySelector("div").classList[0];

    if (outcomeType === "Groceries") {
      groceriesTotal -= value;
    } else if (outcomeType === "Rent") {
      rentTotal -= value;
    } else if (outcomeType === "Media") {
      mediaTotal -= value;
    } else if (outcomeType === "Internet") {
      internetTotal -= value;
    } else if (outcomeType === "Phones") {
      PhonesTotal -= value;
    } else if (outcomeType === "Entertainment") {
      entertainmentTotal -= value;
    } else if (outcomeType === "Diningout") {
      diningOutTotal -= value;
    } else if (outcomeType === "Car") {
      carTotal -= value;
    }

    li.remove();
    updateTotal();
    updateChartData(myPieChart, outcomeTypes);
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

    updateChartData(myPieChart2, outcomeValues);
  } else if (e.target.classList.contains("save")) {
    const li = e.target.closest("li");
    const newType = li.querySelector("#expenseCategory").value;
    const newValue = parseFloat(li.querySelector(".editValue").value);
    updateTotal();

    updateChartData(myPieChart2, outcomeValues);

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

      updateChartData(myPieChart2, outcomeValues);
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

// Income Pie Charts
const incomeData = {
  labels: incomeTypes.map((type) => type.type), // This should be an array of categories
  datasets: [
    {
      label: "Income Distribution",
      data: [
        incomeTypes.map((type) => type.total),
        // salaryTotal,
        // businessTotal,
        // salesTotal,
        // dividendsTotal,
        // rentIncomeTotal,
        // freelanceTotal,
        // otherTotal,
      ], // Replace this with an array of values for each category
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
function updateChartData(chart, incomeTypes) {
  chart.data.labels = incomeTypes.map((type) => type.type);
  chart.data.datasets[0].data = incomeTypes.map((type) => type.total);
  chart.update();
}

// Function to create the pie chart
function createPieChart(data, canvasId) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "pie",
    data: data,
    options: {
      responsive: false,
      maintainAspectRatio: false, // Add this to maintain the aspect ratio
      aspectRatio: 2, // Adjust this value to scale the size of the pie chart
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
const myPieChart = createPieChart(incomeData, "myPieChart");
// Call updateChartData with the actual values to update the pie chart

// Outcome Pie Chart

const outcomeData = {
  labels: outcomeTypes, // This should be an array of categories
  datasets: [
    {
      label: "Outcome Distribution",
      data: [
        groceriesTotal,
        rentTotal,
        mediaTotal,
        internetTotal,
        PhonesTotal,
        entertainmentTotal,
        diningOutTotal,
        carTotal,
      ], // Replace this with an array of values for each category
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
function updateChartData(chart, outcomeValue) {
  chart.data.datasets[0].data = outcomeValue;
  chart.update();
}

// Function to create the pie chart
function createPieChart(data, canvasId) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "pie",
    data: data,
    options: {
      responsive: false,
      maintainAspectRatio: false, // Add this to maintain the aspect ratio
      aspectRatio: 2, // Adjust this value to scale the size of the pie chart
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Outcome Distribution",
        },
      },
    },
  });
}

// Example usage:
const myPieChart2 = createPieChart(outcomeData, "myPieChart2");
// Call updateChartData with the actual values to update the pie chart
