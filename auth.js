document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const errorMessage = document.getElementById('error-message');

    // Login function
    loginBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Redirect to chat page
                window.location.href = 'community.html';
            })
            .catch((error) => {
                errorMessage.textContent = error.message;
            });
    });

    // Signup function
    signupBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Redirect to chat page
                window.location.href = 'community.html';
            })
            .catch((error) => {
                errorMessage.textContent = error.message;
            });
    });

    // Check if user is already logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, redirect to chat page
            window.location.href = 'community.html';
        }
    });
});