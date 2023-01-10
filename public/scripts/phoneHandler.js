//Phone Number Handler
const phoneInputField = document.getElementById('user-phone');
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
});

const formatPhone = () => {
    console.log(phoneInput);
    const phoneNumber = phoneInput.getNumber()
    console.log(phoneNumber);
    const formatedPhone = document.getElementById('formated-phone')
    console.log(formatedPhone);
    formatedPhone.value = phoneNumber
}