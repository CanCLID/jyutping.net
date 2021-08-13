import "./index.css";

const mapping = { [-1]: 3, 0: 0, 1: 1, 2: 2, 3: 4 };
const target = [/Win/i, /Mac/i, /Linux/i, /iPhone|iPad|iPod/i].findIndex(item => item.test(navigator.platform));

const platforms = document.getElementById("platforms");
const display = platforms.children[mapping[target]] as HTMLAnchorElement;

const link = display.href;
const inner = display.firstElementChild;

const logo = inner.firstElementChild;
const name = inner.children[1].textContent;

["btn-download-header", "btn-download-hero", "btn-download-final"].forEach(id => {
  const element = document.getElementById(id) as HTMLAnchorElement;
  element.appendChild(logo.cloneNode(true));
  element.appendChild(document.createTextNode(`下載 ${name} 版`));
  element.href = link;
});
