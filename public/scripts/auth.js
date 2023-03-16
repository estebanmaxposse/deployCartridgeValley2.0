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
// return await fetch('/api/auth/login', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email: email, password: password })
// })
//     .then(response => {
//         console.log('RESPONSE', response);
//         let data = response.json();
//         return data
//     })
//     .then(token => {
//         localStorage.setItem('token', token);
//         return token
//     })
//     .catch(error => {
//         console.error(error);
//     });
// };

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
            'Content-Type': 'application/json'
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