const form = document.querySelector('[data-js="form"]');
const inputName = document.querySelector('[data-js="input-name"]');

function capitalize(value, exceptions) {
  return value
    .map((string) => {
      if (exceptions && exceptions.includes(string)) return string;

      return string.charAt(0).toUpperCase() + string.slice(1);
    })
    .join(" ");
}

function setInputValue(e) {
  const value = e.target.value.toLowerCase().split(" ");
  const exceptions = ["de", "da", "do", "dos"];

  e.target.value = capitalize(value, exceptions);
}

inputName.addEventListener("input", setInputValue);

function createSelectElement() {
  const selectElement = document.createElement("select");

  selectElement.setAttribute("data-js", "select");
  selectElement.setAttribute("multiple", true);
  selectElement.setAttribute("name", "colors");

  selectElement.classList.add("select");

  const colors = ["red", "blue", "green", "black", "yellow"];

  colors.forEach((color) => {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", color);
    optionElement.innerHTML = color;

    selectElement.appendChild(optionElement);
  });

  return selectElement;
}

const challengeTitle = document.createElement("h2");
challengeTitle.innerHTML = "Exercício 2";

form.appendChild(challengeTitle);
form.appendChild(createSelectElement());

const squaresWrapper = document.createElement("div");
squaresWrapper.classList.add("squares-wrapper");
form.insertBefore(squaresWrapper, squaresWrapper.nextSibling);

function createSquareElements(e) {
  squaresWrapper.innerHTML = "";

  const options = [...e.target.options];

  options.forEach((option) => {
    if (option.selected) {
      const square = document.createElement("div");
      square.classList.add(`square`);
      square.classList.add(`${option.value}-square`);

      squaresWrapper.appendChild(square);
    }
  });
}

const select = document.querySelector('[data-js="select"]');
select.addEventListener("input", createSquareElements);
