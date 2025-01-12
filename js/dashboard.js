let userDiv = document.getElementById("user");
let currentUserEmail = sessionStorage.getItem("email")
let users = JSON.parse(localStorage.getItem("users"));
let logout = document.getElementById("logout");

// let startQuizBtn = document.getElementById("startQuiz");
let startQuizBtn = document.querySelectorAll(".startQuiz")

let currentUser = {};

function getUser() {

    for(user of users) {
        if(user.email === currentUserEmail ) {
            currentUser["email"] = currentUserEmail;
            currentUser["name"] = user.fullName;
            currentUser["pass"] = user.password;
        }
    }
}

getUser()

userDiv.innerHTML = currentUser.name;

logout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = 'index.html'
})


startQuizBtn.forEach(btn => {
    btn.addEventListener("click", function() {
        let file = btn.getAttribute("data-file");
        sessionStorage.setItem("quiz", file )
    })
})
// startQuizBtn.addEventListener("click", function() {
//     let file = startQuizBtn.getAttribute("data-file")
//     sessionStorage.setItem("quiz", file )
// })