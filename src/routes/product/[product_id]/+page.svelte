
<script>
    import Header from "$lib/header.svelte";
    import Fullviewproduct from "../../../lib/fullviewproduct.svelte";
    import Recentlyview from "../../../lib/recentlyview.svelte";
    import Prefooter from "$lib/prefooter.svelte";
    import Footer from "$lib/footer.svelte";

    
    

    export let data;
    let product = data.product;

    $: if (product){
      console.log("Product received:", product);
    }
</script>
<Header key={product?.id}/>
    
  
  {#if product}
    <Fullviewproduct {product}/>
    
  {:else if product === null}
    <p>Product not found.</p>
    {:else}
    <p>Loading product</p>
  {/if}
  <Prefooter/>
  <Footer/>
  



