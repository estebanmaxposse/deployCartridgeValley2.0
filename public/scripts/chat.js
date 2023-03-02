//Session handler
const logOut = () => {
    window.location.href = '/api/auth/logout'
}

let user

fetch(`/api/auth/user`)
    .then(res => {
        if (res.status !== 200) {
            document.getElementById('login-button').innerHTML = `
                <a class="nav-link btn btn-success" href="/pages/login.html">Login</a>
            `
            throw "User not found";
        }
        return res.json();
    })
    .catch((error) => {
        console.log(error);
        window.location.href = '/pages/login.html'
    })
//Messages & Chat
const server = io()

const renderMessages = (data) => {
    console.log(data);
    const htmlMessage = data.map((element) => {
        return (`
        <div class='text-center d-flex flex-column align-items-start m-2'>
            <div>
                <span class="fw-bold" style='color:blue; font-weight: bold;'>${element.author.name}</span>
                <span style='color:brown'>${element.date}</span>
            </div>
            <p class="fst-italic" style='color:green; font-style: italic'>${element.text}</p>
        </div>`
        )
    }).join('');
    document.getElementById('messages').innerHTML = htmlMessage;
}

let text = document.getElementById('message-text');

const addMessage = (e) => {
    const message = {
        text: text.value,
    };
    server.emit('new-message', message);
    text.value = ''
    text.focus()

    return false;
}

server.on('messages', data => {
    renderMessages(data);
});
