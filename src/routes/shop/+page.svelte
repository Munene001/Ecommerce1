<script>
    import Header from "$lib/header.svelte";
    import Productminiview from "../../lib/productminiview.svelte";
    import Navigationbar from "../../lib/navigationbar.svelte";
  
  
    // Ensure data.products is always defined
    export let data;
  
    // Ensure products is always an array
    let products = data.products || [];
  </script>
  
  <Header />
  
  {#if products.length > 0}
    <div class="products-container">
      {#each products as product}
        <Productminiview {product} />
      {/each}
    </div>
  {:else}
    <p>No products found.</p>
  {/if}
  <Navigationbar/>
  
  <style>
    .products-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  </style>