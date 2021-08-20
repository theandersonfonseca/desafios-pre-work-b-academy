import "./style.css";

const URL = "http://localhost:3333/cars";

const tableBody = document.querySelector('[data-js="table-body"]');
const tableWarning = document.querySelector('[data-js="table-warning"]');
const form = document.querySelector('[data-js="cars-form"]');
const inputs = document.querySelectorAll('[data-js="input"]');
const errorMsg = document.querySelector('[data-js="error-msg"]');

function createDataForTable(values) {
  const tr = document.createElement("tr");

  values.forEach((value) => {
    const td = document.createElement("td");
    td.innerHTML = value;
    tr.appendChild(td);
  });

  return tr;
}

function addCarsToTable(cars) {
  tableBody.innerHTML = "";
  tableWarning.parentElement.style.display = "none";

  cars.forEach((car) => {
    tableBody.appendChild(createDataForTable(Object.values(car)));
  });
}

async function getCars() {
  errorMsg.style.display = "none";
  tableWarning.innerHTML = "Carregando...";

  let data;

  try {
    const response = await fetch(URL);
    data = await response.json();
  } catch (err) {
    tableWarning.innerHTML = "Não foi possível receber os dados";

    return;
  }

  if (data.length === 0) {
    tableWarning.innerHTML = "Nenhum carro encontrado";

    return;
  }

  addCarsToTable(data);
}

getCars();

function resetForm() {
  inputs.forEach((value) => (value.value = ""));
  inputs[0].focus();
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

async function postCar(values) {
  let response;

  try {
    response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  } catch (err) {
    console.log(err);

    return;
  }
  if (response.status === 400) {
    const responseJson = await response.json();

    errorMsg.style.display = "block";
    errorMsg.innerHTML = responseJson.message;

    return;
  }

  getCars();
}

function getFormElement(e) {
  return (element) => e.target.elements[element].value;
}

function handleSubmit(e) {
  e.preventDefault();

  const getValue = getFormElement(e);

  const values = {
    image: getValue("url"),
    brandModel: getValue("marca"),
    year: getValue("ano"),
    plate: getValue("placa"),
    color: getValue("cor"),
  };

  if (!isValid(Object.values(values))) return;

  postCar(values);
  resetForm();
}

form.addEventListener("submit", handleSubmit);
