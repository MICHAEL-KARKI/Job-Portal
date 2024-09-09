
document.addEventListener('DOMContentLoaded', function() {
    // Get the register and login buttons
    var registerButton = document.querySelector('.user-actions a[href="/register"]');
    var loginButton = document.querySelector('.user-actions a[href="/login"]');

    // Add event listeners to the buttons
    registerButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Redirect to the register page
        window.location.href = "/register";
    });

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Redirect to the login page
        window.location.href = "/login";
    });
});

// Add click event listeners to Register and Login buttons
document.getElementById('registerBtn').addEventListener('click', function() {
    // Toggle visibility of register options
    document.querySelector('.register-options').classList.toggle('show');
});

document.getElementById('loginBtn').addEventListener('click', function() {
    // Toggle visibility of register options
    document.querySelector('.register-options').classList.toggle('show');
});
