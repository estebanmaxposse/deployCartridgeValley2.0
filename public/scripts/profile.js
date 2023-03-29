fetch(`/api/auth/user`, {
    headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
})
    .then(res => {
        if (!res.ok) {
            if (res.status === 401) {
                console.log('Unauthorized');
            }
            throw new Error('Error fetching profile')
        }
        return res.json()
    })
    .then(user => {
        let profilePicture = document.getElementById('profile-pic')
        profilePicture.setAttribute("src", user.avatar)

        let profileUsername = document.getElementById('profile-username')
        profileUsername.innerText = user.username
        
        let profileFullName = document.getElementById('profile-fullName')
        profileFullName.innerText = user.fullName

        let profileEmail1 = document.getElementById('profile-email-1')
        profileEmail1.innerText = user.email

        let profileEmail2 = document.getElementById('profile-email-2')
        profileEmail2.innerText = user.email

        let profilePhone = document.getElementById('profile-phone')
        profilePhone.innerText = user.phoneNumber

        let profileAddress1 = document.getElementById('profile-address-1')
        profileAddress1.innerText = user.shippingAddress

        let profileAddress2 = document.getElementById('profile-address-2')
        profileAddress2.innerText = user.shippingAddress

        let profileAge = document.getElementById('profile-age')
        profileAge.innerText = user.age
    })
    .catch((error) => {
        console.log(error);
        window.location.href = '../pages/login.html'
    })