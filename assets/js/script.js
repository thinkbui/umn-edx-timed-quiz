var clockInterval;
var timeRemaining = 5;
var score = 0;
var currentQuestionIndex;
var messageElem = document.getElementsByClassName("message")[0];
var beginQuizElem = document.getElementsByClassName("quiz_begin")[0];
var beginQuizButton = beginQuizElem.getElementsByTagName("button")[0];
var questionBoxElem = document.getElementsByTagName("article")[0];

var answerElems = document.getElementsByClassName("answer");
for (i=0;i<answerElems.length;i++) {
  answerElems[i].addEventListener("click", answerHandler);
}

beginQuizButton.addEventListener("click", beginQuiz);

function beginQuiz(event) {
  setClockDisplay();
  setFlashMessage("Click an answer");
  currentQuestionIndex = 0;
  loadCurrentQuestionContent();
  beginQuizElem.setAttribute("style", "visibility: hidden;");
  questionBoxElem.setAttribute("style", "visibility: visible;");
  startClock();
}

function endQuiz() {
  questionBoxElem.setAttribute("style", "visibility: hidden");
  setFlashMessage("GAME OVER");
  alert(`Quiz over.  Final Score: ${score}`);
}

function loadCurrentQuestionContent() {
  loadCurrentQuestionText();
  loadCurrentQuestionAnswerTexts();
}

function loadNextQuestionContent() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadCurrentQuestionContent();
  } else {
    stopClock();
  }
}

function loadCurrentQuestionText() {
  document.getElementById("question").textContent = currentQuestion()["q"];
}

function loadCurrentQuestionAnswerTexts() {
  for(i=0;i<4;i++) {
    document.getElementById(`answer${i}`).textContent = currentQuestionAnswerText(i);
  }
}

function currentQuestionAnswerText(a_index) {
  return currentQuestion()["a" + a_index];
}

function currentQuestionCurrectAnswerIndex() {
  return currentQuestion()["a"];
}

function currentQuestion() {
  return questions[currentQuestionIndex];
}

function answerHandler(event) {
  var answer_val = event.currentTarget.getAttribute("data-val");
  if (answer_val == currentQuestionCurrectAnswerIndex()) {
    answerCorrectHandler();
  } else {
    answerIncorrectHandler();
  }
  loadNextQuestionContent();
}

function answerCorrectHandler() {
  score++;
  setQuickFlashMessage("CORRECT", "Click an answer");
}

function answerIncorrectHandler() {
  score--;
  setQuickFlashMessage("INCORRECT", "Click an answer");
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

function setQuickFlashMessage(message1,message2) {
  setFlashMessage(message1);
  setTimeout(function() {
    if (timeRemaining > 0) {
      setFlashMessage(message2);
    }
  }, 1000);
}

function setFlashMessage(message) {
  messageElem.textContent = message;
}
