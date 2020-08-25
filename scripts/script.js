//declare my variables for page elements
var questionBox = document.querySelector("#questionBox");
var answerBox = document.querySelector("#answerBox");
var resultBox = document.querySelector("#resultBox");
var timerDisplay = document.querySelector("#timerDisplay");
var testButton = document.querySelector("#tester");
var prevButton = document.querySelector("#prev");
var nextButton = document.querySelector("#next");

//minified the json string for ease of reading in larger code. 
var questionBook = {"questions":[{"question":"Pick a letter - the answer is a","answer":0,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is b","answer":1,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is c","answer":2,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is d","answer":3,"choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]}]};


//declare the functions needed to run this application. 
function loadQuestion(indexQuestion) {
    // Clear question box
    questionBox.innerHTML = "";
    questionBox.innerText=questionBook.questions[indexQuestion].question
    
    //CREATE AN OBJECT OF THE QUESTION + ANSWERS
    var questionObject = questionBook.questions[indexQuestion] // move to global var after QC
    console.log("questionObject :" + questionObject);
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
      
      //APPEND EVERYTHIN TO THE ANSWER BOX
      answerBox.appendChild(myP);

    }
  }


/*function init(){};*/
function checkAnswer (questionIndex,answerIndex){
  var theQuestion = questionBook.questions[questionIndex]
  var rightAnswer = theQuestion.answer

  if (answerIndex == rightAnswer ){
    confirm("You are smart.");
    //ADD TO SCORE
  } else {
  confirm("You are kind of stupid.");
  }
  //ADD TO SCORE
  //console.log("Checking question : " + questionIndex);
  //console.log("You answered : " + answerIndex );
  //console.log("YThe right answer is " + rightAnswer );





};
function updateScore(){};
function saveHighScore(){};


//ADDED EVENT LISTENERS
tester.addEventListener("click", function(){
    loadQuestion(3);
})

//LISTEN FOR ANSWER
answerBox.addEventListener("click", function(event){
  var element = event.target ;
  if (element.matches("button")===true){
    var qIndex = element.getAttribute("data-parent-id");
    var aindex = element.getAttribute("data-index") ;
    
    //console.log("You choose " + aindex + " Q# " + qIndex);

    checkAnswer(qIndex,aindex)

    
  }
})

