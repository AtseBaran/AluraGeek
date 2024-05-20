import { servicesProducts } from "../service/product-service.js";  

const productContainer = document.querySelector('[data-product]');
const form = document.querySelector('[data-form]');

function addDeleteButtons() {
    let deleteButton = document.querySelectorAll(".delete-button");
    deleteButton.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log(event);
            const id = event.target.getAttribute('data-id');
            console.log(id);
            servicesProducts.deleteProduct(id)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        });
    });
}

function createCard(name, price, image, id){
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}">
        </div>
        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--value">
                <p>$ ${price}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="./assets/trash.png" alt="Eliminar" data-id="${id}">
                </button>
            </div>
        </div>
    `;
    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(product.name, product.price, product.image, product.id)
            )
        });
        addDeleteButtons();
    } catch (error) {  
        console.log(error);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('[data-name]').value;
    const price = document.querySelector('[data-price]').value;
    const image = document.querySelector('[data-image]').value;

    servicesProducts.createProduct(name, price, image)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
});

render();