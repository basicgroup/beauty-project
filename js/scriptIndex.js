let intervalId;
function refreshToken(){
	fetch('http://localhost:3000/auth/refreshtoken',{
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'authorization': 'Bearer ' + sessionStorage.getItem('token')
		},
	})
	.then(response =>{
		if(response.status !== 200){
			throw new Error();
		}
		return response.json()
	}).then((result)=>{
		sessionStorage.setItem('token', result.token)
	}).catch(err =>{
		clearInterval(intervalId)
		window.location.href = 'login.html'	;
		sessionStorage.clear();
	})
}
refreshToken();
intervalId = setInterval(()=>{
	refreshToken()
},200000)

const  itemBox = document.querySelectorAll('.namePerfume'); 
const  cartCont = document.getElementById('cart_content'); 

function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
};

function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
};

function addToCart(e){
	this.disabled = true; 
	var cartData = getCartData() || {}; 
	var parentBox = this.parentNode; 
	var itemId = this.getAttribute('data-id');
	  
	var itemName = parentBox.querySelector('.name').innerHTML; 
    var itemUser = parentBox.querySelector('.cost').innerHTML;
	if(cartData.hasOwnProperty(itemId)){ 
		cartData[itemId][2] += 1;
	} else { 
		cartData[itemId] = [itemName, itemUser, 1];
	}
	
	if(!setCartData(cartData)){ 
		this.disabled = false; 
	}
	return false;
}

for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}

function openCart(e){
	var cartData = getCartData();
	var totalItems = '';
	console.log(JSON.stringify(cartData));
	
	if(cartData !== null){
		totalItems = `<div class='pop'>
		<table class="user_list">
        <tr>
        <th> Perfume name</th>
        <th> Price </th>
		<th> Quantity</th>
        </tr> </div>`;
		for(var items in cartData){
			totalItems += '<tr>';
			for(var i = 0; i < cartData[items].length; i++){
				totalItems += '<td>' + cartData[items][i] + '</td>';
			}
			totalItems += '</tr>';
		}
		totalItems += '<table>';
		cartCont.innerHTML = totalItems;
	} 
	return false;
}

const checkout = document.getElementById('checkout');
checkout.addEventListener('click', openCart )

const clear = document.getElementById('clear_cart');
clear.addEventListener('click', (e) => {
    localStorage.removeItem('cart');
	cartCont.innerHTML = '';
})
    
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){
		 handler.call( elem );
	 });
  }
  return false;
}