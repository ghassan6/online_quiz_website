// variables decleration
// declare a questions array to store all the questions returned by fetch API
let questions = [];
let currentQuestionIndex = 0;
let selectedAnswer = null;
let selectedBtn = null;
let timerInterval;
let score = 0;
let userAnswers = [];


// declare DOM elements
let question_text = document.getElementsByClassName("question-text")[0];
let answers = document.querySelector(".answers")
let nextBtn = document.querySelector(".next-btn");
let timer = document.querySelector(".timer");
let logoutBtn = document.getElementById("logout");

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


fetch ('../resources/questions.json')
.then (response => response.json())
.then (data => {
    generateQuestions(data);
    displayQuestion();
})


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


if (currentQuestionIndex < questions.length) {
    let currentQuestion = questions[currentQuestionIndex];
    question_text.innerText = currentQuestion.question;

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

   });

   startTimer(180);

 } else {
    question_text.innerHTML = `Your Socre: ${score} out of 5`;
    answers.innerHTML = "";
    timer.innerHTML = "";
    sessionStorage.setItem("userAnswers", userAnswers);
    sessionStorage.setItem("questions", JSON.stringify(questions));
    // displayResult();
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

    if(selectedAnswer === correctAnswer) {
        score++;
        selectedBtn.classList.add("btn-success");
    }
    else selectedBtn.classList.add("btn-danger");
    
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


// function displayResult() {
//     nextBtn.disabled = true;
//     nextBtn.style.display = "none";

//     for(let i = 0; i < questions.length; i++) {
//         let resultQuestion = document.createElement("div");
//         resultQuestion.classList.add("result-question")

//         // append the question
//         let questionPara = document.createElement("p");
//         questionPara.innerHTML = questions[i].question;
//         resultQuestion.appendChild(questionPara);


//         let selectedAnswerPara = document.createElement("p");
        
//         // check if the answer is correct
//         if(questions[i].correctAns === userAnswers[i]) {
//             selectedAnswerPara.innerHTML = userAnswers[i];
//             selectedAnswerPara.classList.add("correct")
//             resultQuestion.appendChild(selectedAnswerPara);
//             timer.appendChild(resultQuestion);
//         }

//         // if the answer is not correct display both correct answer and user answer
//         else {

//             let correctAnsPara = document.createElement("p");
//             correctAnsPara.classList.add("correct");
//             correctAnsPara.innerHTML = questions[i].correctAns;

//             selectedAnswerPara.innerHTML = userAnswers[i];
//             selectedAnswerPara.classList.add("wrong")

//             // append both answers to the div
//             resultQuestion.appendChild(correctAnsPara)
//             resultQuestion.appendChild(selectedAnswerPara);
//             timer.appendChild(resultQuestion);
//         }
//     }
// }

logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = 'index.html';
})