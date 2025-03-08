<script>
  import Header from "$lib/header.svelte";
  import Productminiview from "../../lib/productminiview.svelte";
  import Navigationbar from "../../lib/navigationbar.svelte";
  import { onMount } from "svelte";
  import nouislider from "nouislider";
  import "nouislider/dist/nouislider.css";


  export let data;
  let products = data.products || [];
  let totalResults = products.length;
  let shopId = data.shopId || "shop-uuid-1";

  let categories = [];
  let sizes = ["S", "M", "L", "XL", "XXL"];
  let colors = [
    "White", "Red", "Blue", "Black", "Green", "Gray", "Yellow",
    "Pink", "Purple", "NavyBlue", "Cream"
  ];
  let minPrice = 0;
  let maxPrice = 20000;
  let priceMinLimit = 0;
  let priceMaxLimit = 10000;

  let selectedCategories = [];
  let selectedSizes = [];
  let selectedColors = [];

  const colorMap = {
    White: "#FFFFFF",
    Red: "#FF0000",
    Blue: "#0000FF",
    Black: "#000000",
    Green: "#008000",
    Gray: "#808080",
    Yellow: "#FFFF00",
    Pink: "#FFC1CC",
    Purple: "#800080",
    NavyBlue: "#000080",
    Cream: "#FFFDD0"
  };

  onMount(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/categories?shop_id=${shopId}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch categories");
      categories = await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Fallback to hardcoded values
      categories = [
        { category_id: "category-uuid-1", categoryname: "Men" },
        { category_id: "category-uuid-2", categoryname: "Women" },
        { category_id: "category-uuid-3", categoryname: "Shoes" },
        { category_id: "category-uuid-4", categoryname: "Bags" },
        { category_id: "category-uuid-5", categoryname: "Hats" },
        { category_id: "category-uuid-7", categoryname: "Kids" }
      ];
    }
    const slider = document.getElementById("price-slider");
    if(slider){nouislider.create(slider,{
      start: [minPrice, maxPrice],
      connect:true,
      range:{
        min:priceMinLimit,
        max:priceMaxLimit,
      },
      step:50,
      behaviour:"drag",
    });
    slider.noUiSlider.on("update", (values,handle) =>{
      minPrice = Math.round(values[0]);
      maxPrice = Math.round(values[1]);
      
       
    });
  }else{
      console.log("Slider not found");
    }
    
  });
  function applyPriceFilters(){
    applyFilters();
    return;
  }
  

  async function applyFilters() {
    const filterData = {
      categoryUuids: selectedCategories,
      sizes: selectedSizes,
      colors: selectedColors,
      minPrice,
      maxPrice,
    };
    console.log("Filter Data:", filterData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/products/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(filterData),
      });
      if (!response.ok) {
        console.error("Filter request failed:", response.status);
        products = [];
        totalResults = 0;
        return;
      }
      const result = await response.json();
      products = result.products;
      totalResults = result.total;
    } catch (error) {
      console.error("Error applying filters:", error);
      products = [];
      totalResults = 0;
    }

  }
  

  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
  const debounceApplyFilters = debounce(applyFilters, 300);

</script>

<Header />
<div class="shoping">
  <div class="filter">
    <div class="filtergroup">
      <h3>Categories</h3>
      {#each categories as category}
        <label>
          <input
            type="checkbox"
            value={category.category_id}
            bind:group={selectedCategories}
            onchange={applyFilters}
          />
          {category.categoryname}
        </label>
      {/each}
    </div>
    <div class="filtergroup">
      <h3>Price</h3>
      <div class="pricer"><p>price: {minPrice} Ksh - {maxPrice} Ksh</p>
      <button class = "bt" onclick={applyPriceFilters}>Filter Price</button></div>

      <div id="price-slider" class="range-slider"></div>
      
    </div>
    <div class="filtergroup">
      <h3>Colors</h3>
      {#each colors as color}
        <label>
          <input
            type="checkbox"
            value={color}
            bind:group={selectedColors}
            onchange={applyFilters}
            
            
            
          />
          
          
          {color}
        </label>
      {/each}
    </div>
    <div class="filtergroup">
      <h3>Sizes</h3>
      {#each sizes as size}
        <label class="color-checkbox">
          <input
            type="checkbox"
            value={size}
            bind:group={selectedSizes}
            onchange={applyFilters}
          />
          {size}
        </label>
      {/each}
    </div>
  </div>

  {#if products.length > 0}
    <div class="products-container">
      
      {#each products as product (product.product_id)}
        <Productminiview {product} />
      {/each}
    </div>
  {:else}
    <p>No products found.</p>
  {/if}
</div>
<Navigationbar />

<style>
  .shoping {
    display: flex;
    flex-direction: row;
    padding: 20px;
    max-height: 170vh;
    
    
   
  }
  .filter {
    flex: 0 0 20%;
    position: sticky;
  
    
   
  
  }
  .filtergroup {
    margin-bottom: 15px;
  }
  .filtergroup label {
    display: block;
    margin: 5px 0;
  }
  .products-container {
    flex: 0 0 80%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
  }
  .pricer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .bt{
    font-size: 12px;
    height: auto;
    padding:0px 7px;
    margin: 0;
    line-height: 1;
    height: 24px;
    align-self: center;

  }
  
</style>