let email = document.getElementById("email");
let password = document.getElementById("password");

let email_error = document.getElementById("email-error");
let pass_error = document.getElementById("pass-error");

document.getElementById("startQuizBtn").addEventListener('click', function() {

    let users = JSON.parse(localStorage.getItem("users")) || [];
    // console.log(users)


    if (email.value ==="" && password.value === "") {
        pass_error.innerHTML = "This can't be empty";
        email_error.innerHTML = "This can't be empty"
        return; 
    }

    console.log(users.length)
    for(let i = 0; i < users.length; i++) {
        // if(users[i].fullName ===  )
    }
//   هاي عشان ارسل البيانات
//   localStorage.setItem("email", "user@example.com");
// localStorage.setItem("password", "mySecurePassword123")
//
// let users = JSON.parse(localStorage.getItem("users")) || [];
// let userFound = false;
// for (let i = 0; i < users.length; i++) {
//     if (users[i].email == email && users[i].password == password) {
//     userFound = true;
//     sessionStorage.setItem("fullName", users[i].fullName);
//     window.location.href = "quiz.html";
//     break;
//     }
// }

//     const storedEmail = localStorage.getItem("email");
//     const storedPassword = localStorage.getItem("password");

    // if (email === storedEmail && password === storedPassword) {
    //     window.location.href = "quiz.html"; 
    // } else {
    //     alert("Invalid email or password.");
    // }
});
