document.addEventListener("DOMContentLoaded", async () => {
  const productId = localStorage.getItem("selectedProductId");

  if (!productId) {
    document.body.innerHTML = "<h3>No Product Selected</h3>";
    return;
  }

  try {
    // Fetch all products
    const response = await fetch("/Asset/js/product.json");
    const products = await response.json();

    // Find the selected product
    const selectedProduct = products.find(
      (product) => product.id === parseInt(productId)
    );

    if (!selectedProduct) {
      document.body.innerHTML = "<h3>Product Not Found</h3>";
      return;
    }

    // Populate the product details
    document.getElementById("productImage").style.backgroundImage = `url(${selectedProduct.img})`;
    document.getElementById("productName").textContent = selectedProduct.name;
    document.getElementById("productPrice").textContent = `Price: Rs.${selectedProduct.amt}`;
    document.getElementById("productCategory").textContent = `Category: ${selectedProduct.catagory}`;
    document.getElementById("productType").textContent = `Type: ${selectedProduct.type}`;
    document.getElementById("productDescription").textContent = `Description: ${selectedProduct.description}`;
  } catch (error) {
    console.error("Error loading product details:", error);
    document.body.innerHTML = "<h3>Error Loading Product Details</h3>";
  }
});

