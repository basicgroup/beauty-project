const username = document.getElementById('name1');
class checkInputs{
    checkUserName(usernameValue){
        if(usernameValue === ''){
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

  let checkingInputs = new checkInputs;
  export {checkingInputs}