//----------Store items to Array on Click Stringfy-------//
var additemsArray = [];
let cartTotal = [0];
function CartShopItem(imageSrc, title, price) {
    let item = {src: `${imageSrc}`, name: `${title}`, amount: `${price}`};

    // Check if the item already exists in the cart
    for (let i = 0; i < additemsArray.length; i++) {
        if(item.src == additemsArray[i].src) {
            alert("This item has already been added to your cart.");
            return;
        }
    }
    alert("The total value of your cart is " + item.amount);

    // Add the item to the cart
    additemsArray.push(item);

    let mytotal = 0;
    let vat = 0.15;
    
    // Calculate the total including VAT
    for (i = 0; i < additemsArray.length; i++) {
        mytotal += Number(additemsArray[i].amount.replace("₱", "").trim()); 
    }
    mytotal += mytotal * vat; // Adding VAT to the total
    mytotal = Math.round(mytotal * 100) / 100; // Round to 2 decimal places

    cartTotal.push(mytotal);

    // Store the items and the total in local storage
    localStorage.setItem("item", JSON.stringify(additemsArray));
    localStorage.setItem("mytotal", JSON.stringify(cartTotal));

    console.log(window.localStorage);
}

//----------Purchase Button-------//
function orderNumber(){
    document.getElementById("gen-output").innerHTML =  Math.random().toString(36).substr(2, 9);
}

//----------Remove All Items-------//
function removeallItems(){
    let data = JSON.parse(localStorage.getItem("item"));
    // Reset the cart items
    data = [];
    localStorage.setItem("item", JSON.stringify(data));

    // Reset the total
    let amount = JSON.parse(localStorage.getItem("mytotal"));
    amount = [];
    localStorage.setItem("mytotal", JSON.stringify(amount));
}

removeallItems();
