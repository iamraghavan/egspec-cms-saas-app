// frontend/function/dashboard.js

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token'); // Retrieve token
    console.log('Token:', token); // Log token for debugging

    if (!token) {
        window.location.href = '/egspec/portal/login'; // Redirect if no token
        return;
    }

    const response = await fetch('/api/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Include Bearer prefix
        }
    });

    if (response.ok) {
        const userData = await response.json(); // Fetch user data

        const source = document.getElementById('user-template').innerHTML;
        const template = Handlebars.compile(source);
        const html = template({
            name: userData.name,
            email: userData.email,
            role: userData.role,
        });

        document.getElementById('user-info').innerHTML = html; // Render user data
    } else {
        const errorData = await response.json(); // Get response data
        console.error('Error fetching user data:', errorData); // Log error
        alert(errorData.message || 'Failed to fetch user data. Please try again.'); // Show error message
    }
});
