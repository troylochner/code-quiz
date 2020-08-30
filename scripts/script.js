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
//var topScore=highScores.score;

//MORE ELEMENTS - HACKED TOGETHER FROM POMODORO ACTIVITY
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var currentScore = document.querySelector("#currentScore");
var countDownClock = document.querySelector("#clock");
var workMinutesInput = document.querySelector("#work-minutes");
var inputs = document.querySelector(".inputs")

//GLOBAL VARIABLES
var totalSeconds;
var secondsElapsed ;
var interval;
var userScore;
var userMiss;
var qIndex;
var currentHighScore ; 

init();
//minified the json string for ease of reading in larger code.
//QUICK MAKER : http://www.objgen.com/json
//MINIFIER : https://codebeautify.org/jsonminifier
//FORMAT TO REPLICATE : 

/*
questions[0]
  question = QUESTION 1
  answer = 1
  choices[0]
    heading=a
    answer=[CHOICE A]
  choices[1]
    heading=b
    answer=[CHOICE B]
  choices[2]
    heading=c
    answer=[CHOICE C]
  choices[3]
    heading=d
    answer=[CHOICE D]
*/

//WORKING TEMPLATE - ALL B IS CORRECT

//var questionBook = {"questions":[{"question":"Inside which HTML element do we put the JavaScript?","answer":"0","choices":[{"heading":"a","answer":"<script>"},{"heading":"b","answer":"<scripting>"},{"heading":"c","answer":"<java>"},{"heading":"d","answer":"<js>"}]},{"question":"Where is the correct place to insert a JavaScript?","answer":"2","choices":[{"heading":"a","answer":"The <head> section"},{"heading":"b","answer":"The <body> section"},{"heading":"c","answer":"Both the <head> and <body> will work."},{"heading":"d","answer":"The <footer> section"}]},{"question":"What is the correct syntax for referring to an external script called 'scriptname.js'?","answer":"0","choices":[{"heading":"a","answer":"<script src='scriptname.js'>"},{"heading":"b","answer":"<script link='scriptname.js'>"},{"heading":"c","answer":"<source src='scriptname.js'>"},{"heading":"d","answer":"<insert src='scriptname.js'>"}]},{"question":"JavaScript is the same as Java.","answer":"1","choices":[{"heading":"a","answer":"true"},{"heading":"b","answer":"false"}]},{"question":"How do you write 'Hello World in the alert box?","answer":"2","choices":[{"heading":"a","answer":"type = hello world"},{"heading":"b","answer":"Hello World"},{"heading":"c","answer":"alert('Hello World');"},{"heading":"d","answer":"execute(Hello World)"}]},{"question":"How do you call a function named 'myFunction'?","answer":"2","choices":[{"heading":"a","answer":"wrong choices here."},{"heading":"b","answer":"wrong choices here."},{"heading":"c","answer":"myFunction()"},{"heading":"d","answer":"wrong choices here."}]},{"question":"How to write an IF statement in JavaScript?","answer":"1","choices":[{"heading":"a","answer":"if 'i' is eqaul to 5"},{"heading":"b","answer":"if (i==5)"},{"heading":"c","answer":"if i eqauls 5"},{"heading":"d","answer":"if i=5"}]},{"question":"How do you declare a JavaScript variable?","answer":"0","choices":[{"heading":"a","answer":"var x=1"},{"heading":"b","answer":"delcare variable x"},{"heading":"c","answer":"x=1"},{"heading":"d","answer":"make(x)"}]},{"question":"How does a FOR loop start?","answer":"2","choices":[{"heading":"a","answer":"loop for i < 5"},{"heading":"b","answer":"open Loop(i<5)"},{"heading":"c","answer":"for (i=0;i<5;i++)"},{"heading":"d","answer":"for (i < 5)"}]},{"question":"How can you add a comment in a JavaScript?","answer":"3","choices":[{"heading":"a","answer":"INSERT 'comment'"},{"heading":"b","answer":"<!--[comment here-->"},{"heading":"c","answer":"|| Comment"},{"heading":"d","answer":"//my comment would go here"}]}]}

//var questionBook = {"questions":[{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]},{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]},{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]},{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]},{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]},{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]},{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]},{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]},{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]},{"question":"QUESTION","answer":"1","choices":[{"heading":"a","answer":"[CHOICE A]"},{"heading":"b","answer":"[CHOICE B]"},{"heading":"c","answer":"[CHOICE C]"},{"heading":"d","answer":"[CHOICE D]"}]}]}

var questionBook={questions:[{question:"Pick a letter - the answer is a",answer:0,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]},{question:"Hot damn - this is our second question",answer:1,choices:[{heading:"a",answer:"The first one"},{heading:"b",answer:"The second one"},{heading:"c",answer:"The third one."},{heading:"d",answer:"The fourth one. "}]},{question:"The third question.",answer:2,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]},{question:"The fourth question",answer:3,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]}]};
 

//INIT - RESET THE WINDOW
function init() {
    totalSeconds=0;
    secondsElapsed=0 ;
    interval;
    userScore=0;
    userMiss=0;
    qIndex = 0;

    currentHighScore = localStorage.getItem('highScores')
    //var totalQuestions = questionBook.questions.length;

    //CLEAR ASPECTS OF THE WINDOW
    questionBox.style.display="none";
    answerBox.style.display="none";
    saveScore.style.display="none";
    countDownClock.style.display="none";
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
  countDownClock.style.display="block";

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
  questionBox.innerText = 'Question #'+ (indexQuestion+1) + ' : ' + questionBook.questions[indexQuestion].question

  //CREATE AN OBJECT OF THE QUESTION + ANSWERS
  answerBox.innerHTML = "";
  var questionObject = questionBook.questions[indexQuestion]

  // Render a new line for each choice
  for (var i = 0; i < questionObject.choices.length; i++) {
    var theQuestion = JSON.stringify(questionObject.choices[i]);
  
    var p = document.createElement("p");

    //OPTING TO PUT FULL ANSWERS ON THE BUTTON ELEMENT
    var button = document.createElement("button");
    button.textContent = questionObject.choices[i].heading + '. ' + questionObject.choices[i].answer;
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
  var rightAnswer = theQuestion.answer;
  var quizLength = questionBook.questions.length;
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
    if (questionIndex  === quizLength ){ 
      console.log("The quiz has been completed.");
      console.log(( totalSeconds-secondsElapsed)* 1000);
      
      endGame();
      return;
      
    //IF MORE QUESTIONS EXIST - GO TO THE NEXT QUESTION
    } else {
    renderQuestion(questionIndex);
    }

  } else {
    //IF THE ANSWER WAS WRONG - LET THE USER KNOW // HIDE MISSES?
    userMiss++;
    // IF THE USER IS WRONG + ADD FIVE SECONDS TO THE TIME ELAPSED
    secondsElapsed += 5; 
    renderTime();
    resultBox.setAttribute("class","alert alert-danger");
    resultBox.textContent = "incorrect...please try again.";
  };
}

//STORE THE USER SCORE
function saveHighScore() {
//var scoreArray= [name,userScore];
var theBestScore = {Player: userName, Score: userScore};
localStorage.setItem("highScores",JSON.stringify(theBestScore))
resultBox.style.display="none";
init(); //INIT WILL BLOW OUT THE CURRENT SCORE
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
  saveHighScore(name,userScore);
})

//END THE GAME
function endGame(){
  //HIDE THE IN QUIZ ELEMENTS
  //resultBox.style.display="none";
  answerBox.style.display="none";
  questionBox.style.display="none";
  countDownClock.style.display="none";

  //SHOW OUR WAITING ELEMENTS
  saveScore.style.display="block";
  startQuiz.style.display="block";
  viewHighScores.style.display="block";

  userScore = ((totalSeconds-secondsElapsed) * 1000 )

  //show score on page
  resultBox.setAttribute("class","alert alert-success");
  resultBox.textContent = "Your score was : " + userScore;
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
  //var minutes = workMinutesInput.value.trim();
  //IN THIS INSTANCE - WE WILL DELCARE A PREDETERMINED QUIZ LENGTH
  minutes = 3;
  console.log("setTime -> minutes", minutes)
  clearInterval(interval);
  totalSeconds = minutes * 60;
}

//DISPLAY THE TIME REMAINING / IF TIME IS OUT - EXIT THE GAME
function renderTime() {
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();
  currentScore.textContent = ((totalSeconds-secondsElapsed)* 1000);
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

//CUSTOMIZED TIMER SETTING (IF I WANT TO ADD / REMOVING FOR NOW)
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