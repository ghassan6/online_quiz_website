// variables decleration
// declare a questions array to store all the questions returned by fetch API
let questions = [];


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
.then (data => generateQuestions(data))


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

console.log(questions)

