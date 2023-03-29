const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-button');

const login = async () => {
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    console.log('LOGIN');
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        console.log('RESPONSE', response);
        const result = await response.json();
        console.log('RESULT', result);
        const token = localStorage.setItem('token', result);
        window.location.href = '/';
    } catch (error) {
        console.log(error);
    }
}

loginButton.addEventListener('click', (event) => {
    if (document.getElementById('user-password').value !== document.getElementById('user-password-confirm').value) {
        console.log('Passwords do not match');
        event.preventDefault();
        // Display an error message to the user
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = 'Passwords do not match';
        errorDiv.style.color = 'red';
        loginForm.appendChild(errorDiv);
    } else {
        login();
    }
});
