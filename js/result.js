let resultContainer = document.querySelector(".result-container");
let userAnswers = JSON.parse(sessionStorage.getItem("userAnswers"));
let questions = JSON.parse(sessionStorage.getItem("questions"));
let file = sessionStorage.getItem("quiz");
logoutBtn=document.getElementById("logout");

function fetchJSON() {
    fetch (`../resources/${file}.json`)
    .then (response => response.json())
    .then (data => {
        
        displayResult();
})
}

fetchJSON()

function displayResult() {
      
    
        for(let i = 0; i < questions.length; i++) {
            let resultQuestion = document.createElement("div");
            resultQuestion.classList.add("result-question")
    
            // append the question
            let questionPara = document.createElement("p");
            questionPara.innerHTML = `${i+1}. ${questions[i].question}`;
            resultQuestion.appendChild(questionPara);
    
    
            let selectedAnswerPara = document.createElement("p");
            
            // check if the answer is correct
            if(questions[i].correctAns === userAnswers[i]) {
                selectedAnswerPara.innerHTML = userAnswers[i];
                selectedAnswerPara.classList.add("correct")
                resultQuestion.appendChild(selectedAnswerPara);
                resultContainer.appendChild(resultQuestion);
            }
    
            // if the answer is not correct display both correct answer and user answer
            else {
    
                let correctAnsPara = document.createElement("p");
                correctAnsPara.classList.add("correct");
                correctAnsPara.innerHTML = questions[i].correctAns;
    
                selectedAnswerPara.innerHTML = userAnswers[i];
                selectedAnswerPara.classList.add("wrong")
    
                // append both answers to the div
                resultQuestion.appendChild(correctAnsPara)
                resultQuestion.appendChild(selectedAnswerPara);
                resultContainer.appendChild(resultQuestion);
            }
        }
    }
    logoutBtn.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = 'index.html';
    })