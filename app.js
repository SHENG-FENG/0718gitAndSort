let inputText = document.querySelector(".inputText");
let inputMonth = document.querySelector(".inputMonth");
let inputDay = document.querySelector(".inputDay");
let button = document.querySelector("button");
let sort = document.querySelector(".sort");
button.addEventListener("click", () => {
  events = inputText.value;
  let x = document.createElement("p");
  x.innerHTML = events;
  sort.appendChild(x);
  inputText.value = "";
});
