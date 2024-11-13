// Sample product data, now including image URLs
const products = [
    { id: 1, name: 'Camiseta Masculina com Gola Lapela', price: 79.90, imageUrl: 'https://img.kwcdn.com/product/fancy/d573ae5f-28ae-4f4a-9fb2-510df9831e94.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 2, name: 'Calça Jeans Feminina Elegante,', price: 129.90, imageUrl: 'https://img.kwcdn.com/product/fancy/68e3c0d7-26c7-4ea7-9065-86cdc50732ed.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 3, name: 'Vestido colorido com decote profundo', price: 159.90, imageUrl: 'https://img.kwcdn.com/product/fancy/2897a9f6-2882-46f9-a7cc-ab484415d641.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 4, name: 'Saia Estampada Boho Com Fenda', price: 69.90, imageUrl: 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/52d2c18e0e59a546dffa97951f7af27a.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 5, name: 'Jaqueta de couro sintético com zíper bordado', price: 254.90, imageUrl: 'https://img.kwcdn.com/product/fancy/526b6482-48e4-498d-9777-be5fc69fa452.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 6, name: 'Camiseta Masculina com Arte de Carimbo Retro', price: 59.90, imageUrl: 'https://img.kwcdn.com/product/fancy/7a6467a1-d607-4bd4-93ca-049518cae270.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 7, name: 'Blusa de viscose de manga longa com gola alta', price: 89.90, imageUrl: 'https://img.kwcdn.com/product/fancy/6b5c68c1-af7e-41d2-86ac-aafa9dcb886b.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 8, name: 'Short Jeans Com Barra Dobrada', price: 104.90, imageUrl: 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/a896a5804ae4b1b24e838a02cfd21567.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 9, name: 'Bolsa de ombro em couro legítimo para homens', price: 137.90, imageUrl: 'https://img.kwcdn.com/product/fancy/ed1a500d-746a-4ceb-bde9-65579f4a2943.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 10, name: 'Relógio de Quartzo MINI FOCUS Sport para Homens', price: 169.90, imageUrl: 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/6e2a2f64393fee51b1873dd1e750dcb7.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 11, name: 'Óculos de sol polarizados', price: 189.90, imageUrl: 'https://img.kwcdn.com/product/fancy/f54591ef-e967-4273-a2b3-c13481894ed4.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 12, name: 'Cachecol de Lã Australiana Premium', price: 236.90, imageUrl: 'https://img.kwcdn.com/product/open/2024-09-17/1726573642860-b8c1ebf8bf8d412ba01af32006c48549-goods.jpeg?imageView2/2/w/800/q/70/format/webp' },
    { id: 13, name: 'Boné de beisebol casual ajustável', price: 109.90, imageUrl: 'https://images.tcdn.com.br/img/img_prod/311840/bone_new_era_mlb_new_york_yankees_920_azul_81510_1_20201130181123.jpg' },
    { id: 14, name: 'Sandálias elegantes de tecido para mulheres', price: 129.90, imageUrl: 'https://img.kwcdn.com/product/fancy/6a37a59c-4a10-4d4f-8977-883096dead91.jpg?imageView2/2/w/800/q/70/format/webp' },
    { id: 15, name: 'Calça Legging Cintura Alta Empina Bumbum Yoga Academia', price: 119.90, imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_658627-MLB75833001672_042024-O.webp' },
    { id: 16, name: 'Tênis de Basquete Masculino Under Armour Dagger', price: 259.90, imageUrl: 'https://underarmourbr.vtexassets.com/arquivos/ids/276017-800-auto?v=638065489119800000&width=800&height=auto&aspect=true' }
];

// Global cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render the product list
function renderProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

    filteredProducts.forEach(product => {
        const productHTML = `
            <article class="produto" data-id="${product.id}">
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Preço: R$ ${product.price.toFixed(2)}</p>
                <button type="button" class="btn btn-primary" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add To Cart</button>
            </article>
        `;
        productList.innerHTML += productHTML;
    });
}

// Function to handle the sorting of products
function sortProducts() {
    const sortBy = document.getElementById('filter').value;

    let sortedProducts = [...products]; // Clone the products array to avoid modifying the original array

    switch (sortBy) {
        case 'alphabetical-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'alphabetical-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }

    // Render the sorted products
    renderProducts(sortedProducts);
}

// Function to add products to the cart
function addToCart(id, name, price) {
    const product = { id, name, price, quantity: 1 };

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${name} added to the cart!`);
    renderCart(); // Re-render the cart
}

// Function to clear the cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Re-render the empty cart
    alert("Your cart has been cleared.");
  }

// Function to render the cart in the modal
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalContainer.innerHTML = '';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => {
            return `
                <div>
                    <p>${item.name} x${item.quantity} - R$ ${item.price.toFixed(2)}</p>
                </div>
            `;
        }).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalContainer.innerHTML = `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
    }
}

// Function to clear the cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Re-render the empty cart
}

// Function to toggle the display of the cart (Pop-up modal)
function toggleCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Initialize the product list rendering
renderProducts(products); // Initially render products in the default order

// Event listener for filter changes (sorting)
document.getElementById('filter').addEventListener('change', sortProducts);
