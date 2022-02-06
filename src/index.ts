import "core-js/actual/array/find-last-index";
import data = require("./background.csv");
import "./index.css";

// Correct height for mobiles
const hero = document.getElementById("hero")!;
const content = document.getElementById("content")!;
const scroll = document.getElementById("scroll")!;
const resize = () => {
  hero.style.minHeight = innerHeight + "px";
  scroll.style.height = content.clientHeight + "px";
};
addEventListener("resize", resize);
addEventListener("load", resize);

const container = document.getElementById("container")!;
const colors = ["#ffbb5c", "#ffde69", "#a55cff", "#75caff", "#6f37b3", "#5b91b3"];
data.forEach(({ w, x, y, z }) => {
  const div = document.createElement("div");
  div.textContent = w;
  div.style.color = colors[z];
  div.style.left = x + "vw";
  div.style.top = y + "vw";
  div.style.transform = `translateZ(-${(z + 1) * 5}vw)`;
  div.className = "background-text";
  container.appendChild(div);
});

((left: HTMLElement, right: HTMLElement) => {
  let valLeft = left.scrollTop,
    valRight = right.scrollTop;
  (function loop() {
    if (left.scrollTop !== valLeft) right.scrollTop = valRight = left.scrollTop;
    if (right.scrollTop !== valRight) left.scrollTop = valLeft = right.scrollTop;
    requestAnimationFrame(loop);
  })();
})(container, document.getElementById("scroller")!);

/*
Set download buttons
0: Windows (fallback)
1: Mac
2: Linux
3: Android
4: iOS
*/
const target = ["", "Mac", "Linux", "Android", "iPhone|iPad|iPod"].findLastIndex(r => new RegExp(r, "i").test(navigator.userAgent));

const platforms = document.getElementById("platforms")!;
const display = platforms.children[target] as HTMLAnchorElement;

const link = display.href;
const inner = display.firstElementChild!;

const logo = inner.firstElementChild!;
const name = inner.children[1].textContent;

["btn-download-hero", "btn-download-final"].forEach(id => {
  const element = document.getElementById(id) as HTMLAnchorElement;
  element.appendChild(logo.cloneNode(true));
  element.appendChild(document.createTextNode(target === 2 ? "睇下 Linux 下點搞" : `下載 ${name} 版`));
  element.href = link;
});

// Make "其他版本" button scroll smoothly
const other = document.getElementById("other")!;

document.getElementById("btn-more")!.addEventListener("click", event => {
  event.preventDefault();
  other.scrollIntoView({ behavior: "smooth", block: "start" });
  return false;
});

// Make "我已經用緊 Rime" button scroll smoothly
const faq = document.getElementById("faq")!;

document.getElementById("btn-rime")!.addEventListener("click", event => {
  event.preventDefault();
  faq.scrollIntoView({ behavior: "smooth", block: "start" });
  return false;
});

// Add Windows logo for Windows keyboard key
[].forEach.call(document.getElementsByClassName("windows-key"), (item: HTMLElement) => {
  item.appendChild(platforms.firstElementChild!.firstElementChild!.firstElementChild!.cloneNode(true));
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
