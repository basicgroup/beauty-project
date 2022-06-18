import {checkingInputs} from "./checkInputs.js";
import Fetch from "../services/Fetch.js";
import { getInputsValue } from "./inputsValue.js";
const form = document.getElementById('form1');
const email = document.getElementById('email');
const password = document.getElementById('password');
const inputs = document.querySelectorAll('input');
const button = document.querySelector('#button');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log("login");
    const emailValue = email.value;
    const passwordValue = password.value;
    checkingInputs.checkEmail(emailValue);
    checkingInputs.checkPassword(passwordValue);
})

let userModel=getInputsValue(inputs)

button.addEventListener('click',() =>{
    fetch('http://localhost:3000/auth/signin',{
        method:'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(userModel)
    })
    .then((response) => {
         return response.json()
     }).then(({token}) => {
        Fetch.token = token
        window.location.href = 'index.html'
     })
})