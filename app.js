const products = [
  {
    id: 'a1bbb8cd-fe48-46c3-84f9-420980b638b8',
    Image: 'https://imagedelivery.net/EtcVECyqIuOr1FjP12iTCg/8034ac40-ca43-4d82-f1b0-bfb93c919c00/w=300',
    name: 'Mushroom Cheese',
    price: '$680.00'
  },
  {
    id: '35a3af7d-3ca8-4cd8-92e6-451fb35b7c27',
    Image: 'https://imagedelivery.net/EtcVECyqIuOr1FjP12iTCg/11db62aa-40a8-4777-06db-3eac4c004700/w=300',
    name: 'Monster Clucker',
    price: '$580.00'
  },
  {
    id: '924e3ff7-80bc-43da-a755-25b777ff195e',
    Image: 'https://imagedelivery.net/EtcVECyqIuOr1FjP12iTCg/c5041390-e712-4e31-e6c7-339db30a0200/w=300',
    name: 'Big Boy',
    price: '$780.00'
  }
]

const createProductCard = () => {
  let productListContainer = document.querySelectorAll('.row')[0];
  products.map((product, index)=>{
    let productCard = `
      <div class="col-md-4">
        <div class="card">
            <img src="${product.Image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.price}</p>
                <button onclick="addToCartinArr(${index})" class="btn btn-primary add-to-cart mt-1" data-price="20" data-name="Product 2">Add to Cart</button>
                <button onclick="removeFromCart(${index})"  class="btn btn-danger mt-1">Remove from Cart</button>
            </div>
        </div>
      </div>`;
      productListContainer.innerHTML += productCard;
  })
}

// Call the function to generate product cards on page load
createProductCard();

// Initialize an empty array to store cart items
let cart = [];

// Function to add a product to the cart
function addToCartinArr(index) {
  // Destructure the id from the selected product
  const { id } = products[index];
  
  // Select elements that display total items and total price
  const totalItemsEl = document.querySelectorAll('#total-items')[0];
  const totalPriceEl = document.querySelectorAll('#total-price')[0];

  let matchFound = false; // Flag to check if product is already in the cart
  let targetIndex; // To store the index of the product in the cart

  // Iterate over the cart to check if the product is already added
  cart.forEach((item, ind) => {
    if (item.id === id) {
      matchFound = true;
      targetIndex = ind;
    }
  });

  if (matchFound) {
    // If the product is already in the cart, increase the quantity and update the subtotal
    const product = cart[targetIndex];
    product.qty += 1;
    product.subTotal = product.qty * parseFloat(product.price.slice(1));
  } else {
    // If the product is not in the cart, clone the product object, set initial quantity and subtotal, and add it to the cart
    let cloneProduct = { ...products[index] };
    cloneProduct.qty = 1;
    cloneProduct.subTotal = cloneProduct.qty * parseFloat(cloneProduct.price.slice(1));
    cart.push(cloneProduct)
  }

  let totalItems = 0; // Initialize total items count
  let totalPrice = 0; // Initialize total price
  
  // for(let key in cart) {
    // console.log(cart[key]);
  //   totalItems += cart[key].qty;
  //   totalPrice += cart[key].subTotal;
  // }

  // Iterate over the cart to calculate total items and total price
  cart.forEach((item) => {
    totalItems += item.qty;
    totalPrice += item.subTotal;
  })

  // Update the total items and total price on the UI
  totalItemsEl.innerHTML = totalItems;
  totalPriceEl.innerHTML = totalPrice.toFixed(2);
}

// Function to remove a product from the cart
function removeFromCart(index) {
  // Destructure the id from the selected product in the cart
  const { id } = cart[index];

  // Select elements that display total items and total price
  const totalItemsEl = document.querySelectorAll('#total-items')[0];
  const totalPriceEl = document.querySelectorAll('#total-price')[0];

  // Find the index of the product in the cart using the id
  let targetIndex = cart.findIndex((item) => item.id === id);

  if (targetIndex !== -1) {
    // If product is found in the cart
    const product = cart[targetIndex];

    if (product.qty > 1) {
      // If more than one quantity, decrease the quantity and update the subtotal
      product.qty -= 1;
      product.subTotal = product.qty * parseFloat(product.price.slice(1));
    } else {
      // If only one quantity, remove the product from the cart
      cart.splice(targetIndex, 1);
    }
  }

  let totalItems = 0; // Initialize total items count
  let totalPrice = 0; // Initialize total price

  // Iterate over the cart to calculate total items and total price
  cart.forEach((item) => {
    totalItems += item.qty;
    totalPrice += item.subTotal;
  });

  // Update the total items and total price on the UI
  totalItemsEl.innerHTML = totalItems;
  totalPriceEl.innerHTML = totalPrice.toFixed(2);
}



// let cart = {}

// let addToCartinObj = (index)=> {
//   const { id } = products[index];
//   const totalItemsEl = document.querySelectorAll('#total-items')[0];
//   const totalPriceEl = document.querySelectorAll('#total-price')[0];

//   if(id in cart) {
//     cart[id].qty = cart[id].qty + 1;
//     cart[id].totalItemPrice = parseFloat(cart[id].qty * cart[id].price.slice(1));
//     // totalItemsEl.innerHTML = cart[id].qty;
//     // totalPriceEl.innerHTML = cart[id].totalPrice;
//   }
//   else {
//     cart[id] = {...products[index]};
//     cart[id].qty = 1;
//     cart[id].totalItemPrice = cart[id].qty * parseFloat(cart[id].price.slice(1));
//     // totalItemsEl.innerHTML = cart[id].qty;
//     // totalPriceEl.innerHTML = cart[id].totalPrice;
//   }

//   let totalItems = 0;
//   let totalPrice = 0;
//   for(let key in cart) {
//     totalItems += cart[key].qty;
//     totalPrice += cart[key].totalItemPrice;
//   }
//   totalItemsEl.innerHTML = totalItems;
//   totalPriceEl.innerHTML = totalPrice + ".00";
// }