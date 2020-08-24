//declare my variables for page elements
var questionBox = document.querySelector("#questionBox");
var answerBox = document.querySelector("#answerBox");
var timerDisplay = document.querySelector("#timerDisplay");
var testButton = document.querySelector("#tester");

//minified the json string for ease of reading in larger code. 
var questionBook = {"questions":[{"question":"Pick a letter - the answer is a","answer":"1","choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is b","answer":"2","choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is c","answer":"3","choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]},{"question":"Pick a letter - the answer is d","answer":"4","choices":[{"heading":"a","answer":"The letter A"},{"heading":"b","answer":"The letter B"},{"heading":"c","answer":"The letter C"},{"heading":"d","answer":"The letter D"}]}]};



//declare the functions needed to run this application. 
function renderQuestionPrompt() {
    // Clear todoList element and update todoCountSpan
    questionBox.innerHTML = "";
    var questionObject = questionBook[0] // replace with var soon
    var theChoices = questionBook.questions[0].choices

    //questionBook.questions[0].question
    //questionBook.questions[0].answer
     //SET QUESTION
    questionBox.innerText=questionBook.questions[0].question
    //todoCountSpan.textContent = todos.length;


// Render a new line for each question
    for (var i = 0; i < theChoices.length; i++) {
      var question = questions[0].choices[0].answer[i] ; //todos[i];
  
      var li = document.createElement("li");
      li.textContent = todo;
      li.setAttribute("data-index", i);
  
      var button = document.createElement("button");
      button.textContent = "Complete";
  
      li.appendChild(button);
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

