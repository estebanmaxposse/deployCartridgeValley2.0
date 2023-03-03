//Products

//Render without template
const renderProducts = () => {
    fetch('/api/products')
        .then(res => res.json())
        .then(data => {
            let table = '<table class="table table-stripped w-75 m-auto table-hover table-bordered">'
            table += '<thead><tr><th scope="col">ID #</th><th scope="col">Title</th><th scope="col">price</th><th scope="col">Thumnbnail</th></tr></thead>'
            table += '<tbody>'
            data.forEach(product => {
                table += `
                <tr class='text-center'>
                    <th scope='row'> ${product._id} </th>
                    <td class='text-center'><a href=${product.url}>${product.title}</a></td>
                    <td class='text-center'>${product.price}</td>
                    <td class='text-center'><img src=${product.thumbnail} class='w-25 h-auto' />
                </tr>`
            });
            table += '</tbody></table>'
            document.getElementById('product-container').innerHTML = table
        })
}

renderProducts()

// let productForm = document.getElementById('form-product')
// const addProduct = (e) => {
//     const product = {
//         title: document.getElementById('product-title').value,
//         price: document.getElementById('product-price').value,
//         thumbnail: document.getElementById('product-thumbnail').value,
//     };
//     server.emit('new-product', product);
//     productForm.reset()
//     return false
// };

//Session handler
const logOut = () => {
    window.location.href = '/api/auth/logout'
}

// let user

// const checkUser = async () => {
//     await fetch(`/api/auth/user`)
//         .then(res => {
//             console.log('here');
//             if (res.status !== 200) {
//                 document.getElementById('login-button').innerHTML = `
//                     <a class="nav-link btn btn-success" href="/pages/login.html">Login</a>
//                 `
//                 throw "User not found";
//             }
//             return res.json();
//         })
//         .then(user => {
//             localStorage.setItem('user', (user))
//             user = localStorage.getItem('user');
//             let innerWelcome = `
//                 <div class="alert alert-primary d-flex justify-content-between" role="alert">
//                     <h2>Welcome: ${user.username}! </h2>
//                     <button type="button" class="btn btn-danger" onclick="logOut()" >Logout</button>
//                 </div>
//             `;
//             document.getElementById('welcome').innerHTML = innerWelcome;
//         })
//         .catch(() => {
//             window.location.href = '/pages/login.html'
//         })

//     if (!user) {
//         window.location.href = '/pages/login.html'
//     }
// }

// checkUser()

let user

const login = () => {
    console.log('LOGIN');
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.token);
            // window.location.href = '/';
        })
        .catch(error => {
            console.error(error);
        });
};

const signUp = () => {
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
            localStorage.setItem('token', data.token);
            console.log(data.token);
            return data.token;
            // window.location.href = '/';
        })
        .catch(error => {
            console.error(error);
        });
}

const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log(token);
        await fetch('/api/auth/user', {
            headers: {
                'Authorizaion': `Bearer ${token}`
            }
        })
        .then(res => console.log(res))
        .catch(window.location.href = '/pages/login.html');
    } catch (error) {
        window.location.href = '/pages/login.html'
    }
}

fetchUserData()