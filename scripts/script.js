//declare my variables for page elements
var questionBox = document.querySelector("#questionBox");
var answerBox = document.querySelector("#answerBox");
var timerDisplay = document.querySelector("#timerDisplay");
var testButton = document.querySelector("#tester");

//minified the json string for ease of reading in larger code. 
var questionBook = {"questions":[{"question":"Pick a letter - the answer is a","answer":"1","choice":{"a":"The letter A","b":"The letter B","c":"The letter C","d":"The letter D"}},{"question":"Pick a letter - the answer is b","answer":"2","choice":{"a":"The letter A","b":"The letter B","c":"The letter C","d":"The letter D"}},{"question":"Pick a letter - the answer is c","answer":"3","choice":{"a":"The letter A","b":"The letter B","c":"The letter C","d":"The letter D"}},{"question":"Pick a letter - the answer is d","answer":"4","choice":{"a":"The letter A","b":"The letter B","c":"The letter C","d":"The letter D"}}]}



//declare the functions needed to run this application. 
function renderQuestionPrompt() {
    // Clear todoList element and update todoCountSpan
    questionBox.innerHTML = "";
    //todoCountSpan.textContent = todos.length;
    //questionBook.questions[0].question
    //questionBook.questions[0].answer
     //SET QUESTION
    questionBox.innerText=questionBook.questions[0].question

/*
// Render a new li for each question
    for (var i = 0; i < todos.length; i++) {
      var todo = todos[i];
  
      var li = document.createElement("li");
      li.textContent = todo;
      li.setAttribute("data-index", i);
  
      var button = document.createElement("button");
      button.textContent = "Complete";
  
      li.appendChild(button);
      todoList.appendChild(li);
    }*/
  }
  

/*function init(){};*/
function checkAnswer (){};
function updateScore(){};
function saveHighScore(){};


//ADDED EVENT LISTENERS
tester.addEventListener("click", function(){
    renderQuestionPrompt();
})

