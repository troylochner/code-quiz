// ELEMENT DECLARATIONS
var questionBox = document.querySelector("#questionBox");
var answerBox = document.querySelector("#answerBox");
var resultBox = document.querySelector("#resultBox");

//var testButton = document.querySelector("#tester");
var startQuiz = document.querySelector("#startQuiz");
var saveScore = document.querySelector("#saveScore");
var test = document.querySelector("#test");
var viewHighScores = document.querySelector("#showHighScores");
var highScores=localStorage.getItem("highScores");

//MORE ELEMENTS - HACKED TOGETHER FROM POMODORO ACTIVITY
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var inputs = document.querySelector(".inputs")

//GLOBAL VARIABLES
var totalSeconds;
var secondsElapsed ;
var interval;
var userScore;
var userMiss;
var qIndex;

init();
//minified the json string for ease of reading in larger code. 
var questionBook={questions:[{question:"Pick a letter - the answer is a",answer:0,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]},{question:"Hot damn - this is our second question",answer:1,choices:[{heading:"a",answer:"The first one"},{heading:"b",answer:"The second one"},{heading:"c",answer:"The third one."},{heading:"d",answer:"The fourth one. "}]},{question:"The third question.",answer:2,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]},{question:"The fourth question",answer:3,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]}]};
 

//INIT - RESET THE WINDOW
function init() {
    totalSeconds=0;
    secondsElapsed=0 ;
    interval;
    userScore=0;
    userMiss=0;
    qIndex = 0;
    //var totalQuestions = questionBook.questions.length;

    //CLEAR ASPECTS OF THE WINDOW
    questionBox.style.display="none";
    answerBox.style.display="none";
    saveScore.style.display="none";
}

//EVENT - BEGIN QUIZ
startQuiz.addEventListener("click", function () {
  var toBegin = confirm("Begin the quiz? \n The timer will begin upon clicking 'Ok'");
  if (toBegin === true) {
    beginQuiz();
  }
})

//BEGIN QUIZ
function beginQuiz() {
  //SHOW THE BOXES WHEN WE BEGIN
  questionBox.style.display="block";
  answerBox.style.display="block";
  resultBox.style.display="block";

  //HIDE OPTION TO START + SHOW HIGH SCORES
  startQuiz.style.display="none";
  viewHighScores.style.display="none";
  saveScore.style.display="none";

  //START THE CLOCK
  startTimer();
  
  //BEGIN THE QUESTIONING
  renderQuestion(qIndex);
}

//RENDER QUESTION ON SCREEN
function renderQuestion(indexQuestion) {
  questionBox.innerHTML = "";
  questionBox.innerText = questionBook.questions[indexQuestion].question

  //CREATE AN OBJECT OF THE QUESTION + ANSWERS
  answerBox.innerHTML = "";
  var questionObject = questionBook.questions[indexQuestion]

  // Render a new line for each choice
  for (var i = 0; i < questionObject.choices.length; i++) {
    var theQuestion = JSON.stringify(questionObject.choices[i]);
  
    var p = document.createElement("p");

    //OPTING TO PUT FULL ANSWERS ON THE BUTTON ELEMENT
    var button = document.createElement("button");
    button.textContent = questionObject.choices[i].answer;
    button.setAttribute("class","gbtn btn-primary btn-block");
    button.setAttribute("style","height: 60px;  border-radius: 25px;")
    button.setAttribute("data-parent-id", indexQuestion)
    button.setAttribute("data-index", i);
    p.appendChild(button);
    answerBox.appendChild(p);

  }
}
  
//CHECK ANSWER
function checkAnswer(questionIndex, answerIndex) {
  var theQuestion = questionBook.questions[questionIndex];
  var rightAnswer = theQuestion.answer
  resultBox.style.display="block";
  
  //IF THE ANSWER IS CORRECT 
  if (answerIndex == rightAnswer) {
    //SHOW THE USER SOME FEEDBACK

    resultBox.setAttribute("class","alert alert-success");
    resultBox.textContent = "correct, moving on...";
    
    //INCREASE THE USER SCORE + SET TO GO TO THE NEXT QUESTION
    questionIndex++;
    userScore++;
    console.log("checkAnswer -> userScore", userScore)
    console.log("checkAnswer -> questionIndex",questionBook.questions.length)
    
    //IF ALL QUESTIONS ARE ANSWERED --> GO TO ENDGAME FUNCTION
    if (questionIndex > 3 ){ //THIS WORKS WHEN HARD CODED IN. 
      console.log("The quiz has been completed.");
      endGame();
      return;
      
    //IF MORE QUESTIONS EXIST - GO TO THE NEXT QUESTION
    } else {
    //console.log("Correct answer go to next question. checkAnswer -> questionIndex", questionIndex);
    //console.log("seconds remaining : "+ secondsLeft)
    renderQuestion(questionIndex);
    }

  } else {
    //IF THE ANSWER WAS WRONG - LET THE USER KNOW // HIDE MISSES?
    userMiss++;
    // IF THE USER IS WRONG + ADD FIVE SECONDS TO THE TIME ELAPSED
    secondsElapsed += 5; 
    renderTime();
    //console.log("checkAnswer -> secondsElapsed", secondsElapsed)
    //console.log("checkAnswer -> userMiss", userMiss);   
    
    resultBox.setAttribute("class","alert alert-danger");
    resultBox.textContent = "you choose poorly...try again.";
  };
}

//STORE THE USER SCORE
function saveHighScore() {
var scoreArray= [name,userScore,Date.now()]
localStorage.setItem("highScores",JSON.stringify(scoreArray))
init();

/*
//HACKED HIGH SCORES
saveHighScore = (e) => {
  e.preventDefault();

  const score = {
      score: mostRecentScore,
      name: username.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('/');
};

*/




}

//SHOW ALL HIGH SCORES
function showHighScores(){
 confirm(localStorage.getItem('highScores'));

}

//EVENT LISTENER - SELECT ANSWER
answerBox.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button") === true) {
    //GET WHAT I AM SELECTING
    var qIndex = element.getAttribute("data-parent-id");
    var aindex = element.getAttribute("data-index");
    checkAnswer(qIndex, aindex);
  }
})

//EVENT - SHOW LAST HIGH SCORE
viewHighScores.addEventListener("click",function(){
showHighScores();
})


//EVENT - SAVE SCORE
saveScore.addEventListener("click", function () {
  var name = prompt("Enter your name to save high score.");
  console.log("name", name);
  console.log("score", userScore);
  saveHighScore(name,userScore);
})

//END THE GAME
function endGame(){
  //HIDE THE IN QUIZ ELEMENTS
  resultBox.style.display="none";
  answerBox.style.display="none";
  questionBox.style.display="none";

  //SHOW OUR WAITING ELEMENTS
  saveScore.style.display="block";
  startQuiz.style.display="block";
  viewHighScores.style.display="block";

  stopTimer();
  confirm("The game is over");
  //init();
}

//TIMER FUNCTIONS - HACKED TOGETHER USING CLASS ACTIVITY OF POMODORO TIMER

//GET TIME PREFS
getTimePreferences();

//FORMAT MINUTES
function getFormattedMinutes() {
  //
  var secondsLeft = totalSeconds - secondsElapsed;

  var minutesLeft = Math.floor(secondsLeft / 60);

  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

//FORMAT SECONDS
function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;
  var formattedSeconds;
  
  //CONSIDER SOMETHING FUN LIKE A BLINK OR RED IF < 10
  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }
  return formattedSeconds;
}

//SET THE TIME REMAINING
function setTime() {
  var minutes = workMinutesInput.value.trim();
  console.log("setTime -> minutes", minutes)
  clearInterval(interval);
  totalSeconds = minutes * 60;
}

//DISPLAY THE TIME REMAINING / IF TIME IS OUT - EXIT THE GAME
function renderTime() {
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();
 // IF THE TIME IS OUT - END THE GAME
  if (secondsElapsed >= totalSeconds) {
    endGame();
  }
}
//BEGIN THE TIMER
function startTimer() {
  setTime();
  // ONLY START THE TIME IF > 0
  if (totalSeconds > 0) {
    //INTERVAL BEGINS OUR RECURRING EVENT OF ADDING A SECOND ELAPSED AND RENDERING THE TIME REMAINING ON SCREEN
      interval = setInterval(function() {
        secondsElapsed++;
        renderTime();
      }, 1000);
  }
}

//STOP THE TIMER
function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
}

//GET THE TIMER SETTINGS
function getTimePreferences() {
  //SEE IF THIS HAS BEEN STORED LOCALLY
  var preferences = JSON.parse(localStorage.getItem("preferences"));

  // If preferences have been set then use any value available
  if (preferences) {
    if (preferences.workMinutes) {
      workMinutesInput.value = preferences.workMinutes;
    }
  }
  //USING THE FOUND PREFS - SET THE TIME AND RENDER THE TIME ON SCREEN
  setTime();
  renderTime();
} 

//SET TIMER PREFERENCES
function setTimePreferences() {
  localStorage.setItem("preferences",
    JSON.stringify({workMinutes: workMinutesInput.value.trim()})
  );
}

//EVENT  - TIMER SETTING UPDATE ON CHANGES / CLICKER SELECTS
inputs.addEventListener("change", setTimePreferences);
inputs.addEventListener("keyup", setTimePreferences);