// Prompts the player to enter initials to add to the high score leaderboard
function promptInitials() {
  var prompt_text = `Quiz over.  Final Score: ${score}\nPlease enter your initials:`
  var player_initials = prompt(prompt_text);
  while(!player_initials.match(/^[A-Za-z]{1,3}$/)) {
    if (player_initials.length == 0) {
      alert("ERROR: You must enter your initials.");
    } else {
      alert("ERROR: Your initials must be 1-3 letters.")
    }
    player_initials = prompt(prompt_text);
  }
  scoreHandler(player_initials.toUpperCase());
}

// Adds the user score to the high score list, sorts descending by score, then truncates the list if too long
function scoreHandler(player_initials) {
  high_scores = getHighScores();
  high_scores.push(buildHighScoreRecord(player_initials));
  high_scores.sort(function(a,b) {return b["score"] - a["score"]});
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

// Builds the data structure for a high score for storage
function buildHighScoreRecord(player_initials) {
  return {player: player_initials,score: score}
}

// Helper to grab the player's initials from the local storage score entry
function highScorePlayer(high_score) {
  return high_score["player"];
}

// Helper to grab the player's score from the local storage score entry
function highScoreScore(high_score) {
  return high_score["score"];
}
