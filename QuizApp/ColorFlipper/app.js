const colors = [
  "green",
  "red",
  "blue",
  "#fcba03",
  "rgb(179, 25, 168)",
  "#445240",
];

const mainContainer = document.querySelector(".central-container");
console.log(mainContainer);

const btn = document.querySelector(".btn");
console.log(btn);

const color = document.getElementById("color");

let currentColor = 0;

btn.addEventListener("click", () => {
  document.body.style.backgroundColor = colors[currentColor];

  if (currentColor < colors.length) {
    color.innerText = colors[currentColor];
    currentColor++;
  } else {
    currentColor = 0;
  }
});
