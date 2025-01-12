document.getElementById("startQuizBtn").addEventListener('click', function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email ==="" && password === "") {
        alert("Please fill out your email & password!");
        return; 
    }
//   هاي عشان ارسل البيانات
//   localStorage.setItem("email", "user@example.com");
// localStorage.setItem("password", "mySecurePassword123")
//
let users = JSON.parse(localStorage.getItem("users")) || [];
let userFound = false;
for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
    userFound = true;
    sessionStorage.setItem("fullName", users[i].fullName);
    window.location.href = "quiz.html";
    break;
    }
}

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // if (email === storedEmail && password === storedPassword) {
    //     window.location.href = "quiz.html"; 
    // } else {
    //     alert("Invalid email or password.");
    // }
});
