import "core-js/actual/array/find-last-index";
import data = require("./background.csv");
import "./index.css";

/*
0: Windows (fallback)
1: Mac
2: Linux
3: Android
4: iOS
*/
const target = ["", "Mac", "Linux", "Android", "iPhone|iPad|iPod"].findLastIndex(r => new RegExp(r, "i").test(navigator.userAgent));

// Correct height for mobiles and set scroll height
const hero = document.getElementById("hero")!;
const container = document.getElementById("container")!;
const content = document.getElementById("content")!;
const scroll = document.getElementById("scroll")!;
let rem: number;
let screenHeight: number;
let contentHeight: number;
let contentHeightRatio: number;
let thumbHeightRatio: number;
let thumbContentRatio: number;
((callback: () => void) => {
  addEventListener("resize", callback);
  addEventListener("load", callback);
  callback();
})(() => {
  hero.style.minHeight = innerHeight + "px";
  if (target < 3) {
    rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    screenHeight = container.clientHeight;
    contentHeight = content.clientHeight;
    contentHeightRatio = screenHeight / contentHeight;
    thumbHeightRatio = Math.max(contentHeightRatio, rem / screenHeight);
    thumbContentRatio = (1 - thumbHeightRatio) / (1 - contentHeightRatio);
    scroll.style.height = thumbHeightRatio * 100 + "%";
    scrollListener();
  }
});

// Create parallax objects
const colors = ["#ffbb5c", "#ffde69", "#a55cff", "#75caff", "#6f37b3", "#5b91b3"];
const divs = data.map(({ w, x, y, z }) => {
  const div = document.createElement("div");
  div.textContent = w;
  div.style.color = colors[z];
  div.style.left = x + "vw";
  div.style.top = y + "vw";
  div.style.transform = `translateZ(-${(z + 1) * 5}vw)`;
  div.className = "background-text";
  container.appendChild(div);
  return div;
});

// Setup custom scroll bar
function scrollListener() {
  scroll.style.top = (container.scrollTop / contentHeight) * thumbContentRatio * 100 + "%";
}
if (target < 3) {
  container.addEventListener("scroll", scrollListener);
  scroll.addEventListener("mousedown", event => {
    event.preventDefault();
    container.removeEventListener("scroll", scrollListener);
    const delta = scroll.offsetTop - event.pageY;
    function mouseMove(event: MouseEvent) {
      event.preventDefault();
      const value = Math.min(Math.max((event.pageY + delta) / screenHeight / thumbContentRatio, 0), 1 - contentHeightRatio);
      scroll.style.top = value * thumbContentRatio * 100 + "%";
      container.scrollTop = contentHeight * value;
    }
    function mouseUp() {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      container.addEventListener("scroll", scrollListener);
    }
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  });
} else scroll.style.display = "none";

// Hide parallax objects when they are not visible
const background = document.getElementById("background")!;
new IntersectionObserver(
  entries => {
    entries.forEach(({ isIntersecting }) => {
      const display = isIntersecting ? "block" : "none";
      divs.forEach(div => (div.style.display = display));
      background.style.transform = isIntersecting ? "" : "none";
    });
  },
  { root: null, rootMargin: "0px", threshold: 0 }
).observe(document.getElementById("secondary")!);

// Set download buttons
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
