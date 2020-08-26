//declare my variables for page elements
var questionBox = document.querySelector("#questionBox");
var answerBox = document.querySelector("#answerBox");
var resultBox = document.querySelector("#resultBox");
var timerDisplay = document.querySelector("#timerDisplay");
var testButton = document.querySelector("#tester");
var prevButton = document.querySelector("#prev");
var nextButton = document.querySelector("#next");
var startQuiz = document.querySelector("#startQuiz");


//minified the json string for ease of reading in larger code. 
var questionBook = {"questions":[{"question":"Pick a letter - the answer is a","answer":0,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is b","answer":1,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is c","answer":2,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is d","answer":3,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]}]};

//DECLARE Q INDEX AT TOP
var qIndex = 0;
var totalQuestions = questionBook.questions.length;

function beginQuiz(){
 var toBegin = confirm("Begin the quiz? \n The timer will begin upon clicking 'Ok'");
 if (toBegin === true){
  console.log("quiz beginning");
    takeQuiz(); 
 } else {
  console.log("user canceled");
   return;
 }
}
//start the game   //start()
//hide the start button 
//set next question
//shuffle? fn
//set the next question
//select answer


/////////quiz logic
//delare a function : liveQuiz ; this function should walk through the question book and store the user score. 
function takeQuiz() {
  nextQuestion(qIndex);

  /*
  //COME BACK TO HERE
  for ( var i = 0 ; i< questionBook.questions.length ; i++){
    //ONLY LOAD QUESTION IF AN ANSWER HAS BEEN SUBMITTED : OR IF WE ARE STARTING
    if (answerSubmitted >0)  {
      nextQuestion(i);
  }};*/

  console.log("done")
  

  /*
 //set score to 0
 var userScore = 0;
 console.log("takeQuiz -> userScore", userScore)
 console.log("userScore:"+userScore);
 //set time to 5 minutes (300000 ms)
 var timeRemain = 300000 ; 
 console.log("timeRemain:"+timeRemain);
 //count the questions in the book
 var quizLength = questionBook.questions.length;
 console.log("quizLength:"+quizLength);
 //set question index to 0
 var indexQuestion = 0
 console.log("takeQuiz -> indexQuestion", indexQuestion)
 //for each question in the book  */


}

////////////////

//declare the functions needed to run this application. 
function nextQuestion(indexQuestion) {
    //CLEAR THE BOX
    questionBox.innerHTML = "";
    questionBox.innerText=questionBook.questions[indexQuestion].question
    
    //CREATE AN OBJECT OF THE QUESTION + ANSWERS
    answerBox.innerHTML = "";
    var questionObject = questionBook.questions[indexQuestion] // move to global var after QC
    
    console.log("questionObject :" + JSON.stringify(questionObject));
    console.log("The right answer : "+  questionObject.answer);
    console.log("length :" + questionObject.choices.length );
    
// Render a new line for each choice
    for (var i = 0; i < questionObject.choices.length; i++) {
      var theQuestion = JSON.stringify(questionObject.choices[i]) ; 

      //CREATE AND APPEND OUR CHOICE
      var myP = document.createElement("p"); // or child element
      myP.textContent = questionObject.choices[i].heading + " | " + questionObject.choices[i].answer ;      ;
      myP.setAttribute("data-index", i);
      myP.setAttribute("data-parent-id",indexQuestion)
      myP.setAttribute("id","theChoices")
      console.log(theQuestion) ;     

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

function checkAnswer (questionIndex,answerIndex){
  var theQuestion = questionBook.questions[questionIndex]
  var rightAnswer = theQuestion.answer
  var score;
  if (answerIndex == rightAnswer ){
    console.log("right");
    //ADD TO SCORE 
  } else {
  console.log("wrong");
  //REDUCE FROM SCORE
  //TIME PENALTY
  };
  qIndex++;
  if (qIndex > )
  nextQuestion(qIndex);
};

//UPDATE THE SCORE
function updateScore(){}

//STORE THE HIGH SCORES
function saveHighScore(){}

//ANSWER SELECTION EVENT LISTENER
answerBox.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var qIndex = element.getAttribute("data-parent-id");
    var aindex = element.getAttribute("data-index");
    checkAnswer(qIndex, aindex);
  }
})

// clean up the naming. functions ids variables too similar. 
//BEGIN QUIZ
startQuiz.addEventListener("click", function(){
 beginQuiz();
});


//ADDED EVENT LISTENERS
tester.addEventListener("click", function(){
    nextQuestion(qIndex);
}) ; 


//NAVIGATION - PHASE OUT ONCE WORKING
prev.addEventListener("click", function(){
  console.log("back")
}) ; 

next.addEventListener("click", function(){
  console.log("forward")
}) ; 


