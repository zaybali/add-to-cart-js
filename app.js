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
  products.map((product)=>{
    console.log(product)
    let productCard = `
      <div class="col-md-4">
        <div class="card">
            <img src="${product.Image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.price}</p>
                <button class="btn btn-primary add-to-cart" data-price="20" data-name="Product 2">Add to Cart</button>
            </div>
        </div>
      </div>`;
      productListContainer.innerHTML += productCard;
  })
}

createProductCard();