let resultContainer = document.querySelector(".result-container");
let userAnswers = JSON.parse(sessionStorage.getItem("userAnswers"));
let questions = JSON.parse(sessionStorage.getItem("questions"));
let file = sessionStorage.getItem("quiz");
let logoutBtn = document.getElementById("logout");
let container = document.querySelector(".container-fluid .row");

function displayResult() {

        let header = document.createElement("div");
        header.classList.add("result-head")
        let correct = document.createElement("p");
        correct.style.gridArea = "1/2"
        correct.innerHTML = "Correct";
        correct.classList.add("result-header")
        let wrong = document.createElement("p");
        wrong.style.gridArea = "1/3"
        wrong.innerHTML = "Wrong";
        wrong.classList.add("result-header")


        header.appendChild(correct);
        header.appendChild(wrong);

        container.appendChild(header)

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
                // let span = document.createElement("span");
                // span.innerHTML = "Correct: "
                // resultQuestion.appendChild(span)
                let correctAnsPara = document.createElement("p");
                correctAnsPara.classList.add("correct");
                correctAnsPara.innerHTML = questions[i].correctAns;
    
                selectedAnswerPara.innerHTML = userAnswers[i];
                selectedAnswerPara.classList.add("wrong")
    
                // append both correct answer and wrong answers to the div
                resultQuestion.appendChild(correctAnsPara)
                resultQuestion.appendChild(selectedAnswerPara);
                resultContainer.appendChild(resultQuestion);
            }
        }

        // add a home button after finishing the quiz
        let homeButton = document.createElement("btn");
        homeButton.classList.add("res-btn","px-4", "mt-3" ,"btn", "ms-auto", "me-auto");
        homeButton.innerHTML = "Home";
        homeButton.addEventListener("click", () => {
            window.location.href = 'dashboard.html'
        })
        container.appendChild(homeButton);
}

displayResult();

logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = 'index.html';
})