//declare my variables for page elements
var questionBox = document.querySelector("#questionBox");
var answerBox = document.querySelector("#answerBox");
var timerDisplay = document.querySelector("#timerDisplay");
var testButton = document.querySelector("#tester");

//minified the json string for ease of reading in larger code. 
var questionBook = {"questions":[{"question":"Pick a letter - the answer is a","answer":"1","choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is b","answer":"2","choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is c","answer":"3","choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is d","answer":"4","choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]}]};


//declare the functions needed to run this application. 
function renderQuestionPrompt() {
    // Clear question box
    questionBox.innerHTML = "";
    questionBox.innerText=questionBook.questions[0].question
    
    //CREATE AN OBJECT OF THE QUESTION + ANSWERS
    var questionObject = questionBook.questions[0] // move to global var after QC
    console.log("questionObject :" + questionObject);
    console.log("length :" + questionObject.choices.length )
    
// Render a new line for each question
    for (var i = 0; i < questionObject.choices.length; i++) {
      //console.log(i + "|" + questionObject.choices.length );
      //var questionObject = questions[0].choices[0].header[i] + ". |" + questions[0].choices[0].answer[i] ; //move to global var after QC

      var theQuestion = JSON.stringify(questionObject.choices[i])  ; 
      console.log(theQuestion) ;

      //CREATE AND APPEND OUR CHOICE
      var li = document.createElement("li"); // or child element
      li.textContent = theQuestion;
      console.log(li.textContent)
      li.setAttribute("data-index", i);
      

      //CREATE AND APPEND THE BUTTON
  
      var button = document.createElement("button");
      button.textContent = "I choose this !";  
      li.appendChild(button);

//add button 
      answerBox.appendChild(li);
    }
  }
  

/*function init(){};*/
function checkAnswer (){};
function updateScore(){};
function saveHighScore(){};


//ADDED EVENT LISTENERS
tester.addEventListener("click", function(){
    renderQuestionPrompt();
})

