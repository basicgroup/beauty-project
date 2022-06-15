const form = document.getElementById('form');
const username = document.getElementById('name');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const inputs = document.querySelectorAll('input')
const button = document.querySelector('button')

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const usernameValue = username.value
    const emailValue = email.value
    const passwordValue = password.value
    const lastnameValue = lastname.value
    checkingInputs.checkEmail(emailValue);
    checkingInputs.checkLastName(lastnameValue);
    checkingInputs.checkPassword(passwordValue);
    checkingInputs.checkUsername(usernameValue);
})

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')
    small.innerText = message;
    formControl.className = 'form-control error'
}
   
function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

class checkInputs{
    checkUsername(usernameValue){
        if(usernameValue ===''){
            setErrorFor(username,'Name can`t be blank' );
        } else{
            setSuccessFor(username);
        }
    }
    checkLastName(lastnameValue){
        if(  lastnameValue ===''){
            setErrorFor(lastname, 'Last name can`t be blank');
        }  else {
            setSuccessFor(lastname)
        }
    }
    checkEmail(emailValue){
        if(  emailValue ===''){
            setErrorFor(email, 'Email can`t be blank');
        }  else {
            setSuccessFor(email)
        }
    }
    checkPassword(passwordValue){
        if (passwordValue  === '' ){
            setErrorFor(password, 'Password can`t be blank')
        } else {
            setSuccessFor(password);
        }
    }
}
let checkingInputs = new checkInputs;


const userModel = {
    lastname:'',
    name:'',
    email:'',
    password:''
};

    inputs.forEach(item =>{
        item.addEventListener('input',(e) =>{
        const key = e.target.getAttribute('name');
        userModel[key] = e.target.value
        })
    });

button.addEventListener('click',() =>{
    fetch('http://localhost:3000/auth/signup',{
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
    })
    .then((result)=>{
        sessionStorage.setItem('token', result.token)
        window.location.href = 'index.html'
    })
})

export {checkingInputs,form,email,password,inputs,button};