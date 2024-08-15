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

createProductCard();

let cart = [];



function addToCartinArr(index) {
  const { id } = products[index];
  const totalItemsEl = document.querySelectorAll('#total-items')[0];
  const totalPriceEl = document.querySelectorAll('#total-price')[0];

  let matchFound = false;
  let targetIndex;

  cart.forEach((item, ind)=> {
    if(item.id === id) {
      matchFound = true;
      targetIndex = ind;
    }
  });

  if(matchFound) {
    const product = cart[targetIndex];

    product.qty += 1;
    product.subTotal = product.qty * parseFloat(product.price.slice(1));
  }

  else {
    let cloneProduct = { ...products[index]};
    cloneProduct.qty = 1;
    cloneProduct.subTotal = cloneProduct.qty * parseFloat(cloneProduct.price.slice(1));
    cart.push(cloneProduct)
  }
  // console.log(cart);

  let totalItems = 0;
  let totalPrice = 0;
  // for(let key in cart) {
  //   // console.log(cart[key]);
  //   totalItems += cart[key].qty;
  //   totalPrice += cart[key].subTotal;
  // }
  cart.forEach((item)=> {
    totalItems += item.qty;
    totalPrice +=item.subTotal;
  })
  totalItemsEl.innerHTML = totalItems;
  totalPriceEl.innerHTML = totalPrice.toFixed(2);
}


function removeFromCart(index) {
  const { id } = cart[index];
  const totalItemsEl = document.querySelectorAll('#total-items')[0];
  const totalPriceEl = document.querySelectorAll('#total-price')[0];

  let targetIndex = cart.findIndex((item)=>item.id === id);

  if(targetIndex !== -1) {
    const product = cart[targetIndex];

    if(product.qty > 1) {

      product.qty -= 1;
      product.subTotal = product.qty * parseFloat(product.price.slice(1));
    }
    else {
      cart.splice(targetIndex, 1);
    }
  }
  console.log(cart);
  let totalItems = 0;
  let totalPrice = 0;
  cart.forEach((item)=>{
    totalItems += item.qty;
    console.log(item)
    totalPrice += item.subTotal;
    console.log(typeof(totalPrice));
  });

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