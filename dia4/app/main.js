import "./style.css";

const URL = "http://localhost:3333/cars";

const tableBody = document.querySelector('[data-js="table-body"]');
const tableWarning = document.querySelector('[data-js="table-warning"]');
const form = document.querySelector('[data-js="cars-form"]');
const inputs = document.querySelectorAll('[data-js="input"]');
const msg = document.querySelector('[data-js="msg"]');

function createDeleteButton() {
  const td = document.createElement("td");
  const deleteBtn = document.createElement("button");

  deleteBtn.innerHTML = "Deletar";
  deleteBtn.setAttribute("data-js", "delete-car");

  td.appendChild(deleteBtn);

  return td;
}

function createDataForTable(values) {
  const tr = document.createElement("tr");

  values.forEach((value) => {
    const td = document.createElement("td");
    td.innerHTML = value;
    tr.appendChild(td);
  });

  tr.appendChild(createDeleteButton());

  return tr;
}

function addCarsToTable(cars) {
  tableBody.innerHTML = "";
  tableWarning.parentElement.style.display = "none";

  cars.forEach((car) => {
    tableBody.appendChild(createDataForTable(Object.values(car)));
  });

  document
    .querySelectorAll('[data-js="delete-car"]')
    .forEach((car) => car.addEventListener("click", deleteCar));
}

async function getCars() {
  msg.classList.remove("msg__error");

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

async function deleteCar(e) {
  const plate = e.target.parentElement.parentElement.children[3].innerHTML;
  let response;

  try {
    response = await fetch(URL, {
      method: "DELETE",
      body: JSON.stringify({
        plate,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  } catch (err) {
    console.log(err);

    return;
  }

  if (response.status === 400) {
    const responseJson = await response.json();

    msg.classList.add("msg__error");
    msg.innerHTML = responseJson.message;

    return;
  }

  const responseJson = await response.json();

  msg.classList.add("msg__success");
  msg.innerHTML = responseJson.message;

  window.location.reload();
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

    msg.classList.add("msg__error");
    msg.innerHTML = responseJson.message;

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
