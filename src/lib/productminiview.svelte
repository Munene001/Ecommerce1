<script>
  import {goto} from "$app/navigation";

  function openProductPage(){
    goto("/product/${product.id}");
  }
  export let product = {
    id:"",
    productname: "",
    price: 0,
    images: [],
  };

  // Destructure with default values to avoid errors
  let { productname, price, images = [] } = product;
</script>

<div class="product-card" onclick={openProductPage}>
  <!-- Product Name & Price -->
  <h2 class="product-name">{productname}</h2>
  <p class="price">Price: KES {price}</p>

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
