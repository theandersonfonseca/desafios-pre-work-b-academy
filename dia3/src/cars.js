const form = document.querySelector('[data-js="cars-form"]');
const inputs = document.querySelectorAll('[data-js="input"]');
const tableBody = document.querySelector('[data-js="table-body"]');

function resetForm() {
  inputs.forEach((value) => (value.value = ""));
  inputs[0].focus();
}

function createDataForTable(values) {
  const tr = document.createElement("tr");

  values.forEach((value) => {
    const td = document.createElement("td");
    td.innerHTML = value;
    tr.appendChild(td);
  });

  return tr;
}

function isValid(values) {
  let result = true;

  values.forEach((value) => {
    if (value.trim().length === 0) {
      result = false;
    }
  });

  if (result) return result;

  alert("Preencha o formulário corretamente.");
  return false;
}

function handleSubmit(e) {
  e.preventDefault();

  const values = [...inputs].map((value) => value.value);

  if (!isValid(values)) return;

  tableBody.appendChild(createDataForTable(values));
  resetForm();
}

form.addEventListener("submit", handleSubmit);
