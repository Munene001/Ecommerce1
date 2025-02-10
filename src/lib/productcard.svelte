<script>
    export let product = {
      productname: '',
      price: 0,
      description: '',
      stock_quantity: 0,
      productvariants: [],
      productdescriptions: [],
      images: []
    };
  
    // Destructure with default values to avoid errors
    let { productname, price, description, stock_quantity, productvariants = [], productdescriptions = [], images = [] } = product;
  </script>
  
  <div class="product-card">
    <!-- Product Name & Price -->
    <h2 class="product-name">{productname}</h2>
    <p class="price">Price: KES {price}</p>
  
    <!-- Product Description -->
    <p class="description">{description}</p>
  
    {#if productdescriptions.length > 0}
      <p class="short-desc">{productdescriptions[0].short_description}</p>
      <p class="additional-info">Available Sizes: {productdescriptions[0].additional_information}</p>
    {/if}
  
    <!-- Variants Section -->
    <div class="variants">
      <h3>Available Sizes:</h3>
      <ul>
        {#each productvariants as variant}
          <li>{variant.size} - Stock: {variant.stock_quantity}</li>
        {/each}
      </ul>
    </div>
  
    <!-- Image Gallery -->
    <div class="image-gallery">
      {#each images as img}
        <img src={img.imageurl} alt="Product Image" class="product-image" />
      {/each}
    </div>
  </div>
  
  <style>
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      max-width: 400px;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    }
  
    .product-name {
      font-size: 1.4rem;
      font-weight: bold;
    }
  
    .price {
      color: #e63946;
      font-weight: bold;
    }
  
    .variants ul {
      list-style: none;
      padding: 0;
    }
  
    .image-gallery {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
  
    .product-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }
  </style>