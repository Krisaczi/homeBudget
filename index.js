const addIncBtn = document.querySelector(".addIncome");
const addOutBtn = document.querySelector(".addOutcome");
const incomeList = document.querySelector(".incomeList");
const outcomeList = document.querySelector(".outcomeList");
const moneyLeft = document.querySelector("#moneyLeft");
const totalIncome = document.querySelector(".totalIncome");
const totalOutcome = document.querySelector(".totalOutcome");

const updateTotal = () => {
  let total = 0;
  Array.from(incomeList.children).forEach((li) => {
    const spanVal = li.querySelector(".incValue");
    if (spanVal) {
      total += parseFloat(spanVal.innerText);
    }
  });
  let total1 = 0;
  Array.from(outcomeList.children).forEach((li) => {
    const spanVal1 = li.querySelector(".outValue");
    if (spanVal1) {
      total1 += parseFloat(spanVal1.innerText);
    }
  });
  totalIncome.innerHTML = total;
  totalOutcome.innerHTML = total1;
  moneyLeft.innerHTML = total - total1;
};

addIncBtn.addEventListener("click", () => {
  const incomeType = document.querySelector(".incomeType").value;
  const incomeValue = document.querySelector(".incomeValue").value;

  if (!isNaN(incomeValue) && incomeValue > 0) {
    const li = document.createElement("li");
    li.innerHTML = `${incomeType}: <span class="incValue">${incomeValue}</span><button class="edit">Edit</button><button class="delete">Delete</button>`;

    incomeList.appendChild(li);
    document.querySelector(".incomeType").value = "";
    document.querySelector(".incomeValue").value = "";
  } else {
    alert("Please provide a valid amount");
  }

  updateTotal();
});

addOutBtn.addEventListener("click", () => {
  const outcomeType = document.querySelector(".outcomeType").value;
  const outcomeValue = document.querySelector(".outcomeValue").value;

  if (!isNaN(outcomeValue) && outcomeValue > 0) {
    const li = document.createElement("li");
    li.innerHTML = `${outcomeType}: <span class="outValue">${outcomeValue}</span><button class="edit">Edit</button><button class="delete">Delete</button>`;

    outcomeList.appendChild(li);
    document.querySelector(".outcomeType").value = "";
    document.querySelector(".outcomeValue").value = "";
  } else {
    alert("Please provide a valid amount");
  }

  updateTotal();
});
