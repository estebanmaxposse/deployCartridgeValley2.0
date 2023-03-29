const signUpForm = document.getElementById('signUpForm');
const signUpButton = document.getElementById('signup-button');

const signUp = () => {
    console.log('SIGNUP');
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const username = document.getElementById('user-username').value || "";
    const fullName = document.getElementById('user-fullName').value || "";
    const phoneNumber = document.getElementById('user-phone').value || "";
    const shippingAddress = document.getElementById('user-address').value || "";
    const age = document.getElementById('user-age').value || null;
    const avatar = document.getElementById('user-avatar').value || "";
    fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ email: email, password: password, username: username, fullName: fullName, phoneNumber: phoneNumber, shippingAddress: shippingAddress, age: age, avatar: avatar })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data);
            window.location.href = '/';
        })
        .catch(error => {
            console.error(error);
        });
}

signUpButton.addEventListener('click', (event) => {
    if (document.getElementById('user-password').value !== document.getElementById('user-password-confirm').value) {
        console.log('Passwords do not match');
        event.preventDefault();
        // Display an error message to the user
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = 'Passwords do not match';
        errorDiv.style.color = 'red';
        signUpForm.appendChild(errorDiv);
    } else {
        signUp();
    }
});
