// --- Password Toggle Logic (Works on both pages) ---
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');

if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
    });
}

// --- Confirm Password Toggle Logic (Sign Up page only) ---
const confirmPasswordInput = document.getElementById("ConfirmPassword");
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const confirmEyeIcon = document.getElementById('confirmEyeIcon');

if (toggleConfirmPasswordBtn && confirmPasswordInput && confirmEyeIcon) {
    toggleConfirmPasswordBtn.addEventListener('click', function () {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        confirmEyeIcon.classList.toggle('fa-eye');
        confirmEyeIcon.classList.toggle('fa-eye-slash');
    });
}

// --- Sign Up Form Validation & Local Storage ---
const signupForm = document.getElementById("signup");
if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const phoneNumberError = document.getElementById("phoneNumberError");
        const locationError = document.getElementById("locationError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");

        const name = signupForm['name'].value.trim();
        const email = signupForm['email'].value.trim();
        const phoneNumber = signupForm['phoneNumber'].value.trim();
        const location = signupForm['location'].value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Clear previous errors first
        if (nameError) nameError.innerText = "";
        if (emailError) emailError.innerText = "";
        if (phoneNumberError) phoneNumberError.innerText = "";
        if (locationError) locationError.innerText = "";
        if (passwordError) passwordError.innerText = "";
        if (confirmPasswordError) confirmPasswordError.innerText = "";

        let isValid = true;

        // Name Validation
        if (name === "") {
            if (nameError) { nameError.style.color = "red"; nameError.innerText = "Name cannot be empty"; }
            isValid = false;
        } else if (name.length > 20) {
            if (nameError) { nameError.style.color = "red"; nameError.innerText = "Name cannot be more than 20 letters"; }
            isValid = false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            if (emailError) { emailError.style.color = "red"; emailError.innerText = "Email is not valid"; }
            isValid = false;
        }

        // Phone Number Validation
        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumber.match(phoneNumberRegex)) {
            if (phoneNumberError) { phoneNumberError.style.color = "red"; phoneNumberError.innerText = "Phone Number must be 10 digits"; }
            isValid = false;
        }

        // Location Validation
        const locationRegex = /^[A-Za-z\s]+$/;
        if (!location.match(locationRegex)) {
            if (locationError) { locationError.style.color = "red"; locationError.innerText = "Location contains only alphabets"; }
            isValid = false;
        }

        // Password Validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (password === "") {
            if (passwordError) { passwordError.style.color = "red"; passwordError.innerText = "Password cannot be empty"; }
            isValid = false;
        } else if (password.length < 8) {
            if (passwordError) { passwordError.style.color = "red"; passwordError.innerText = "Password must be at least 8 characters"; }
            isValid = false;
        } else if (!password.match(passwordRegex)) {
            if (passwordError) { passwordError.style.color = "red"; passwordError.innerText = "Require mix of letters and numbers"; }
            isValid = false;
        }

        // Confirm Password Validation
        if (confirmPassword === "") {
            if (confirmPasswordError) { confirmPasswordError.style.color = "red"; confirmPasswordError.innerText = "Confirm password cannot be empty"; }
            isValid = false;
        } else if (password !== confirmPassword) {
            if (confirmPasswordError) { confirmPasswordError.style.color = "red"; confirmPasswordError.innerText = "Password does not match"; }
            isValid = false;
        }

        // If all fields are valid, store user data and redirect to Sign In
        if (isValid) {
            let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

            // Check if email already exists
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                if (emailError) { emailError.style.color = "red"; emailError.innerText = "Email is already registered"; }
                return;
            }

            const newUser = { name, email, phoneNumber, location, password };
            users.push(newUser);
            localStorage.setItem("registeredUsers", JSON.stringify(users));

            alert("Registration successful! Please sign in.");
            window.location.href = "SignIn.html";
        }
    });
}

// --- Sign In Form Validation & Authentication ---
const signinForm = document.getElementById("signin");
if (signinForm) {
    signinForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const email = signinForm['email'].value.trim();
        const password = passwordInput.value.trim();

        if (emailError) emailError.innerText = "";
        if (passwordError) passwordError.innerText = "";

        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            if (emailError) { emailError.style.color = "red"; emailError.innerText = "Email is not valid"; }
            isValid = false;
        }

        if (password === "") {
            if (passwordError) { passwordError.style.color = "red"; passwordError.innerText = "Password cannot be empty"; }
            isValid = false;
        }

        if (isValid) {
            const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            const matchedUser = users.find(user => user.email === email && user.password === password);

            if (matchedUser) {
                alert("Sign In successful! Redirecting to Tourist Landing Page.");
                window.location.href = "travel.html";
            } else {
                if (passwordError) {
                    passwordError.style.color = "red";
                    passwordError.innerText = "Invalid email or password / User not registered";
                }
            }
        }
    });
}

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}