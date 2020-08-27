//declare my variables for page elements
var questionBox = document.querySelector("#questionBox");
var answerBox = document.querySelector("#answerBox");
var resultBox = document.querySelector("#resultBox");
var timerDisplay = document.querySelector("#timerDisplay");
var testButton = document.querySelector("#tester");
var prevButton = document.querySelector("#prev");
var nextButton = document.querySelector("#next");
var startQuiz = document.querySelector("#startQuiz");
var timerDisplay = document.querySelector("#timerDisplay");

//minified the json string for ease of reading in larger code. 
var questionBook = {"questions":[{"question":"Pick a letter - the answer is a","answer":0,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is b","answer":1,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is c","answer":2,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is d","answer":3,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]}]};

//declare some things to our user right off the bat. 
var secondsLeft = 20;
var qIndex = 0;
var totalQuestions = questionBook.questions.length;
var userScore = 0;


function beginQuiz(){
 var toBegin = confirm("Begin the quiz? \n The timer will begin upon clicking 'Ok'");
 if (toBegin === true){
  console.log("quiz beginning");
   startQuiz.style.display="none";
    setTime();
    takeQuiz(); 
 } else {
  console.log("user canceled");
   return;
 }
}
function takeQuiz() {
  if (qIndex < totalQuestions) {
  nextQuestion(qIndex);
  } else if ( secondsLeft < 0 ){
    console.log("NO TIME LEFT")
  } else {
    console.log("COMPLETED")
  }
};

//declare the functions needed to run this application. 
function nextQuestion(indexQuestion) {
    //CLEAR THE BOX
    questionBox.innerHTML = "";
    questionBox.innerText=questionBook.questions[indexQuestion].question
    
    //CREATE AN OBJECT OF THE QUESTION + ANSWERS
    answerBox.innerHTML = "";
    var questionObject = questionBook.questions[indexQuestion] // move to global var after QC

// Render a new line for each choice
    for (var i = 0; i < questionObject.choices.length; i++) {
      var theQuestion = JSON.stringify(questionObject.choices[i]) ; 

      //CREATE AND APPEND OUR CHOICE
      var myP = document.createElement("p"); // or child element
      myP.textContent = questionObject.choices[i].heading + " | " + questionObject.choices[i].answer ;      ;
      myP.setAttribute("data-index", i);
      myP.setAttribute("data-parent-id",indexQuestion)
      myP.setAttribute("id","theChoices")
      //console.log(theQuestion) ;     

      //CREATE AND APPEND THE BUTTON
      var button = document.createElement("button");
      button.textContent = "|SELECT|";
      button.setAttribute("style", "background-color: red;");
      button.setAttribute("data-parent-id",indexQuestion)
      button.setAttribute("data-index", i);
      myP.appendChild(button);
      
      //Add thebuttons
      answerBox.appendChild(myP);
     //TRY RADIO BUTTON SELECTORS??

    }
  }

  //CHECK OUT ANSWER
function checkAnswer (questionIndex,answerIndex){
  var theQuestion = questionBook.questions[questionIndex]
  var rightAnswer = theQuestion.answer
  
  
  var score;
  if (answerIndex == rightAnswer ){
    //IF THE ANSWER IS CORRECT - ADD A POINT
    userScore++;
    console.log("right");
    console.log(userScore);
  } else {
    //IF WRONG - LOOSE FIVE SECONDS
    console.log("wrong");
    console.log(userScore);
  };

  qIndex++;
  if (qIndex <  totalQuestions )
  nextQuestion(qIndex);
};


//STORE THE HIGH SCORES
function saveHighScore(){}

//ADDING THE TIMER
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerDisplay.textContent = secondsLeft + " second left on the quiz.";
    

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      //sendMessage();
    }

    //RETURN THE AMOUNT OF SECONDS LEFT
    return(secondsLeft);

  }, 1000);
}

//EVENT LISTENER - SELECT ANSWER
answerBox.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var qIndex = element.getAttribute("data-parent-id");
    var aindex = element.getAttribute("data-index");
    checkAnswer(qIndex, aindex);
  }
})

//EVENT LISTENER - BEGIN QUIZ
startQuiz.addEventListener("click", function(){
 beginQuiz();
});

/*
//EVENT LISTENER - TEST
tester.addEventListener("click", function(){
    nextQuestion(qIndex);
}) ; */



