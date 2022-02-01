import "./index.css";

// Correct height for mobiles
const hero = document.getElementById("hero");
const resize = () => {
  hero.style.minHeight = innerHeight + "px";
};
addEventListener("resize", resize);
addEventListener("load", resize);

// Set download buttons
// 0: Windows
// 1: iOS
// 2: Android
// 3: Linux
// 4: Mac
const mapping = { [-1]: 0, 0: 0, 1: 4, 2: 3, 3: 2, 4: 1 };
const target = mapping[[/Win/i, /iPhone|iPad|iPod/i, /Android/i, /Linux/i, /Mac/i].findIndex(r => r.test(navigator.userAgent))];

const platforms = document.getElementById("platforms");
const display = platforms.children[target] as HTMLAnchorElement;

const link = display.href;
const inner = display.firstElementChild;

const logo = inner.firstElementChild;
const name = inner.children[1].textContent;

["btn-download-hero", "btn-download-final"].forEach(id => {
  const element = document.getElementById(id) as HTMLAnchorElement;
  element.appendChild(logo.cloneNode(true));
  if (target !== 2) {
    element.appendChild(document.createTextNode(`下載 ${name} 版`));
  } else {
    element.appendChild(document.createTextNode("睇下 Linux 下點搞"));
  }
  element.href = link;
});

// Make "其他版本" button scroll smoothly
const other = document.getElementById("other");

document.getElementById("btn-more").addEventListener("click", event => {
  event.preventDefault();
  other.scrollIntoView({ behavior: "smooth", block: "start" });
  return false;
});

// Make "我已經用緊 Rime" button scroll smoothly
const faq = document.getElementById("faq");

document.getElementById("btn-rime").addEventListener("click", event => {
  event.preventDefault();
  faq.scrollIntoView({ behavior: "smooth", block: "start" });
  return false;
});

// Add Windows logo for Windows keyboard key
[].forEach.call(document.getElementsByClassName("windows-key"), (item: HTMLElement) => {
  item.appendChild(platforms.firstElementChild.firstElementChild.firstElementChild.cloneNode(true));
});

// Set default tabs according to target platform
[].forEach.call(document.getElementsByClassName("select-platform"), (item: HTMLDivElement) => {
  (item.children[target] as HTMLInputElement).checked = true;
});

// Start animation when an element enters viewport
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add("animation-running");
        observer.unobserve(target);
      }
    });
  },
  { root: null, rootMargin: "0px", threshold: 0.5 }
);

[].forEach.call(document.getElementsByClassName("enter-lazy"), (element: Element) => observer.observe(element));

// Special animation for platform buttons
new IntersectionObserver(
  entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add("animation-platform-running");
        observer.unobserve(target);
      }
    });
  },
  { root: null, rootMargin: "0px", threshold: 0.25 }
).observe(other);

/*
// auto scroll through hero
const hero = document.getElementById("hero");
const secondary = document.getElementById("secondary");

let prev = 0.98;
new IntersectionObserver(
  entries => {
    entries.forEach(({ intersectionRatio }) => {
      (intersectionRatio > prev ? hero : secondary).scrollIntoView({ behavior: "smooth", block: "start" });
      prev = intersectionRatio;
    });
  },
  { root: null, rootMargin: "0px", threshold: [0.01, 0.99] }
).observe(hero);
*/
