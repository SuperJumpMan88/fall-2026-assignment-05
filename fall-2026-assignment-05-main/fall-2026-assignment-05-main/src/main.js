import products from "./data/products.json";

const productGrid = document.querySelector("#product-grid");
const previousButton = document.querySelector("#prev-btn");
const nextButton = document.querySelector("#next-btn");
const pageIndicator = document.querySelector("#page-indicator");

const productsPerPage = 5;
let currentPage = 1;

const totalPages = Math.ceil(products.length / productsPerPage);

function renderProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const visibleProducts = products.slice(startIndex, endIndex);

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <img
            class="product-image"
            src="${product.imageUrl}"
            alt="${product.name}"
          />

          <div class="product-info">
            <span class="product-category">${product.category}</span>

            <h3>${product.name}</h3>

            <p class="product-price">
              $${product.price.toFixed(2)}
            </p>

            <p class="product-description">
              ${product.description}
            </p>
          </div>
        </article>
      `,
    )
    .join("");

  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

previousButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderProducts();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage += 1;
    renderProducts();
  }
});

renderProducts();
