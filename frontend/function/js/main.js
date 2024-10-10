// frontend/function/main.js

// Login Handling
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Send login request
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Parse response data
        const data = await response.json();

        // Check for successful response
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store token
            window.location.href = '/egspec/portal/u/dashboard'; // Redirect to dashboard
        } else {
            // Improved error handling
            console.error('Login error:', data); // Log error details for debugging
            alert(data.message || 'An error occurred. Please try again.'); // Show user-friendly error message
        }
    });
});
