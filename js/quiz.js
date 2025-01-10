// variables decleration
// declare a questions array to store all the questions returned by fetch API
let questions = [];
let index = 0;
let selectedAnswer = null;
let selectedBtn = null;


// declare DOM elements
let question_text = document.getElementsByClassName("question-text")[0];
let answers = document.querySelector(".answers")
let nextBtn = document.querySelector(".next-btn");


nextBtn.disabled = true;
// generate a random set of 5 unique int between 0 and 10 
function randomQuestions() {
    let indices = new Set();
    while(indices.size < 6) {
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


 if (index < questions.length) {
    let currentQuestion = questions[index];
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

   })
 } else {
    question_text.innerHTML = "Your score:";
    answers.innerHTML = "";
 }

}

nextBtn.addEventListener("click", () => {
    // display the correct answer
   checkAnswer(selectedAnswer, questions[index].correctAns, selectedBtn)
    
    setTimeout(() => {
        index++;
        displayQuestion();
    }, 3000)
})


function checkAnswer(selectedAnswer, correctAnswer, selectedBtn) {
    selectedAnswer === correctAnswer ? selectedBtn.classList.add("btn-success") : selectedBtn.classList.add("btn-danger") ;
}


console.log(questions)

