const productsContainer = document.querySelector(".products");
const categoryList = document.querySelector(".category-list");
const typeList = document.querySelector(".type-list");
const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector(".priceValue");
const txtSearch = document.querySelector("#txtSearch");

// Fetch product data from JSON file
async function fetchProducts() {
  const response = await fetch("/Asset/js/product.json");
  const data = await response.json();
  initialize(data);
}

function initialize(data) {
  displayProducts(data);
  setCategories(data);
  setTypes(data);
  setupSearch(data);
}

// Display products
function displayProducts(products) {
  if (products.length > 0) {
    const productDetails = products
      .map(
        (product) => `
      <div class="product" data-id="${product.id}">
      <div class="small-logo">
          <img src="/Asset/images/nrt-pro.png" alt="Logo" class="logo-img" />
        </div>
        <div class="img">
          <img src="${product.img}" alt="${product.name}" />
        </div>
        <div class="product-details">
          <span class="name">${product.name}</span>
          <span class="seller">${product.type}</span>
        </div>
      </div>`
      )
      .join("");

    productsContainer.innerHTML = productDetails;

    // Add click event to each product
    document.querySelectorAll(".product").forEach((productElement) => {
      productElement.addEventListener("click", () => {
        const productId = productElement.getAttribute("data-id");
        localStorage.setItem("selectedProductId", productId);
        window.location.href = "details.html";
      });
    });
  } else {
    productsContainer.innerHTML = "<h3>No Products Available</h3>";
  }
}


// Set categories with checkboxes
function setCategories(data) {
  const allCategories = data.map((product) => product.catagory);
  const categories = [...new Set(allCategories)];

  categoryList.innerHTML = categories
    .map(
      (cat) =>
        `<li>
          <label>
            <input type="checkbox" class="category-filter" value="${cat}">
            ${cat}
          </label>
        </li>`
    )
    .join("");

  const categorysidebar = document.querySelectorAll(".category-filter");
  categorysidebar.forEach((checkbox) =>
    checkbox.addEventListener("change", () => filterProducts(data))
  );
}

// Set product types with checkboxes
function setTypes(data) {
  const allTypes = data.map((product) => product.type);
  const types = [...new Set(allTypes)];

  typeList.innerHTML = types
    .map(
      (type) =>
        `<li>
          <label>
            <input type="checkbox" class="type-filter" value="${type}">
            ${type}
          </label>
        </li>`
    )
    .join("");

  const typesidebar = document.querySelectorAll(".type-filter");
  typesidebar.forEach((checkbox) =>
    checkbox.addEventListener("change", () => filterProducts(data))
  );
}

// Filter products based on selected categories and types
function filterProducts(data) {
  const selectedCategories = Array.from(
    document.querySelectorAll(".category-filter:checked")
  ).map((checkbox) => checkbox.value);

  const selectedTypes = Array.from(
    document.querySelectorAll(".type-filter:checked")
  ).map((checkbox) => checkbox.value);

  const filteredProducts = data.filter(
    (product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.catagory)) &&
      (selectedTypes.length === 0 || selectedTypes.includes(product.type))
  );

  displayProducts(filteredProducts);
}



function filterProductsByPrice(data, maxPrice) {
  const selectedCategories = Array.from(
    document.querySelectorAll(".category-filter:checked")
  ).map((checkbox) => checkbox.value);

  const selectedTypes = Array.from(
    document.querySelectorAll(".type-filter:checked")
  ).map((checkbox) => checkbox.value);

  const filteredProducts = data.filter(
    (product) =>
      product.amt <= maxPrice &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.catagory)) &&
      (selectedTypes.length === 0 || selectedTypes.includes(product.type))
  );

  displayProducts(filteredProducts);
}

// Setup search functionality
function setupSearch(data) {
  txtSearch.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase().trim();
    const filteredProducts = data.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    displayProducts(filteredProducts);
  });
}

// Fetch data and initialize
fetchProducts();


const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  hamburger.classList.toggle("toggle");
});




document.querySelectorAll('.filter').forEach(filter => {
  filter.addEventListener('change', function () {
    let products = document.querySelectorAll('.product-card');
    products.forEach(product => {
      let show = true;
      document.querySelectorAll('.filter:checked').forEach(checked => {
        if (product.dataset[checked.dataset.filter] !== checked.value) {
          show = false;
        }
      });
      product.style.display = show ? 'block' : 'none';
    });
  });
});



function togglesidebar() {
  var sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');

  document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

// Close sidebar when clicking outside (for mobile)
document.addEventListener('click', function (event) {
  var sidebar = document.querySelector('.sidebar');
  var filterButton = document.querySelector('.filters-toggle');

  // If clicked outside the sidebar & filter button, close the sidebar
  if (!sidebar.contains(event.target) && !filterButton.contains(event.target)) {
    sidebar.classList.remove('open');
    document.body.style.overflow = '';
  }
});




// Get the search query from the URL
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("search");
const products = [];

async function initializeProducts() {
  try {
    const response = await fetch("/Asset/js/product.json");
    const data = await response.json();
    products.push(...data);

    if (searchQuery) {
      const filteredProducts = products.filter(product =>
        product.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      displayProducts(filteredProducts);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

initializeProducts();