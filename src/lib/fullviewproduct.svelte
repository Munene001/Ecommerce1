<script>
  export let product = {
      productname: "",
      price: 0,
      
  };
  $: if(product){
    console.log('Product is in fullviewport', product);
  }
</script>
{#if product}
<div class="product-container">
  <!-- Product Image Gallery -->


  <!-- Product Details -->
  <div class="product-details">
      <h1 class="product-name">{product.productname}</h1>
      <p class="price">KES {product.price}</p>

    

      <button class="buy-button">Buy Now</button>
  </div>
</div>
{:else}
<p>No product available</p>
{/if}



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
