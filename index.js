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
  "Interests",
  "Dividends",
  "Rental",
  "Capital Gains",
  "Business",
  "Royalty Income",
  "Benefits",
  "Freelance",
  "Lottery",
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

//Dropdown creation
const createDropdown = (options, defaultValue) => {
  const select = document.createElement("select");
  select.classList.add("editType");
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
  select.value = defaultValue;
  return select;
};

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
      //spanVal.nextElementSibling.textContent = curr;   do usunięcia?
    }
  });
  let outcomeTotal = 0;
  Array.from(outcomeList.children).forEach((li) => {
    const spanVal1 = li.querySelector(".outValue");
    if (spanVal1) {
      outcomeTotal += parseFloat(spanVal1.innerText);
      // spanVal1.nextElementSibling.textContent = curr;    do usunięcia?
    }
  });
  totalIncome.innerHTML = `${incomeTotal} <span class="currencyCode">${curr}</span>`;
  totalOutcome.innerHTML = `${outcomeTotal} <span class="currencyCode">${curr}</span>`;
  moneyLeft.innerHTML = `${incomeTotal - outcomeTotal} <span class="currencyCode">${curr}</span>`;
  if (parseFloat(moneyLeft.innerText) < 0) {
    const title = document.querySelector("title");
    title.innerHTML = `You have
    <span id="moneyLeft">0 <span class="currencyCode">8</span></span> left`;
    document.getElementById("title").style.color = "red";
    console.log(title);
  } else {
    const title = document.querySelector("title");
    title.innerHTML = `You have
    <span id="moneyLeft">0 <span class="currencyCode">8</span></span> left`;
    document.getElementById("title").style.color = "black";
  }
};

// Adding income item
addIncBtn.addEventListener("click", () => {
  const incomeType = document.querySelector("#incomeTypesDropdown").value;
  const incomeList = document.querySelector(".incomeList");
  const incomeValue = document.querySelector(".incomeValue").value;

  if (!isNaN(incomeValue) && incomeValue > 0) {
    const li = document.createElement("li");
    li.classList.add("listItems");
    li.innerHTML = `<div>${incomeType}: <span class="incValue">${incomeValue}</span><span class="currencyCode"></span></div>
    <div><i class="fa-regular fa-pen-to-square edit"></i><i class="fa-regular fa-trash-can delete"></i></div>`;

    incomeList.appendChild(li);
    document.querySelector("#incomeTypesDropdown").value = "Salary";
    document.querySelector(".incomeValue").value = "";
  } else {
    alert("Please provide a valid amount");
  }

  updateTotal();
  updateCurrencyCodes();
});

// Adding outcome item
addOutBtn.addEventListener("click", () => {
  const outcomeType = document.querySelector("#outcomeTypesDropdown").value;
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

    document.querySelector("#outcomeTypesDropdown").value = "Groceries";
    document.querySelector(".outcomeValue").value = "";
  } else {
    alert("Please provide a valid amount");
  }

  updateTotal();
  updateCurrencyCodes();
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

    const dropdown = createDropdown(incomeTypes, incomeType);
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
    const newType = li.querySelector(".editType").value;
    const newValue = parseFloat(li.querySelector(".editValue").value);
    updateTotal();

    if (!isNaN(newValue) && newValue > 0) {
      li.innerHTML = `<div>${newType}: <span class="incValue">${newValue}</span></div>
      <div><i class="fa-regular fa-pen-to-square edit"> </i>
      <i class="fa-regular fa-trash-can delete"></i></div>`;
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

    const dropdown = createDropdown(outcomeTypes, outcomeType);
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
    const newType = li.querySelector(".editType").value;
    const newValue = parseFloat(li.querySelector(".editValue").value);
    updateTotal();

    if (!isNaN(newValue) && newValue > 0) {
      li.innerHTML = `<div>${newType}: <span class="outValue">${newValue}</span></div>
      <div><i class="fa-regular fa-pen-to-square edit"> </i>
      <i class="fa-regular fa-trash-can delete"></i></div>`;
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
    const dropdown = document.getElementById("currency-codes-dropdown");
    let curr = document.querySelector(".currencyCode");

    currList.forEach((el) => {
      const option = document.createElement("option");
      option.value = el;
      option.textContent = el;
      dropdown.append(option);
    });
    dropdown.addEventListener("change", function () {
      //curr.textContent = this.value;
      updateCurrencyCodes(this.value);
      updateTotal();
    });
  })

  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });
