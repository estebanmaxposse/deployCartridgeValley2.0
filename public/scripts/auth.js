// const login = async () => {
//     console.log('LOGIN');
//     const email = document.getElementById('user-email').value;
//     const password = document.getElementById('user-password').value;
//     return await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: email, password: password })
//     })
//         .then(async response => {
//             console.log('RESPONSE', response);
//             let data = await response.json();
//             console.log(data);
//             return data
//         })
//         .then(data => {
//             console.log('HERE');
//             console.log(data);
//             localStorage.setItem('token', data);
//             window.location.href = '/';
//         })
//         .catch(error => {
//             console.error(error);
//         })
// };

const login = async () => {
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    return await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => {
            console.log('RESPONSE', response);
            let data = response.json();
            return data
        })
        .then(token => {
            localStorage.setItem('token', token);
            return token
        })
        .catch(error => {
            console.error(error);
        });
};

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