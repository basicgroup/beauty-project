import Fetch from "../services/Fetch.js";
const button = document.querySelector('button')
import {checkingInputs,form,email,password,inputs} from "./register.js";

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const emailValue = email.value;
    const passwordValue = password.value;
    checkingInputs.checkEmail(emailValue);
    checkingInputs.checkPassword(passwordValue);
})

const userModel = {
    email: '',
    password: '',
};

inputs.forEach(item => {
    item.addEventListener('input', (e) =>{
        const key = e.target.getAttribute('name');
        userModel[key] = e.target.value
    })
});

button.addEventListener('click',() =>{
    fetch('http://localhost:3000/auth/signin',{
        method:'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(userModel)
    })
    .then((response) => {
        if(response.status === 200 && response.ok){
            return response.json()
      }
     }).then(({token}) => {
        Fetch.token = token
        sessionStorage.setItem('token', token)
        window.location.href = 'index.html'
     })
})