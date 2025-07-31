import ToJyutping from "to-jyutping";
import "./converter.css";

const cantoneseInput = document.getElementById("cantonese-input") as HTMLTextAreaElement;
const jyutpingOutput = document.getElementById("jyutping-output") as HTMLOutputElement;
const ipaOutput = document.getElementById("ipa-output") as HTMLOutputElement;

const ipaSeparators = /([.|‖])/;

cantoneseInput.addEventListener("input", () => {
  jyutpingOutput.value = ToJyutping.getJyutpingText(cantoneseInput.value);

  ipaOutput.textContent = "";
  for (const segment of ToJyutping.getIPAText(cantoneseInput.value).split(ipaSeparators)) {
    if (ipaSeparators.test(segment)) {
      const span = document.createElement("span");
      span.textContent = segment;
      ipaOutput.appendChild(span);
      ipaOutput.appendChild(document.createElement("wbr"));
    } else {
      ipaOutput.appendChild(document.createTextNode(segment));
    }
  }
});

for (const btnCopy of document.getElementsByClassName("btn-copy") as HTMLCollectionOf<HTMLButtonElement>) {
  btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(document.getElementById((btnCopy.previousElementSibling as HTMLLabelElement).htmlFor)!.textContent!);
    btnCopy.dataset["tip"] = "已複製！";
    btnCopy.classList.remove("tooltip-open-temporarily");
    btnCopy.offsetWidth; // Trigger DOM reflow
    btnCopy.classList.add("tooltip-open-temporarily");
  });
}
