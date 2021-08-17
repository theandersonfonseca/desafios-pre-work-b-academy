import "./style.css";

const app = document.querySelector('[data-js="app"]');
const link = document.querySelector('[data-js="toggle-visibility"]');

app.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`;

function toggleVisibility() {
  app.classList.toggle("app__hidden");

  const linkText = app.classList.contains("app__hidden") ? "Show" : "Hide";

  link.innerHTML = linkText;
}

link.addEventListener("click", toggleVisibility);
