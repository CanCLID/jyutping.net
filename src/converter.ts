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
    } else {
      ipaOutput.appendChild(document.createTextNode(segment));
    }
  }
});
