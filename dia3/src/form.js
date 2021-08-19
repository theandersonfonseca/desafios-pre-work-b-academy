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
