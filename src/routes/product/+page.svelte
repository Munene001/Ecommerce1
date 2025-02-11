<script>
    import Header from "$lib/header.svelte";
    import Fullviewproduct from "../../lib/fullviewproduct.svelte";

    export let data =  { product: null};
</script>
    
  
  {#if data.product}
    <Fullviewproduct product={data.product} />
  {:else}
    <p>Product not found.</p>
  {/if}
  



