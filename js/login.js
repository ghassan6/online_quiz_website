let email = document.getElementById("email");
let password = document.getElementById("password");

let email_error = document.getElementById("email-error");
let pass_error = document.getElementById("pass-error");

sessionStorage.clear();

document.getElementById("startQuizBtn").addEventListener('click', function() {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = false;

    if (email.value ==="" && password.value === "") {
        pass_error.innerHTML = "This can't be empty";
        email_error.innerHTML = "This can't be empty";
        return;
    }


    for(let i = 0; i < users.length; i++) {
        if(users[i].email === email.value.trim() && users[i].password === password.value) {
            sessionStorage.setItem("email", users[i].email );
            sessionStorage.setItem("password", users[i].password);
            found = true;
            break;
        }
    }

    if(!found) {
        pass_error.innerHTML = "Email or password is not correct";
        email_error.innerHTML = "";
    }
    else window.location.href = 'dashboard.html'
    
});
