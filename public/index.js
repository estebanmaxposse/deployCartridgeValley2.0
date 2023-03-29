let user = null;
const logoutButton = document.getElementById('logout');

const checkUser = () => {
    user = localStorage.getItem('token');
    console.log(user);
    if (!user) {
        alert('Please login first')
        window.location.href = '/pages/login.html'
        return
    } 
    const decodedToken = jwt_decode(user);
    if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        alert('Session expired, please login again')
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
    console.log('LOGOUT');
    localStorage.removeItem('token');
    window.location.href = '/'
}