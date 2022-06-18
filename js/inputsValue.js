 function getInputsValue(inputs){
    let userModel = inputs.length===4 ? {
        lastname:'',
        name:'',
        email:'',
        password:'',
    } : {
        email: '',
        password: '',
    };
    inputs.forEach(item => {
        item.addEventListener('input', (e) =>{
            const key = e.target.getAttribute('name');
            userModel[key] = e.target.value;
        })
    });  
    console.log(userModel)
    return userModel
 }
 export {getInputsValue}