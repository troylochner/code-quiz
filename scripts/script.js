// identify and delcare elements on the page. 
var questionBox = document.querySelector("#questionBox");
var answerBox = document.querySelector("#answerBox");
var resultBox = document.querySelector("#resultBox");
var timerDisplay = document.querySelector("#timerDisplay");
var testButton = document.querySelector("#tester");
var prevButton = document.querySelector("#prev");
var nextButton = document.querySelector("#next");
var startQuiz = document.querySelector("#startQuiz");
var timerDisplay = document.querySelector("#timerDisplay");
var test = document.querySelector("#test");

//minified the json string for ease of reading in larger code. 
var questionBook={questions:[{question:"Pick a letter - the answer is a",answer:0,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]},{question:"Hot damn - this is our second question",answer:1,choices:[{heading:"a",answer:"The first one"},{heading:"b",answer:"The second one"},{heading:"c",answer:"The third one."},{heading:"d",answer:"The fourth one. "}]},{question:"The third question.",answer:2,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]},{question:"The fourth question",answer:3,choices:[{heading:"a",answer:"The letter A"},{heading:"b",answer:"The letter B"},{heading:"c",answer:"The letter C"},{heading:"d",answer:"The letter D"}]}]};

  //var totalQuestions = questionBook.questions.length;
  
  // START AT USER SCORE AND QUESTION NUMBER
  var userScore = 0;
  var userMiss = 0;
  var qIndex = 0;

  //DETERMINE THE LENGTH OF THE QUIZ
  var secondsLeft = 15;
  timerDisplay.textContent = "The quiz is " + questionBook.questions.length + " questions long. You will have " + secondsLeft + " seconds to complete this quiz."

 
//BEGIN QUIZ
function beginQuiz() {
  //SHOW THE BOXES WHEN WE BEGIN
  answerBox.style.display="block";
  questionBox.style.display="block";
  startQuiz.style.display="none";
  //startTimer();
  //RENDER THE FIRST QUESTION
  renderQuestion(qIndex);
}


//RENDER THE QUESTION ON THE SCREEN
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
    console.log("seconds remaining : "+ secondsLeft)
    renderQuestion(questionIndex);
    }

  } else {
    //IF THE ANSWER WAS WRONG - LET THE USER KNOW // HIDE THEIR MISS?
    userMiss++;
    console.log("checkAnswer -> userMiss", userMiss)
    resultBox.setAttribute("class","alert alert-danger");
    resultBox.textContent = "YOU ARE SO WRONG";
  };
}


//STORE THE USER SCORE
function saveHighScore() {
  var saveScore = confirm("Your score is was : " + secondsLeft + " would you like to save this score?")
  if (saveScore===true){
    //ADD THE SCORE
  };
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

//RESET / INITIALIZE GAME AGAIN
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
function renderHighScores(){}

function endGame(){
  confirm("The game is over");
  init();
}

//EVENT LISTENER - TEST
test.addEventListener("click", function (){})