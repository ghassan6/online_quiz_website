let userAnswers = JSON.parse(sessionStorage.getItem("questions"));
console.log(userAnswers);
let question = [] ;
//  function displayResult() {
//       nextBtn.disabled = true;
//     nextBtn.style.display = "none";
//     for(let i=0 ; i< questions.length ;i++){
//         let resultQuestion=document.createElement("div");
//         resultQuestion.classList.add("result-question");
//       }
//         // append the question
//         let questionPara = document.createElement("p");
//         questionPara.innerHTML=questions[i].question;
//         resultQuestion.appendChild(questionPara);
//             let selectedAnswerPara = document.createElement("p");
//                // check if the answer is correct
//          if(questions[i].correctAns === userAnswers[i]) {
//                 selectedAnswerPara.innerHTML = userAnswers[i];
// //                 selectedAnswerPara.classList.add("correct")
// //                 resultQuestion.appendChild(selectedAnswerPara);
// //                 timer.appendChild(resultQuestion);
//         }
    
// //             // if the answer is not correct display both correct answer and user answer
// //             else {
    
// //                 let correctAnsPara = document.createElement("p");
// //                 correctAnsPara.classList.add("correct");
// //                 correctAnsPara.innerHTML = questions[i].correctAns;
    
// //                 selectedAnswerPara.innerHTML = userAnswers[i];
// //                 selectedAnswerPara.classList.add("wrong")
    
// //                 // append both answers to the div
// //                 resultQuestion.appendChild(correctAnsPara)
// //                 resultQuestion.appendChild(selectedAnswerPara);
// //                 timer.appendChild(resultQuestion);
// //             }
// //         }
//      }