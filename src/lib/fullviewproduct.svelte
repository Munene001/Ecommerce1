<script>
    export let product = {
      productname: "",
      price: 0,
      images: [],
      productdescriptions: [],
      productvariants: [],
    };
  
    let { productname, price, images = [], productdescriptions = [], productvariants = [] } = product;
  </script>
  
  <div class="product-container">
    <!-- Product Image Gallery -->
    <div class="image-gallery">
      {#if images.length > 0}
        <img src={images[0].imageurl} alt="Main Product Image" class="main-image" />
        <div class="thumbnails">
          {#each images as img}
            <img src={img.imageurl} alt="Thumbnail" class="thumbnail" />
          {/each}
        </div>
      {:else}
        <p>No images available.</p>
      {/if}
    </div>
  
    <!-- Product Details -->
    <div class="product-details">
      <h1 class="product-name">{productname}</h1>
      <p class="price">KES {price}</p>
  
      <!-- Product Descriptions -->
      <div class="description">
        {#each productdescriptions as description}
          <p>{description}</p>
        {/each}
      </div>
  
      <!-- Product Variants -->
      {#if productvariants.length > 0}
        <div class="variants">
          <h3>Available Variants</h3>
          <ul>
            {#each productvariants as variant}
              <li>{variant}</li>
            {/each}
          </ul>
        </div>
      {/if}
  
      <button class="buy-button">Buy Now</button>
    </div>
  </div>
  
  <style>
    .product-container {
      display: flex;
      gap: 20px;
      padding: 20px;
      max-width: 1000px;
      margin: auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
  
    .image-gallery {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  
    .main-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  
    .thumbnails {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
  
    .thumbnail {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
      cursor: pointer;
      border: 1px solid #ddd;
    }
  
    .product-details {
      flex: 1;
    }
  
    .product-name {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    .price {
      color: #e63946;
      font-size: 1.4rem;
      font-weight: bold;
    }
  
    .description {
      margin-top: 15px;
      font-size: 1rem;
      color: #555;
    }
  
    .variants {
      margin-top: 20px;
    }
  
    .variants ul {
      list-style: none;
      padding: 0;
    }
  
    .variants li {
      background: #f5f5f5;
      padding: 8px;
      margin: 5px 0;
      border-radius: 5px;
    }
  
    .buy-button {
      background: #e63946;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: 5px;
      margin-top: 20px;
    }
  </style>
  