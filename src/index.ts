import "core-js/actual/array/find-last-index";
import data from "./background.csv";
import "./index.css";

/*
0: Windows (fallback)
1: Mac
2: Linux
3: Android
4: iOS
*/
const target = ["", "Mac", "Linux", "Android", "iPhone|iPad|iPod"].findLastIndex(r => new RegExp(r, "i").test(navigator.userAgent));
const LINUX = 2;

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
  if (target <= LINUX) {
    // Desktop
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
  div.style.transform = `translateZ(-${(+z + 1) * 5}vw)`;
  div.className = "background-text";
  container.appendChild(div);
  return div;
});

// Setup custom scroll bar
function scrollListener() {
  scroll.style.top = (container.scrollTop / contentHeight) * thumbContentRatio * 100 + "%";
}
if (target <= LINUX) {
  // Desktop
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
} else {
  // Mobile
  scroll.style.display = "none";
}

// Hide parallax objects when they are not visible
const background = document.getElementById("background")!;
new IntersectionObserver(
  entries => {
    for (const { isIntersecting } of entries) {
      const display = isIntersecting ? "block" : "none";
      for (const div of divs) {
        div.style.display = display;
      }
      background.style.transform = isIntersecting ? "" : "none";
    }
  },
  { root: null, rootMargin: "0px", threshold: 0 },
).observe(document.getElementById("secondary")!);

// Set download buttons
const platforms = document.getElementById("platforms")!;
const display = platforms.children[target] as HTMLAnchorElement;

const link = display.href;
const inner = display.firstElementChild!;

const logo = inner.firstElementChild!;
const name = inner.children[1].textContent;

for (const id of ["btn-download-hero", "btn-download-final"]) {
  const element = document.getElementById(id) as HTMLAnchorElement;
  element.appendChild(logo.cloneNode(true));
  element.appendChild(document.createTextNode(target === LINUX ? "睇下 Linux 下點搞" : `下載 ${name} 版`));
  element.href = link;
}

// Make anchor buttons scroll smoothly
for (const anchor of document.getElementsByTagName("a")) {
  const href = anchor.getAttribute("href")!;
  if (href.startsWith("#")) {
    anchor.addEventListener("click", event => {
      event.preventDefault();
      document.querySelector(href)!.scrollIntoView({ behavior: "smooth", block: "start" });
      return false;
    });
  }
}

// Add Windows logo for Windows keyboard key
for (const item of document.getElementsByClassName("windows-key")) {
  item.appendChild(platforms.firstElementChild!.firstElementChild!.firstElementChild!.cloneNode(true));
}

// Set default tabs according to target platform
const selectPlatformTabs = document.getElementsByClassName("select-platform");

for (const item of selectPlatformTabs) {
  (item.children[target] as HTMLInputElement).checked = true;
}

// Set tabs when picking an alternative in the "Other Platforms" section
for (const [index, platform] of [...platforms.children].entries()) {
  const target = index === 5 ? 4 : index;
  if (target < 5) {
    platform.addEventListener("click", () => {
      for (const item of selectPlatformTabs) {
        (item.children[target] as HTMLInputElement).checked = true;
      }
    });
  }
}

// Start animation when an element enters viewport
const observer = new IntersectionObserver(
  entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) {
        target.classList.add("![animation-play-state:running]");
        observer.unobserve(target);
      }
    }
  },
  { root: null, rootMargin: "0px", threshold: 0.5 },
);

for (const element of document.getElementsByClassName("enter-lazy")) {
  observer.observe(element);
}

// Special animation for platform buttons
new IntersectionObserver(
  entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) {
        target.classList.add("animation-platform-running");
        observer.unobserve(target);
      }
    }
  },
  { root: null, rootMargin: "0px", threshold: 0.25 },
).observe(document.getElementById("other")!);
