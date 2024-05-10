
const Form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password1 = document.getElementById('pass1');
const password2 = document.getElementById('pass2');

Form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    validInputs();
});

const setError = (message , element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    // conlse.log(inputControl);
    
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    // conlse.log(inputControl);
    
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const ValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const password1Value = password1.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        setError("Username Is Required", username);
    } else {
        setSuccess(username);
    }
    
    if (emailValue === '') {
        setError("Email Is Required", email);
    } else if (!ValidEmail(emailValue)) {
        setError("Email Is Not Valid", email);
    } else {
        setSuccess(email);
    }

    if (password1Value === '') {
        setError("Password Is Required", password1);
    } else if (password1Value.length < 8) {
        setError("Password Must Be At Least 8 Character.", password1);
    } else {
        setSuccess(password1);
    }

    if (password2Value === '') {
        setError("Please Confirm Your Password", password2);
    } else if (password2Value !== password1Value) {
        setError("Password Doesn't match", password2);
    } else {
        setSuccess(password2);
    }
};