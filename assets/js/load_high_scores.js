var highScoreBodyElem = document.getElementById("high_score_body");

function populateScoreTable() {
  var high_scores = getHighScores();
  for(i=0;i<high_scores.length;i++) {
    insertHighScore(high_scores[i]);
  }
}

function insertHighScore(high_score) {
  highScoreBodyElem.appendChild(buildHighScoreRow(high_score));
}

function buildHighScoreRow(high_score) {
  var trElem = document.createElement("tr");
  var playerElem = buildHighScoreCell(high_score[0]);
  var scoreElem = buildHighScoreCell(high_score[1]);
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
