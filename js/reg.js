document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent sending the form

    // 
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-pass');

    //error messages
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passError = document.getElementById('pass-error');
    const confirmPassError = document.getElementById('confirm-pass-error');

    // Regex validate
    const nameRegex = /^[a-zA-Z\s]{3,50}$/; // Name between 3 and 50 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple Email
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/; // 8-character password with letter and number
    let isValid = true;

    // name validate
    if (!nameRegex.test(fullName.value)) {
        nameError.textContent = 'Name Must be between 3 and 50 characters';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Email Validate
    if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email.';
        isValid = false;
        console.log("asd")
    } else {
        emailError.textContent = '';
    }

    // Pass Vlidate
    if (!passwordRegex.test(password.value)) {
        passError.textContent = 'Password must be at least 8 characters and contain a letter and number';
        isValid = false;
    } else {
        passError.textContent = '';
    }

    // pass and confirm pass validate
    if (password.value !== confirmPassword.value) {
        confirmPassError.textContent = 'Password and password confirmation are not identical.';
        isValid = false;
    } else {
        confirmPassError.textContent = '';
    }

    // If all the fields are correct
    if (isValid) {
        let user = { fullName:fullName.value.trim(), email:email.value.trim(), password:password.value };

        //Retrieve data stored in LocalStorage
        let users = JSON.parse(localStorage.getItem('users')) || []; //If there is no data, an empty matrix is configured
       
        // Verify repeat email
        const emailExists = users.some(u => u.email === email.value);
        if (emailExists) {
            emailError.textContent = 'This email is already registered.';
            return;
        }

        // Add new user to matrix
        users.push(user);

        // Data storage in LocalStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Save current user in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(user));

        alert('Registered successfully!');
        // User orientation to login page
        window.location.href = 'login.html';
    }
});
