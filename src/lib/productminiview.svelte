<script>
  import {goto} from "$app/navigation";

  function openProductPage(){
    if(!product.product_id){
      console.error('Product id is missing');
      return;
    }
  goto(`/product/${product.product_id}`);
}
  export let product = {
    
    productname: "",
    price: 0,
    images: [],
  };

  // Destructure with default values to avoid errors
  let { productname, price, images = [] } = product;
</script>

<div class="product-card" onclick={openProductPage} onkeydown="{(e) => (e.key === 'Enter' || e.key === '') && openProductPage()}" role="button" 
  tabindex="0">
  <!-- Product Name & Price -->
  <h2 class="product-name">{productname}</h2>
  <p class="price">Price: KES {price}</p>

  <div class="image-gallery">
    {#each images as img}
      <img src={img.imageurl} alt={productname} class="product-image" />
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
