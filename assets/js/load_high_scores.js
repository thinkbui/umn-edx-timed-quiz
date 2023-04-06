var highScoreBodyElem = document.getElementById("high_score_body");

function populateScoreTable() {
  var high_scores = getHighScores();
  if(high_scores.length > 0) {
    for(i=0;i<high_scores.length;i++) {
      insertHighScore(high_scores[i]);
    }
  } else {
    insertBlankScore();
  }
}

function insertHighScore(high_score) {
  highScoreBodyElem.appendChild(buildHighScoreRow(high_score));
}

function insertBlankScore() {
  var trElem = document.createElement("tr");
  var tdElem = document.createElement("td");
  tdElem.setAttribute("colspan", 2);
  tdElem.classList.add("blank_score_cell");
  tdElem.textContent = "(none)";
  trElem.appendChild(tdElem);
  highScoreBodyElem.appendChild(trElem);
}

function buildHighScoreRow(high_score) {
  var trElem = document.createElement("tr");
  var playerElem = buildHighScoreCell(high_score[0]);
  var scoreElem = buildHighScoreCell(high_score[1]);
  scoreElem.classList.add("score_cell");
  trElem.appendChild(playerElem);
  trElem.appendChild(scoreElem);
  return trElem;
}

function buildHighScoreCell(text) {
  var elem = document.createElement("td");
  elem.textContent = text;
  return elem;
}

populateScoreTable();
