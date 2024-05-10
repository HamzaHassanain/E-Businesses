
const Form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

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
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    
    if (emailValue === '') {
        setError("Email Is Required", email);
    } else if (!ValidEmail(emailValue)) {
        setError("Email Is Not Valid", email);
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError("Password Is Required", password);
    } else if (passwordValue.length < 8) {
        setError("Password Must Be At Least 8 Character.", password);
    } else {
        setSuccess(password);
    }
};