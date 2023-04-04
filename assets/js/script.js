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
  beginQuizElem.setAttribute("style", "visibility: hidden;");
  questionBoxElem.setAttribute("style", "visibility: visible;");
  startClock();
}

function endQuiz() {
  questionBoxElem.setAttribute("style", "visibility: hidden");
  alert(`Quiz over.  Final Score: ${score}`);
}

function answerHandler(event) {
  var answer_val = event.currentTarget.getAttribute("data-val");
  messageElem.textContent = answer_val;
  setTimeout(function(){
    messageElem.textContent = "Click an answer"
  }, 1000);
}

function clockTimer() {
  if (timeRemaining > 0){
    document.getElementsByClassName("remaining")[0].textContent = timeRemaining;
    timeRemaining--;
  } else {
    document.getElementsByClassName("remaining")[0].textContent = timeRemaining;
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