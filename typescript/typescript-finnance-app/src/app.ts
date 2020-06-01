import { ListTemplate } from './models/ListTemplate';
import { Formatter } from "./interfaces/Formatter";
import { Payment } from "./models/Payment";
import { Invoice } from "./models/Invoice";

const ul = document.querySelector("ul")!;
const list = new ListTemplate(ul);

const form = document.querySelector(".new-item-form") as HTMLFormElement;
const type = document.querySelector("#type") as HTMLSelectElement;
const toFrom = document.querySelector("#toFrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  let doc: Formatter;
  if (type.value === "invoice") {
    doc = new Invoice(toFrom.value, details.value, amount.valueAsNumber);
  } else {
    doc = new Payment(toFrom.value, details.value, amount.valueAsNumber);
  }
  list.render(doc, type.value, "end");
});
