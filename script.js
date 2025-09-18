// State
let currentMode="", currentCategory="", currentCard=null, askInFrench=true;
let score=0;
let remainingCards=[];

// Menus
function showSubMenu(mode){
  currentMode=mode; 
  document.getElementById("menu").classList.add("fade-out"); 
  setTimeout(()=>{
    document.getElementById("menu").style.display="none"; 
    document.getElementById("submenu").style.display="block"; 
    document.getElementById("menu").classList.remove("fade-out");
  },300);
}

function goBackToMain(){
  document.getElementById("submenu").style.display="none";
  document.getElementById("score-card").style.display="none";
  document.getElementById("menu").style.display="block";
}

function startGame(mode,category){
  currentMode=mode; 
  currentCategory=category; 
  score=0;
  remainingCards = [...(category==='infinitives'?infinitives:subjects)];
  document.getElementById("submenu").classList.add("fade-out"); 
  setTimeout(()=>{
    document.getElementById("submenu").style.display="none"; 
    document.getElementById("game").style.display="block"; 
    document.getElementById("submenu").classList.remove("fade-out");
    nextWord();
  },300);
}

// Next Word
function nextWord(){
  if(remainingCards.length===0){
    finishGame(); 
    return;
  }
  const answerBox=document.getElementById("answer");
  answerBox.value=""; 
  answerBox.className=""; 
  answerBox.focus();
  const idx=Math.floor(Math.random()*remainingCards.length); 
  currentCard=remainingCards.splice(idx,1)[0];
  askInFrench = currentMode==='fr-en'?true:currentMode==='en-fr'?false:Math.random()<0.5;
  document.getElementById("display-word").textContent = askInFrench?currentCard.fr:currentCard.en;
}

// Input Handling
document.getElementById("answer").addEventListener("input",function(){
  const answerBox=document.getElementById("answer");
  let correct = askInFrench?currentCard.en:currentCard.fr; 
  let val=answerBox.value.trim();
  
  if(val === "") {
    answerBox.className = "";
    return;
  }
  
  if(val.toLowerCase()===correct.toLowerCase()){
    answerBox.className="correct"; 
    score++; 
    setTimeout(nextWord,300);
  }
  else if(val.length>=correct.length){
    answerBox.className="incorrect";
  }
});

// Right Shift Peek
let peekTimeout;
document.addEventListener("keydown", function(e){
  if(e.code==="ShiftRight" && currentCard){
    clearTimeout(peekTimeout);
    document.getElementById("display-word").style.opacity = 0;
    
    peekTimeout = setTimeout(() => {
      document.getElementById("display-word").textContent = askInFrench?currentCard.en:currentCard.fr;
      document.getElementById("display-word").style.opacity = 1;
    }, 150);
  }
});

document.addEventListener("keyup", function(e){
  if(e.code==="ShiftRight" && currentCard){
    clearTimeout(peekTimeout);
    document.getElementById("display-word").style.opacity = 0;
    
    peekTimeout = setTimeout(() => {
      document.getElementById("display-word").textContent = askInFrench?currentCard.fr:currentCard.en;
      document.getElementById("display-word").style.opacity = 1;
    }, 150);
  }
});

// Finish
function finishGame(){
  document.getElementById("game").classList.add("fade-out"); 
  setTimeout(()=>{
    document.getElementById("game").style.display="none"; 
    document.get
