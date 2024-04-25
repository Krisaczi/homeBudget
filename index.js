const addIncBtn = document.querySelector(".addIncome");
const addOutBtn = document.querySelector(".addOutcome");
const incomeList = document.querySelector(".incomeList");
const outcomeList = document.querySelector(".outcomeList");
const moneyLeft = document.querySelector("#moneyLeft");
const totalIncome = document.querySelector(".totalIncome");
const totalOutcome = document.querySelector(".totalOutcome");
const refreshBtn = document.querySelector("#refresh");

refreshBtn.addEventListener("click", () => {
  window.location.reload();
});

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
  if (parseFloat(moneyLeft.innerText) < 0) {
    document.getElementById("title").style.color = "red";
  } else {
    document.getElementById("title").style.color = "black";
  }
};

addIncBtn.addEventListener("click", () => {
  const incomeType = document.querySelector(".incomeType").value;
  const incomeValue = document.querySelector(".incomeValue").value;

  if (!isNaN(incomeValue) && incomeValue > 0) {
    const li = document.createElement("li");
    li.innerHTML = `${incomeType}: <span class="incValue">${incomeValue}</span><i class="fa-solid fa-pen-to-square edit"></i><i class="fa-regular fa-trash-can delete"></i>`;

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
    li.innerHTML = `${outcomeType}: <span class="outValue">${outcomeValue}</span><i class="fa-solid fa-pen-to-square edit"></i><i class="fa-regular fa-trash-can delete"></i>`;

    outcomeList.appendChild(li);
    document.querySelector(".outcomeType").value = "";
    document.querySelector(".outcomeValue").value = "";
  } else {
    alert("Please provide a valid amount");
  }

  updateTotal();
});

incomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    updateTotal();
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.parentElement;
    const incomeType = li.childNodes[0].nodeValue.trim().slice(0, -1);
    const incomeValue = li.querySelector(".incValue").innerText;
    li.innerHTML = `Name: <input type="text" value="${incomeType}" class="editType"/> Amount: <input type="text" value="${incomeValue}" class="editValue"/> 
    <i class="fa-regular fa-floppy-disk save">`;
  } else if (e.target.classList.contains("save")) {
    const li = e.target.parentElement;
    const newType = li.querySelector(".editType").value;
    const newValue = parseFloat(li.querySelector(".editValue").value);

    if (!isNaN(newValue) && newValue > 0) {
      li.innerHTML = `${newType} <span class="incValue">${newValue}</span>
      <i class="fa-solid fa-pen-to-square edit"> 
      <i class="fa-regular fa-trash-can delete"></i>`;
      updateTotal();
    }
  }
});
outcomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    updateTotal();
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.parentElement;
    const outcomeType = li.childNodes[0].nodeValue.trim().slice(0, -1);
    const outcomeValue = li.querySelector(".outValue").innerText;
    li.innerHTML = `<input type="text" value="${outcomeType}" class="editType"> Amount <input type="text" value="${outcomeValue}" class="editValue"> <i class="fa-regular fa-floppy-disk save"></i> `;
  } else if (e.target.classList.contains("save")) {
    const li = e.target.parentElement;
    const newType = li.querySelector(".editType").value;
    const newValue = parseFloat(li.querySelector(".editValue").value);

    if (!isNaN(newValue) && newValue > 0) {
      li.innerHTML = `${newType} <span class="incValue">${newValue}</span>
      <i class="fa-solid fa-pen-to-square edit"></i>
        <i class="fa-regular fa-trash-can delete"></i>`;
      updateTotal();
    }
  }
});
