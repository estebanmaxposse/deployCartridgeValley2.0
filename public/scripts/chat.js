//Session handler
const logOut = () => {
    window.location.href = '/api/auth/logout'
}

// let token = localStorage.getItem('token')
let sender = jwt_decode(user)

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
    console.log('addMessage');
    const message = {
        author: {
            name: sender.user.username,
            avatar: sender.user.avatar
        },
        senderID: sender.user._id,
        text: text.value,
        senderEmail: sender.user.email,
    };
    console.log(message);
    server.emit('new-message', message);
    text.value = ''
    text.focus()

    return false;
}

server.on('messages', data => {
    console.log('messages', data);
    renderMessages(data);
});
