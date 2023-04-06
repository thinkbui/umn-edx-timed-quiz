var highScoreBodyElem = document.getElementById("high_score_body");

// Primary function to load all the high scores from local storage into the table
// If score list is empty or absent, just populates an empty row
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

// Primary function to append a score to the table
function insertHighScore(high_score) {
  highScoreBodyElem.appendChild(buildHighScoreRow(high_score));
}

// This appends the "blank score" that indicates the high score leaderboard is empty
function insertBlankScore() {
  var trElem = document.createElement("tr");

  var tdElem = document.createElement("td");
  tdElem.setAttribute("colspan", 2);
  tdElem.classList.add("blank_score_cell");
  tdElem.textContent = "(none)";

  trElem.appendChild(tdElem);
  highScoreBodyElem.appendChild(trElem);
}

// Build the table row to display a single score
function buildHighScoreRow(high_score) {
  var trElem = document.createElement("tr");
  trElem.appendChild(buildHighScorePlayerCell(high_score));
  trElem.appendChild(buildHighScoreScoreCell(high_score));
  return trElem;
}

// Builds the table cell to display a player's initials
function buildHighScorePlayerCell(high_score) {
  return buildHighScoreCell(highScorePlayer(high_score));
}

// Builds the table cell to display a player's score
function buildHighScoreScoreCell(high_score) {
  var scoreElem = buildHighScoreCell(highScoreScore(high_score));
  scoreElem.classList.add("score_cell");
  return scoreElem;
}

// Helper to build a scoreboard cell
function buildHighScoreCell(text) {
  var elem = document.createElement("td");
  elem.textContent = text;
  return elem;
}

populateScoreTable();
