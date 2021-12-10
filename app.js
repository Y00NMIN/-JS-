const canvas = document.querySelector("#jsCanvas");
const ctx =canvas.getContext("2d");
const colors = document.querySelector(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector(".jsMode");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle ="#2c2c2c"; //context안에있는 선은 모두 이 색을 가진다.
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

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth= size;
}

function handleModeClick(event) {
  if(filling == true){
    filling = false;
    mode.innerText ="Fill";
  }else{
    filling =true;
    mode.innerText = "Paint";
  }
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color=>color.addEventListner("click", handleColorClick));

if(range){
  range.addEventListner("input",handleRangeChange);
}

if(mode){
  mode.addEventListner("click", handleModeClick);
}
