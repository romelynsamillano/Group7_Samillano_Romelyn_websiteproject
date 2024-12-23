//----------Button on click should remove from cart-------//
let removeCartItemButtons = document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons);
for(let i = 0; i < removeCartItemButtons.length; i++){
	let button = removeCartItemButtons[i];
	button.addEventListener('click', removeCartItem)
}

function removeCartItem(event){
		additemsArray = JSON.parse(localStorage.getItem("item"));
		additemsArray.splice(event,1);
	let buttonClicked = event.target;
			buttonClicked.parentElement.parentElement.remove()
		localStorage.setItem("item", JSON.stringify(additemsArray));
		location.reload()
}

//----------choose quantity of items-------//
let quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(let i = 0; i < quantityInputs.length; i++){
	let input = quantityInputs[i];
	input.addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
	let input = event.target
	if(isNaN(input.value) || input.value <= 0){
		input.value = 1
	}	
}

//----------Purchase Button-------//
function purchaseButtonClicked(){
	document.getElementsByClassName('btn-purchase').addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
	
	alert('Thank you for your purchase')
	alert('Your Tracking Code is:' + ' ' + Math.random().toString(36).substr(2, 9));
	let cartItems = document.getElementsByClassName('cart-items')[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild)
	}
}

//----------Button on click should add to cart-------//

let addToCartbuttons = document.getElementsByClassName('shop-item-button')
for(let i = 0; i < addToCartbuttons.length; i++){
	let button = addToCartbuttons[i];
	button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event){
	let button = event.target;
	let shopItem = button.parentElement.parentElement;
	let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
	let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
	let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
	console.log(imageSrc, title, price)
	CartShopItem(imageSrc, title, price)
}

//----------Store items to Array on Click Stringfy-------//
var additemsArray = [];
let cartTotal = [0];
function CartShopItem (imageSrc, title, price) {
		let item = {src: `${imageSrc}`, name: `${title}`, amount: `${price}`};

		for (let i = 0; i < additemsArray.length; i++) {
			if(item.src == additemsArray[i].src) {
				alert("this item has already been added to your cart");
				return;
			}
		}
		alert("The total value of your cart is " + item.amount);
	
	additemsArray.push(item);

	let mytotal = 0;
	let vat = 0.15
	for (i = 0; i < additemsArray.length; i++) {
	mytotal += Number(additemsArray[i].amount.replace("₱", " ")); // Changed R to ₱
	mytotal += vat
	mytotal = Math.round(mytotal * 100) / 100
	cartTotal.push(mytotal);
	}
	localStorage.setItem("item", JSON.stringify(additemsArray));
	localStorage.setItem("mytotal", JSON.stringify(cartTotal));
	console.log(window.localStorage);
}

//----------------------add-cart-total----------------------//
let newCartTotal = JSON.parse(localStorage.getItem("mytotal"));
for (let i = 0; i < newCartTotal.length; i++) {
	let t = newCartTotal[i];
	document.getElementById('total').innerHTML = "₱" + t; // Changed R to ₱
}

//----------Retrieve Items from Array Parse JSON-------//
let newArray = JSON.parse(localStorage.getItem("item"));
for (let i = 0; i < newArray.length; i++) {
	let price = newArray[i].amount;
	let imageSrc = newArray[i].src;
	let name = newArray[i].name;
	if(price != undefined && imageSrc != undefined && name != undefined){
		addItemToCart(imageSrc, name, price);
	}
}

//----------adding Items to this Cart-------//

function addItemToCart(imageSrc, name, price) {

	let cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	let cartItems = document.getElementsByClassName('cart-items')[0];

	let cartRowContents = `
		<div class="cart-item cart-column">
			<img class="cart-item-image" src="${imageSrc}" width="100" height="100">
			<span class="cart-item-title">${name}</span>
		</div>
		<span class="cart-price cart-column">${price}</span>
		<div class="cart-quantity cart-column">
			<input class="cart-quantity-input" type="number" value="1">
			<button class="btn btn-danger" type="button">REMOVE</button>
		</div>`
	cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
