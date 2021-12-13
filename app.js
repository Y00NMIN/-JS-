const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle =INITIAL_COLOR; //context안에있는 선은 모두 이 색을 가진다.
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth=2.5; //그 선의 너비는 2.5px이다.

let painting = false;
let filling =false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;

  if(!painting) {
    ctx.beginPath(); //Path는 선이다.
    ctx.moveTo(x, y); //path를 x,y로 옮긴다.
  } else {
    ctx.lineTo(x, y); //linto는 path전에서 현재 path까지
    ctx.stroke(); //stroke 즉, 획을 긋는다.
  }
} 

function onMouseDown(event){
  painting = true;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth= size;
}

function handleModeClick() {
  if(filling == true){
    filling = false;
    mode.innerText ="Fill";
  }else{
    filling =true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0 , 0 , CANVAS_SIZE , CANVAS_SIZE );
  } 
}

function handleCM(event){
  event.preventDefault();
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click",handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}


if (mode) {
  mode.addEventListener("click", handleModeClick);
}
