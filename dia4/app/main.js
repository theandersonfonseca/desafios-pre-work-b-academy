import "./style.css";

const URL = "http://localhost:3333/cars";

const tableBody = document.querySelector('[data-js="table-body"]');
const tableWarning = document.querySelector('[data-js="table-warning"]');

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
  tableWarning.parentElement.style.display = "none";

  cars.forEach((car) => {
    tableBody.appendChild(createDataForTable(Object.values(car)));
  });
}

async function getCars() {
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
