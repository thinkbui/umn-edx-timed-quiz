// console.log("Script present");

var answerElems = document.getElementsByClassName("answer");
for (i=0;i<answerElems.length;i++) {
  // console.log(answerElems[i].id);
  answerElems[i].addEventListener("click", answerHandler);
}

function answerHandler(event) {
  var answer_val = event.currentTarget.getAttribute("data-val");
  document.getElementsByClassName("message")[0].textContent = answer_val;
}