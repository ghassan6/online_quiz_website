// variables decleration
// declare a questions array to store all the questions returned by fetch API
let questions = [];
let currentQuestionIndex = 0;
let selectedAnswer = null;
let selectedBtn = null;
let timerInterval;
let score = 0;
let userAnswers = [];

let file = sessionStorage.getItem("quiz");

// declare DOM elements
let question_text = document.getElementsByClassName("question-text")[0];
let answers = document.querySelector(".answers")
let nextBtn = document.querySelector(".next-btn");
let timer = document.querySelector(".timer");
let logoutBtn = document.getElementById("logout");
let question_body = document.querySelector(".question-body");


if(sessionStorage.getItem("email") == null) window.location.href = 'forbidden.html'
// disable the next button by default
nextBtn.disabled = true;

// generate a random set of 5 unique int between 0 and 10 
function randomQuestions() {
    let indices = new Set();
    while(indices.size < 5) {
        indices.add(parseInt(Math.random() * 11))
    }
    return indices;
}

function fetchJSON() {
    fetch (`../resources/${file}.json`)
    .then (response => response.json())
    .then (data => {
        generateQuestions(data);
        displayQuestion();
})
}

fetchJSON()

function generateQuestions(data) {
    // get 5 random indices 
    let indices = randomQuestions();

    // in each iteration create a random question object 
    for(index of indices) {
        let question = {
            "question": data[index].question,
            "answers": [...data[index].answers],
            "correctAns": data[index].correctAns
        };

        // add the recived question to questions array
        questions.push(question);
    }
}

function displayQuestion() {
    selectedAnswer = null;
    selectedBtn = null;
    nextBtn.disabled = true;
    answers.innerHTML = "";

    timer.innerHTML = ""
    if (currentQuestionIndex < questions.length) {
        let currentQuestion = questions[currentQuestionIndex];
        question_text.innerText = currentQuestion.question;

        startTimer(10);
        currentQuestion.answers.forEach(answer => {
            let button = document.createElement("button");
            button.classList.add("btn", "mt-2", "answer-btn");
            button.innerHTML = answer;

        // add eventlistener to check the correct answer
        button.addEventListener("click", function() {
            selectedAnswer = answer;
            selectedBtn = this; 
            if(selectedAnswer != null) nextBtn.disabled = false;
        })
        answers.appendChild(button);

        // on the last questoin change the button to "submit"
        if(currentQuestionIndex === 4) nextBtn.innerHTML = "Submit"

    });

 } else {
    question_text.innerHTML = '';
    if(score >= 6) {
        question_body.style.backgroundColor  = "#77ff77";
        question_body.style.color = "#ffffff"
        question_text.innerHTML = "You Passed!"

    }
    else {
        question_body.style.backgroundColor  = "#ff2546";
        question_body.style.color = "#ffffff"
        question_text.innerHTML = "You failed"
    }
    answers.style.color =  "#ffffff"
    answers.innerHTML = `Your Socre: ${score} out of 10`;
    timer.innerHTML = "";
    sessionStorage.setItem("userAnswers",JSON.stringify(userAnswers) );
    sessionStorage.setItem("questions", JSON.stringify(questions));

    addBtn();
    nextBtn.style.display = "none";
 }

}

nextBtn.addEventListener("click", () => {
    // display the correct answer
   checkAnswer(selectedAnswer, questions[currentQuestionIndex].correctAns, selectedBtn);

   clearInterval(timerInterval) /* stop the timer */
    
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 900)
})


function checkAnswer(selectedAnswer, correctAnswer, selectedBtn) {

    if(selectedAnswer === correctAnswer) score += 2;

    userAnswers.push(selectedAnswer);
}


// function to set a time for each qeustion
function startTimer(amount) {

    if (timerInterval) clearInterval(timerInterval); /* stop the timer on the new qeustion */

    let minutesLeft = parseInt(amount / 60);
    let secondsLeft = amount % 60;

     timerInterval = setInterval(function() {
        // display remaining time
        timer.innerHTML = `${minutesLeft} : ${secondsLeft}`;

        // update the time every second
        if(minutesLeft === 0 && secondsLeft ===0 ) {
            clearInterval(timerInterval);
            userAnswers.push("not answered")
            currentQuestionIndex++;
            displayQuestion();
        }
        else {
            if(secondsLeft === 0 && minutesLeft > 0) {
                minutesLeft -= 1;
                secondsLeft = 59;
            }
           else secondsLeft -= 1;   
        }
    }, 1000)
}

function addBtn() {
    let resultButton = document.createElement("button");
    
    resultButton.innerHTML = "Show Result";
    resultButton.classList.add("res-btn","px-4", "mt-3" ,"btn", "ms-3")
    resultButton.addEventListener("click", () => {
        window.location.href = 'result.html';
    })

    let homeButton = document.createElement("button");
    homeButton.innerHTML = "Back";
    homeButton.classList.add("res-btn", "px-4", "mt-3" ,"btn" , "ms-3");
    homeButton.addEventListener("click", () => {
        window.location.href = 'dashboard.html';
    })

    question_body.appendChild(homeButton)
    question_body.appendChild(resultButton)
}

logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = 'index.html';
})