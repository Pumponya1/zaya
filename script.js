const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Heart{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*20+10;
    this.speed = Math.random()*0.5+0.2;
  }
  draw(){
    ctx.fillStyle="rgba(255,100,150,0.8)";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x-this.size/2,this.y-this.size/2,this.x-this.size,this.y+this.size/3,this.x,this.y+this.size);
    ctx.bezierCurveTo(this.x+this.size,this.y+this.size/3,this.x+this.size/2,this.y-this.size/2,this.x,this.y);
    ctx.fill();
  }
  update(){
    this.y+=this.speed;
    if(this.y>canvas.height){
      this.y=0;
      this.x=Math.random()*canvas.width;
    }
    this.draw();
  }
}

let hearts=[];
for(let i=0;i<40;i++){
  hearts.push(new Heart());
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hearts.forEach(h=>h.update());
  requestAnimationFrame(animate);
}
animate();

// Слайды
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index){
  slides.forEach((slide,i)=>{
    slide.classList.remove("active");
    if(i===index){
      slide.classList.add("active");
    }
  });
}

// Музыка
const music = document.getElementById("bg-music");
let musicStarted = false;

function playMusicOnce() {
  if (!musicStarted) {
    music.play();
    musicStarted = true;
  }
}

document.querySelector(".next").addEventListener("click", ()=>{
  currentSlide = (currentSlide+1) % slides.length;
  showSlide(currentSlide);
  playMusicOnce();
});

document.querySelector(".prev").addEventListener("click", ()=>{
  currentSlide = (currentSlide-1+slides.length) % slides.length;
  showSlide(currentSlide);
  playMusicOnce();
});

showSlide(currentSlide);
