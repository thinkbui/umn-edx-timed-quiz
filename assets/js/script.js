var clockInterval;
var timeRemaining = 20;
var timePenalty = 5;
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

// Begins the clock, sets the whole display, and initializes question list
function beginQuiz(event) {
  setClockDisplay();
  setFlashMessage("Click an answer");
  currentQuestionIndex = 0;
  loadCurrentQuestionContent();
  beginQuizElem.setAttribute("style", "visibility: hidden;");
  questionBoxElem.setAttribute("style", "visibility: visible;");
  startClock();
}

// Stops the clock, clears the question display, shows final game messages, and prompts for user initials for high score leaderboard
function endQuiz() {
  stopClock();
  questionBoxElem.setAttribute("style", "visibility: hidden");
  var player_initials = prompt(`Quiz over.  Final Score: ${score}\nPlease enter your initials:`);
  scoreHandler(player_initials);
  setFlashMessage("GAME OVER");
}

// Primary function to load the current question into the question display
function loadCurrentQuestionContent() {
  loadCurrentQuestionText();
  loadCurrentQuestionAnswerTexts();
}

// Primary function to load the next question when the previous one has been answered
// This is also where the app checks if the question list has been exhausted and to end the quiz
function loadNextQuestionContent() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadCurrentQuestionContent();
  } else {
    endQuiz();
  }
}

// Helper to simply load the question text into the appropriate box
function loadCurrentQuestionText() {
  document.getElementById("question").textContent = currentQuestion()["q"];
}

// Helper to simply load the answer texts into the appropriate boxes
function loadCurrentQuestionAnswerTexts() {
  for(i=0;i<4;i++) {
    document.getElementById(`answer${i}`).textContent = currentQuestionAnswerText(i);
  }
}

// Helper to simply load one answer text into the appropriate box
function currentQuestionAnswerText(a_index) {
  return currentQuestion()["a" + a_index];
}

// Helper to simply fetch which answer is the correct one
function currentQuestionCurrectAnswerIndex() {
  return currentQuestion()["a"];
}

// Helper to simply retrieve the current question data from the array
function currentQuestion() {
  return questions[currentQuestionIndex];
}

// This checks the user response against the current answer and triggers the appropriate handler before the next question is loaded
function answerHandler(event) {
  var answer_val = event.currentTarget.getAttribute("data-val");
  if (answer_val == currentQuestionCurrectAnswerIndex()) {
    answerCorrectHandler();
  } else {
    answerIncorrectHandler();
  }
  loadNextQuestionContent();
}

// Displays the flash message that the user response was correct and increments score
function answerCorrectHandler() {
  score++;
  setQuickFlashMessage("CORRECT", "Click an answer");
}

// Displays the flash message that the user response was not correct, decrements score, and deducts penalty from time
// Necessary to call setClockDisplay() here to update displayed time left immediately
function answerIncorrectHandler() {
  score--;
  if(timeRemaining <= timePenalty) {
    timeRemaining = 0;
  } else {
    timeRemaining -= timePenalty;
  }
  setClockDisplay();
  setQuickFlashMessage("INCORRECT", "Click an answer");
}

// Decrements the clock until it reaches 0, alerts the user that time has expired, and concludes the quiz
function clockTimer() {
  if (timeRemaining > 0){
    setClockDisplay();
    timeRemaining--;
  } else {
    setClockDisplay();
    alert("Time Expired");
    endQuiz();
  }
}

// Sets the decrementing to once per second
function startClock() {
  clockInterval = setInterval(clockTimer, 1000);
}

// Halts the decrementing
function stopClock() {
  clearInterval(clockInterval);
}

// Simply loads the seconds remaining into the timer box
function setClockDisplay() {
  document.getElementsByClassName("remaining")[0].textContent = timeRemaining;
}

// Displays one flash message briefly before displaying the next indefinitely
function setQuickFlashMessage(message1,message2) {
  setFlashMessage(message1);
  setTimeout(function() {
    if (timeRemaining > 0) {
      setFlashMessage(message2);
    }
  }, 1000);
}

// Displays the flash message
function setFlashMessage(message) {
  messageElem.textContent = message;
}

// Adds the user score to the high score list, sorts descending by score, then truncates the list if too long
function scoreHandler(player_initials){
  high_scores = getHighScores();
  high_scores.push([player_initials, score]);
  high_scores.sort(function(a,b) {return b[1] - a[1]});
  setHighScores(high_scores);
}

// Fetches the high scores from local storage
function getHighScores() {
  var high_scores_json = localStorage.getItem("umn-edx-timed-quiz-high-scores");
  if (!high_scores_json) {
    return [];
  }
  return JSON.parse(high_scores_json)["scores"];
}

// Stores the high scores into local storage
function setHighScores(score_data) {
  var high_scores_json = JSON.stringify({scores: score_data});
  localStorage.setItem("umn-edx-timed-quiz-high-scores", high_scores_json);
}
