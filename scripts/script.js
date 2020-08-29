// identify and delcare elements on the page. 
var questionBox = document.querySelector("#questionBox");
var answerBox = document.querySelector("#answerBox");
var resultBox = document.querySelector("#resultBox");
var timerDisplay = document.querySelector("#timerDisplay");
var testButton = document.querySelector("#tester");
var prevButton = document.querySelector("#prev");
var nextButton = document.querySelector("#next");
var startQuiz = document.querySelector("#startQuiz");
var saveScore = document.querySelector("#saveScore");
var timerDisplay = document.querySelector("#timerDisplay");
var test = document.querySelector("#test");

//hacked
var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");
var inputs = document.querySelector(".inputs")

var totalSeconds = 0;
var secondsElapsed = 0;
var status = "Working";
var interval;

//minified the json string for ease of reading in larger code. 
var questionBook={questions:[{question:"Pick a letter - the answer is a",answer:0,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]},{question:"Hot damn - this is our second question",answer:1,choices:[{heading:"a",answer:"The first one"},{heading:"b",answer:"The second one"},{heading:"c",answer:"The third one."},{heading:"d",answer:"The fourth one. "}]},{question:"The third question.",answer:2,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]},{question:"The fourth question",answer:3,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]}]};

  //var totalQuestions = questionBook.questions.length;
  // START AT USER SCORE AND QUESTION NUMBER
  var userScore = 0;
  var userMiss = 0;
  var qIndex = 0;
  var quizTime = 120;
  var secondsElapsed ;

  //TIMER BIT AND PIECES
  var interval;

  //DETERMINE THE LENGTH OF THE QUIZ
  //var secondsLeft = 15;
  //timerDisplay.textContent = "The quiz is " + questionBook.questions.length + " questions long. You will have " + secondsLeft + " seconds to complete this quiz."
 
//BEGIN QUIZ
function beginQuiz() {
  //SHOW THE BOXES WHEN WE BEGIN
  answerBox.style.display="block";
  questionBox.style.display="block";
  startQuiz.style.display="none";
  startTimer();
  //RENDER THE FIRST QUESTION
  renderQuestion(qIndex);
}

//RENDER QUESTION ON SCREEN
function renderQuestion(indexQuestion) {
  questionBox.innerHTML = "";
  questionBox.innerText = questionBook.questions[indexQuestion].question

  //CREATE AN OBJECT OF THE QUESTION + ANSWERS
  answerBox.innerHTML = "";
  var questionObject = questionBook.questions[indexQuestion] // move to global var after QC

  // Render a new line for each choice
  for (var i = 0; i < questionObject.choices.length; i++) {
    var theQuestion = JSON.stringify(questionObject.choices[i]);
    
    var p = document.createElement("p");

    //OPTING TO PUT FULL ANSWERS ON THE BUTTON ELEMENT
    var button = document.createElement("button");
    button.textContent = questionObject.choices[i].answer;
    button.setAttribute("class","gbtn btn-primary btn-block");
    button.setAttribute("style","height: 60px;  border-radius: 25px;")
    //glyphicon glyphicon-ok
    button.setAttribute("data-parent-id", indexQuestion)
    button.setAttribute("data-index", i);

    //var icon = document.createElement("i");
    //icon.setAttribute("class","fa fa-dot-circle-o")
    
    //p.appendChild(icon);
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
    resultBox.textContent = "YOU ARE SO SMART...MOVING ON";
    
    //INCREASE THE USER SCORE + SET TO GO TO THE NEXT QUESTION
    questionIndex++;
    userScore++;
    console.log("checkAnswer -> userScore", userScore)
    console.log("checkAnswer -> questionIndex",questionBook.questions.length)
    
    //IF ALL QUESTIONS ARE ANSWERED --> GO TO ENDGAME FUNCTION
    if (questionIndex > 3 ){ //THIS WORKS WHEN HARD CODED IN. 
      console.log("you are done");
      endGame();
      return;
      
    //IF MORE QUESTIONS EXIST - GO TO THE NEXT QUESTION
    } else {
    console.log("Correct answer go to next question. checkAnswer -> questionIndex", questionIndex);
    //console.log("seconds remaining : "+ secondsLeft)
    renderQuestion(questionIndex);
    }

  } else {
    //IF THE ANSWER WAS WRONG - LET THE USER KNOW // HIDE MISSES?
    userMiss++;
    secondsElapsed += 5; 
    renderTime();
    console.log("checkAnswer -> secondsElapsed", secondsElapsed)
    console.log("checkAnswer -> userMiss", userMiss);
    //reduceTime();
    //this.element.find('#answerbox').children().eq(answerIndex).remove();
    //answerBox.removeChild(answerBox[answerIndex]);
    //list.removeChild(list.childNodes[0]);
    

    resultBox.setAttribute("class","alert alert-danger");
    resultBox.textContent = "YOU ARE SO WRONG";
  };
}

//STORE THE USER SCORE
function saveHighScore(name,userScore) {
var scoreArray= [name,userScore,Date.now()]
localStorage.setItem("highScores",JSON.stringify(scoreArray))
console.log("saveHighScore -> saveHighScore", scoreArray)
saveScore.style.display="hide";
showHighScores();
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

//EVENT LISTENER - BEGIN QUIZ
startQuiz.addEventListener("click", function () {
  var toBegin = confirm("Begin the quiz? \n The timer will begin upon clicking 'Ok'");
  if (toBegin === true) {
    beginQuiz();
  }
})

//EVENT LISTENER - BEGIN QUIZ
saveScore.addEventListener("click", function () {
  var name = prompt("Enter your name to save high score.");
  console.log("name", name);
  console.log("score", userScore);
  saveHighScore(name,userScore);
})

//RESET THE WINDOW
function init() {
  var totalQuestions = questionBook.questions.length;
  var userScore = 0;
  var userMiss = 0
  var qIndex = 0;
  var secondsLeft = 15;
  timerDisplay.textContent = "The quiz is " + totalQuestions + " questions long. You will have " + secondsLeft + " seconds to complete this quiz."
  answerBox.style.display="none";
  questionBox.style.display="none";
}
function resetState() {}

//END THE GAME
function endGame(){
  saveScore.style.display="block";
  startQuiz.style.display="block";
  resultBox.style.display="hide";
  stopTimer();
  confirm("The game is over");
    init();
}
//EVENT LISTENER - TEST
//test.addEventListener("click", function (){})


function reduceTime(){
console.log("reduceTime -> reduceTime", reduceTime)
};
// hacked together scripts based on pomodoro timer

// This launches the app by calling setTime() and renderTime()
getTimePreferences();

// These two functions are just for making sure the numbers look nice for the html elements
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

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  var formattedSeconds;
  //console.log("getFormattedSeconds -> formattedSeconds", formattedSeconds)

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

/* This function retrieves the values from the html input elements; Sort of
   getting run in the background, it sets the totalSeconds variable which
   is used in getFormattedMinutes/Seconds() and the renderTime() function.
   It essentially resets our timer */
function setTime() {
  var minutes = workMinutesInput.value.trim();
  clearInterval(interval);
  totalSeconds = minutes * 60;
}



// This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();
  //console.log("renderTime -> secondsDisplay.textContent", secondsDisplay.textContent)

 // ..and then checks to see if the time has run out
  if (secondsElapsed >= totalSeconds) {

    /*
    if (status === "Working") {
      alert("Time for a break!");
    } else {
      alert("Time to get back to work!");
    }*/

    //stopTimer();
    endGame();

  }
}

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
  setTime();

  // We only want to start the timer if totalSeconds is > 0
  if (totalSeconds > 0) {
    /* The "interval" variable here using "setInterval()" begins the recurring increment of the
       secondsElapsed variable which is used to check if the time is up */
      interval = setInterval(function() {
        secondsElapsed++;

        // So renderTime() is called here once every second.
        renderTime();
      }, 1000);
  } else {
    alert("Minutes of work/rest must be greater than 0.")
  }
}

/* This function stops the setInterval() set in startTimer but does not
   reset the secondsElapsed variable and does not reset the time by calling "setTime()" */
function pauseTimer() {
  clearInterval(interval);
  renderTime();
}

/* This function stops the interval and also resets secondsElapsed
   and calls "setTime()" which effectively reset the timer
   to the input selections workMinutesInput.value and restMinutesInput.value */
function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
}

/* Our timer is fancy enough to handle 2 different settings at once this toggle
   function basically just specifies which of our 2 timer settings to use. */
function toggleStatus(event) {
  var checked = event.target.checked;

  if (checked) {
    status = "Working";
  } else {
    status = "Resting";
  }

  statusSpan.textContent = status;

  secondsElapsed = 0;
  setTime();
  renderTime();
}

function getTimePreferences() {
  /* Here we check to see if any preferences have
     been set in the local storage via "setTimePreferences()" */
  var preferences = JSON.parse(localStorage.getItem("preferences"));

  // If preferences have been set then use any value available
  if (preferences) {
    if (preferences.workMinutes) {
      workMinutesInput.value = preferences.workMinutes;
    }

    //if (preferences.restMinutes) {
      //restMinutesInput.value = preferences.restMinutes;
    //}
  }

  // This is where the app is really kicked-off, setTime and renderTime are the two main routines.
  setTime();
  renderTime();
}

function setTimePreferences() {
  localStorage.setItem(
    "preferences",
    JSON.stringify({
      workMinutes: workMinutesInput.value.trim(),
      //restMinutes: restMinutesInput.value.trim()
    })
  );
}

//playButton.addEventListener("click", startTimer);
//pauseButton.addEventListener("click", pauseTimer);
//stopButton.addEventListener("click", stopTimer);
//statusToggle.addEventListener("change", toggleStatus);
inputs.addEventListener("change", setTimePreferences);
inputs.addEventListener("keyup", setTimePreferences);
