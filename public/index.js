let user = null;
const logoutButton = document.getElementById('logout');

const checkUser = () => {
    user = localStorage.getItem('token');
    console.log(user);
    if (!user) {
        window.location.href = '/pages/login.html'
        return
    } 
    const decodedToken = jwt_decode(user);
    if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        window.location.href = '/pages/login.html';
    }
    logoutButton.hidden = false;
    return user
}

const getCurrentUser = () => {
    user = localStorage.getItem('token');
    return user
}

checkUser()

const logout = async () => {
    await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(async response => {
            console.log(await response.json())
        })
        .catch(error => console.error(error));
    console.log('LOGOUT');
    localStorage.removeItem('token');
    window.location.href = '/'
}