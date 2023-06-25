let colorOptionsArr =[{color: "#00293c"},
                       {color: "#329691"},
                       {color: "#936B95"},
                       {color: "#F67820"}
];

const colorOptions = document.getElementById("color-options");
const colorPlayGround = document.getElementById("play-ground");

for (let i = 0; i < colorOptionsArr.length; i++) {
  const colorCell = document.createElement("div");
  colorCell.id = colorOptionsArr[i].color;
  colorCell.style.backgroundColor = colorOptionsArr[i].color;
  colorCell.classList.add("color-cell");
  // colorCell element is appended as a child to the colorOptions element using colorOptions.appendChild(colorCell), 
  // which adds each color option to the "color-options" container in the HTML document.
  colorOptions.appendChild(colorCell);
}

let colorPlayArea = [];

for (let i = 0; i < 10; i++) {
  const subPlay = document.createElement("div");
  subPlay.classList.add("sub-play");
  let arrTmp = [];

  for (let j = 0; j < 10; j++) {
    const colorCell = document.createElement("div");
    colorCell.id = i * 10 + j;
    arrTmp[j] =
      colorOptionsArr[Math.floor(Math.random() * colorOptionsArr.length)].color;
    colorCell.style.backgroundColor = arrTmp[j];
    colorCell.classList.add("color-Play-cell");
    subPlay.appendChild(colorCell);
  }
  colorPlayArea[i] = arrTmp;// storing the color values 
  colorPlayGround.appendChild(subPlay);// displaying the rows of cell having different colors
}

colorOptions.addEventListener("click", pickcolor); 
colorOptions.addEventListener("click",select_sound);
colorPlayGround.addEventListener("click", floodFillCall);
colorPlayGround.addEventListener("click",select_sound);

let colorPicked = "";

// basically the below function tells which color has been chosen
function pickcolor(event) {
  colorPicked = event.target.id;
  console.log("color picked - " + colorPicked);
}

// this function is used to add sound effect when we click on the cell
function select_sound(event){
    let mySound = new Audio();
    mySound.src="ring.wav";
    mySound.play();
}


function floodFillCall(event) {
  console.log(event.target.id + " CLICKED");
  if (event.target.id.length < 1) return;

  if (colorPicked == "") {
    alert("pick color first");
    return;
  }
  let id = +event.target.id;  // + sign is used to convert string to numeric value

  let i = Math.floor(id / 10);
  let j = id % 10;
  floodFill(i, j, colorPlayArea[i][j]);
}

function floodFill(i, j, dropColor) {
  console.log("floodFillcalled", colorPicked, dropColor);
  if (colorPlayArea[i][j] == colorPicked) return;
  colorPlayArea[i][j] = colorPicked;
  document.getElementById(i * 10 + j).style.backgroundColor =
    colorPlayArea[i][j];

  if (i > 0 && dropColor == colorPlayArea[i - 1][j]) {
    floodFill(i - 1, j, dropColor);
  }
  if (i < colorPlayArea.length - 1 && dropColor == colorPlayArea[i + 1][j]) {
    floodFill(i + 1, j, dropColor);
  }
  if (j > 0 && dropColor == colorPlayArea[i][j - 1]) {
    floodFill(i, j - 1, dropColor);
  }
  if (j < colorPlayArea[i].length - 1 && dropColor == colorPlayArea[i][j + 1]) {
    floodFill(i, j + 1, dropColor);
  }
  return;
}