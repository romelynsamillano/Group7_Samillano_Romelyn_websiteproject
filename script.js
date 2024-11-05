const products = [
    { name: 'Dog Food', price: 175, img: 'https://i.huffpost.com/gen/1339922/images/o-DOG-FOOD-facebook.jpg', flavors: ['Chicken', 'Beef', 'Lamb'] },
    { name: 'Cat Toy', price: 150, img: 'https://www.rover.com/blog/wp-content/uploads/2019/03/toy-birdwand.jpg', toys: ['Mice toy', 'Ball', 'Feather'] },
    { name: 'Bird Cage', price: 250, img: 'https://tse3.mm.bing.net/th?id=OIP.Y8IqatqtK5Pa_-lnXEGjgwHaHa&pid=Api&P=0&h=180', size: ['Small', 'Large'] },
    { name: 'Cat Food', price: 125, img: 'https://tractorsupply.company/go-cat-food/wp-content/uploads/sites/41/2024/07/About-Go-Cat-Food-8.webp', flavors: ['Chicken', 'Tuna', 'Beef'] },
    { name: 'Cat litter', price: 300, img: 'https://tse1.mm.bing.net/th?id=OIP.RpE2Wqyzsaj5fvNp4c9EowHaHQ&pid=Api&P=0&h=180', liter: ['5L', '10L'] },
];

// Render products
const productList = document.getElementById('product-list');

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    
    let buttonLabel = 'Select Option';
    if (product.flavors) buttonLabel = 'Select Flavor';
    else if (product.toys) buttonLabel = 'Select Toy';
    else if (product.size) buttonLabel = 'Select Size';
    else if (product.flavors) buttonLabel = 'Select Flavors';
    else if (product.liter) buttonLabel = 'Select Liter';



    productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₱${product.price.toFixed(2)}</p>
        <button onclick="showOptions('${product.name}')">${buttonLabel}</button>
    `;
    productList.appendChild(productDiv);
});

// Cart data
let cart = [];
let totalPrice = 0;

function showOptions(productName) {
    const selectedProduct = products.find(product => product.name === productName);
    const optionsDiv = document.getElementById('flavor-options');
    optionsDiv.innerHTML = ''; // Clear previous options

    let options = selectedProduct.flavors || selectedProduct.toys || selectedProduct.size || selectedProduct.liter;
    if (!options) return alert('No options available for this product.');

    options.forEach(option => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = option;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(option));
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement('br'));
    });

    // Show modal
    document.getElementById('flavor-modal').style.display = 'block';
    document.getElementById('confirm-selection').setAttribute('data-product', productName);
}

function closeModal() {
    document.getElementById('flavor-modal').style.display = 'none';
}

function addToCartWithFlavor() {
    const productName = document.getElementById('confirm-selection').getAttribute('data-product');
    const selectedProduct = products.find(product => product.name === productName);
    const selectedOptions = Array.from(document.querySelectorAll('#flavor-options input:checked')).map(input => input.value);

    selectedOptions.forEach(option => {
        cart.push({ name: `${selectedProduct.name} - ${option}`, price: selectedProduct.price });
        totalPrice += selectedProduct.price;
    });

    updateCart();
    closeModal();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - ₱${item.price.toFixed(2)}`;
        
        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
        removeButton.onclick = () => removeFromCart(index);
        
        itemDiv.appendChild(removeButton);
        cartItemsDiv.appendChild(itemDiv);
    });

    // Update total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Simple form submission alert
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for contacting us! We’ll get back to you soon.");
});
