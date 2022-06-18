import {checkingInputs} from "./checkInputs.js";
import { getInputsValue } from "./inputsValue.js";
const form = document.getElementById('form');
const username = document.getElementById('name1');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const inputs = document.querySelectorAll('input');
const button = document.querySelector('button');
  
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log("register");
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const lastnameValue = lastname.value;
    checkingInputs.checkEmail(emailValue);
    checkingInputs.checkLastName(lastnameValue);
    checkingInputs.checkPassword(passwordValue);
    checkingInputs.checkUserName(usernameValue);
})

let userModel = getInputsValue(inputs);

button.addEventListener('click',() =>{
      fetch('http://localhost:3000/auth/signup',{
          method:'POST',
          headers: {
              'content-type': 'application/json',
          },
          body:JSON.stringify(userModel),
      })
      .then((response) => {
          if(response.status === 200 && response.ok){
                return response.json();
          }
      })
      .then((result)=>{
        sessionStorage.setItem('token', result.token);
          window.location.href = 'index.html';
      })
})