// global variables for questions and highscore
var startQuizSec = document.getElementById("startpage");
var startBtn = document.getElementById("startbtn");
var quiz = document.getElementById("quiz");
var quizTimer = document.getElementById("timer");
var questions = document.getElementById("questions");
var result = document.getElementById("result");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");
var gameOver = document.getElementById("gameover");
var finalScore = document.getElementById("finalScore");
var initials = document.getElementById("initials");
var submitScore = document.getElementById("submitScore");
var highScoreCont = document.getElementById("highscoreContainer");
var HSDiv = document.getElementById("high-scorePage");
var highScoreInit = document.getElementById("highscore-initials");
var displayScore = document.getElementById("highscore-score");
var endGameBtns = document.getElementById("endGameBtns");

// starts quiz
startBtn.addEventListener("click",startQuiz);

// quiz questions
var quizQuestions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "script",
    choiceB: "js",
    choiceC: "javascript",
    choiceD: "scripting",
    correctAnswer: "a"},
  {
    question: "In JavaScript, what is a block of code called that is used to perform a specific task?",
    choiceA: "Function",
    choiceB: "Declaration",
    choiceC: "Variable",
    choiceD: "String",
    correctAnswer: "a"},
   {
    question: "How do you create a function in JavaScript?",
    choiceA: "call myFunction()",
    choiceB: "myFunction()",
    choiceC: "call function myFunction",
    choiceD: "Call.myFunction()",
    correctAnswer: "b"},
    {
    question: "How does a for loop start?",
    choiceA: "for (i = 0; i <= 5)",
    choiceB: "for else ()",
    choiceC: "for i = 1 to 5",
    choiceD: "for (i = 0; i <= 5; i++)",
    correctAnswer: "d"},
    {
    question: "How can you add a comment in a JavaScript?",
    choiceA: "!--This is a comment--",
    choiceB: "#This is a comment",
    choiceC: "//This is a comment",
    choiceD: "'This is a comment",
    correctAnswer: "c"},  
    {
    question: "How do you round the number 7.25, to the nearest whole number?",
    choiceA: "Math.rnd(7.25)",
    choiceB: "round(7.25)",
    choiceC: "Math(7.25)",
    choiceD: "Math.round(7.25)",
    correctAnswer: "d"},   
    ];

// checks answer to see if correct
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();

    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        currentQuestionIndex++;
        generateQuizQuestion();
        timeLeft -= penalty;
    }else{
        showScore();
    }
}

// this function goes through the array containing the quiz questions to generate the questions
function generateQuizQuestion(){
    gameOver.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var penalty = 5;
var timerInterval;
var score = 0;
var correct;

// starts timer and displays first question
function startQuiz(){
    gameOver.style.display = "none";
    startQuizSec.style.display = "none";
    generateQuizQuestion();

    //timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quiz.style.display = "block";
}

// displays game over screen and asks user to enter initials
function showScore(){
    quiz.style.display = "none"
    gameOver.style.display = "flex";
    clearInterval(timerInterval);
    initials.value = "";
    finalScore.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// saves and stringifies the high scores in local stoage, also the user initials
submitScore.addEventListener("click", function highscore(){
    
    
    if(initials.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = initials.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameOver.style.display = "none";
        highScoreCont.style.display = "flex";
        HSDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// pulls local storage to show high score list
function generateHighscores(){
    highScoreInit.innerHTML = "";
    displayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highScoreInit.appendChild(newNameSpan);
        displayScore.appendChild(newScoreSpan);
    }
}

// displays high scores
function showHighscore(){
    startQuizSec.style.display = "none"
    gameOver.style.display = "none";
    highScoreCont.style.display = "flex";
    HSDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// clears local storage from high score list and initials
function clearScore(){
    window.localStorage.clear();
    highScoreInit.textContent = "";
    displayScore.textContent = "";
}

// resets timer and questions if user wanted to play again
function replayQuiz(){
    highScoreCont.style.display = "none";
    gameOver.style.display = "none";
    startQuizSec.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}