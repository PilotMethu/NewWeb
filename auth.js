
// Simple user storage in localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const showSignUpLink = document.getElementById('showSignUp');
    const showSignInLink = document.getElementById('showSignIn');
    const profileLink = document.getElementById('profileLink');
    const authLink = document.getElementById('authLink');

    // Update navigation based on auth status
    if (currentUser) {
        profileLink.style.display = 'inline-block';
        authLink.style.display = 'none';
    }

    // Toggle between sign in and sign up forms
    showSignUpLink.addEventListener('click', (e) => {
        e.preventDefault();
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
    });

    showSignInLink.addEventListener('click', (e) => {
        e.preventDefault();
        signUpForm.style.display = 'none';
        signInForm.style.display = 'block';
    });

    // Handle Sign Up
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (users.some(user => user.email === email)) {
            alert('Email already registered!');
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        currentUser = newUser;
        
        alert('Registration successful!');
        window.location.href = 'profile.html';
    });

    // Handle Sign In
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUser = user;
            window.location.href = 'profile.html';
        } else {
            alert('Invalid email or password!');
        }
    });
});
