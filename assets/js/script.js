// console.log("Script present");
const clockInterval = setInterval(clockTimer, 1000);
var timeRemaining = 5;
var messageElem = document.getElementsByClassName("message")[0];

var answerElems = document.getElementsByClassName("answer");
for (i=0;i<answerElems.length;i++) {
  // console.log(answerElems[i].id);
  answerElems[i].addEventListener("click", answerHandler);
}

function answerHandler(event) {
  var answer_val = event.currentTarget.getAttribute("data-val");
  messageElem.textContent = answer_val;
  setTimeout(function(){
    messageElem.textContent = "Click an answer"
  }, 1000);
}

function clockTimer() {
  document.getElementsByClassName("remaining")[0].textContent = timeRemaining;
  timeRemaining--;
}

function stopClock() {
  clearInterval(clockInterval);
}