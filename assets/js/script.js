// console.log("Script present");
var clockInterval;
var timeRemaining = 5;
var score = 0;
var messageElem = document.getElementsByClassName("message")[0];
var beginQuizElem = document.getElementsByClassName("quiz_begin")[0];
var beginQuizButton = beginQuizElem.getElementsByTagName("button")[0];
var questionBoxElem = document.getElementsByTagName("article")[0];

var answerElems = document.getElementsByClassName("answer");
for (i=0;i<answerElems.length;i++) {
  // console.log(answerElems[i].id);
  answerElems[i].addEventListener("click", answerHandler);
}

beginQuizButton.addEventListener("click", beginQuiz);

function beginQuiz(event) {
  setClockDisplay();
  setFlashMessage("Click an answer");
  beginQuizElem.setAttribute("style", "visibility: hidden;");
  questionBoxElem.setAttribute("style", "visibility: visible;");
  startClock();
}

function endQuiz() {
  questionBoxElem.setAttribute("style", "visibility: hidden");
  setFlashMessage("GAME OVER");
  alert(`Quiz over.  Final Score: ${score}`);
}

function answerHandler(event) {
  var answer_val = event.currentTarget.getAttribute("data-val");
  setFlashMessage(answer_val);
  setTimeout(function(){
    if (timeRemaining > 0) {
      setFlashMessage("Click an answer");
    }
  }, 1000);
}

function clockTimer() {
  if (timeRemaining > 0){
    setClockDisplay();
    timeRemaining--;
  } else {
    setClockDisplay();
    stopClock();
    alert("Time Expired");
    endQuiz();
  }
}

function startClock() {
  clockInterval = setInterval(clockTimer, 1000);
}

function stopClock() {
  clearInterval(clockInterval);
}

function setClockDisplay() {
  document.getElementsByClassName("remaining")[0].textContent = timeRemaining;
}

function setFlashMessage(message) {
  messageElem.textContent = message;
}
