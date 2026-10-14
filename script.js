const form = document.getElementById("cardForm");
const bankInp = document.getElementById("bank");
const sysInp = document.getElementById("system");
const numInp = document.getElementById("number");
const holdInp = document.getElementById("holder");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const prevBank = document.getElementById("prevBank");
const prevSystem = document.getElementById("prevSystem");
const prevNumber = document.getElementById("prevNumber");
const prevHolder = document.getElementById("prevHolder");
const prevExp = document.getElementById("prevExp");

for (let m = 1; m <= 12; m++) {
  const opt = document.createElement("option");
  opt.value = String(m).padStart(2, "0");
  opt.textContent = opt.value;
  monthInp.appendChild(opt);
}
const currentYear = new Date().getFullYear();
for (let y = currentYear; y <= currentYear + 6; y++) {
  const opt = document.createElement("option");
  opt.value = y;
  opt.textContent = y;
  yearInp.appendChild(opt);
}

function formatNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
function updatePreview() {
  prevBank.textContent = bankInp.value || "БАНК";
  prevSystem.textContent = sysInp.value || "СИСТЕМА";

  const formatted = formatNumber(numInp.value);
  prevNumber.textContent = formatted || "#### #### #### ####";

  prevHolder.textContent = holdInp.value.toUpperCase() || "ИМЯ ДЕРЖАТЕЛЯ";

  if (monthInp.value && yearInp.value) {
    prevExp.textContent = monthInp.value + "/" + yearInp.value.slice(-2);
  } else {
    prevExp.textContent = "ММ/ГГ";
  }
}
const allInputs = [bankInp, sysInp, numInp, holdInp, monthInp, yearInp];
allInputs.forEach(function (el) {
  el.addEventListener("input", updatePreview);
  el.addEventListener("change", updatePreview);
});
numInp.addEventListener("input", function () {
  numInp.value = formatNumber(numInp.value);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const rowData = [
    bankInp.value,
    sysInp.value,
    formatNumber(numInp.value),
    holdInp.value.toUpperCase(),
    monthInp.value + "/" + yearInp.value,
  ];
  const tr = document.createElement("tr");
  rowData.forEach(function (text) {
    const td = document.createElement("td");
    td.textContent = text;
    tr.appendChild(td);
  });
  document.querySelector("#resultTable tbody").appendChild(tr);
  form.reset();
  updatePreview();
});
