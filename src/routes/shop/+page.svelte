<script>
  import Header from "$lib/header.svelte";
  import Productminiview from "../../lib/productminiview.svelte";
  import Navigationbar from "../../lib/navigationbar.svelte";
  import { onMount } from "svelte";
  import nouislider from "nouislider";
  import "nouislider/dist/nouislider.css";
  import "iconify-icon";
  import Preefooter from "$lib/prefooter.svelte";
  import Footer from "$lib/footer.svelte";
  
  

  export let data;
  let products = data.products || [];
  let totalResults = products.length;
  let shopId = data.shopId || "shop-uuid-1";

  let categories = [];
  let sizes = ["S", "M", "L", "XL", "XXL"];
  let colors = [
    "White",
    "Red",
    "Blue",
    "Black",
    "Green",
    "Gray",
    "Yellow",
    "Pink",
    "Purple",
    "NavyBlue",
    "Cream",
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
    Cream: "#FFFDD0",
  };

  onMount(async () => {
    
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/products/categories?shop_id=${shopId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
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
        { category_id: "category-uuid-7", categoryname: "Kids" },
      ];
    }
    const slider = document.getElementById("price-slider");
    if (slider) {
      nouislider.create(slider, {
        start: [minPrice, maxPrice],
        connect: true,
        range: {
          min: priceMinLimit,
          max: priceMaxLimit,
        },
        step: 50,
        behaviour: "drag",
      });
      slider.noUiSlider.on("update", (values, handle) => {
        minPrice = Math.round(values[0]);
        maxPrice = Math.round(values[1]);
      });
    } else {
      console.log("Slider not found");
    }
  });
  function applyPriceFilters() {
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
      const response = await fetch(
        "http://127.0.0.1:8000/api/products/filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(filterData),
        }
      );
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
      <div class="pricer">
        <p>price: {minPrice} Ksh - {maxPrice} Ksh</p>
        <button class="bt" onclick={applyPriceFilters}>Filter Price</button>
      </div>

      <div id="price-slider" class="range-slider"></div>
    </div>
    <div class="filtergroup" id="color">
      <h3>Colors</h3>
      {#each colors as color}
        <label
          class="color-swatch"
          style="background-color: {colorMap[color]};"
        >
          <input
            type="checkbox"
            value={color}
            bind:group={selectedColors}
            onchange={applyFilters}
          />
          <div class="check">
            <span
              class="checkmark
              {color === 'Cream' || color === 'White' ? 'black-icon' : ''}"
            >
              <b
                ><iconify-icon icon="material-symbols-light:check"
                ></iconify-icon></b
              >
            </span>
            <span class="color-name">{color}</span>
          </div>
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
<Preefooter/>
<Footer/>

<style>
  .shoping {
    display: flex;
    flex-direction: row;
    padding: 10px;
    box-sizing: border-box;
   
  }
  .filter {
    flex: 0 0 22%;
    position: sticky;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
  }
  .filtergroup {
    display: flex;
    flex-direction: column;
   
  }
  .filtergroup label {
    display: block;
    margin: 5px 0;
  }
  .products-container {
    flex: 0 0 78%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    
    max-height: 976px;
    overflow-y: auto;
    box-sizing: border-box;
    scroll-behavior: smooth;
    
    
  
  }
 
  

/* Webkit browsers (Chrome, Safari, Edge) */
.products-container::-webkit-scrollbar {
  width: 13px;
}
  
.pricer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-top: -15px;
  }
  .bt {
    font-size: 12px;
    height: auto;
    padding: 0px 7px;
    margin: 0;
    line-height: 1;
    height: 24px;
    align-self: center;
  }
  #price-slider {
    height: 5px;
  }
  .range-slider {
    margin: 0px 10px;
    background-color: #ee403d;
  }
  :global(#price-slider .noUi-connect) {
    background: #ee403d;

    /* Red color */
  }
  :global(#price-slider .noUi-base) {
    height: 3px;
    background: #d3d3d3;
    display: flex;
    align-self: center;
  }
  :global(#price-slider .noUi-handle) {
    border-radius: 50%;
    border-color: #ee403d;
    background: #ee403d;
    cursor: pointer;
    top: -13px !important;
  }
  :global(#price-slider .noUi-handle:before),
  :global(#price-slider .noUi-handle:after) {
    display: none;
  }
  #color {
    padding-top: 8px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .color-swatch input[type="checkbox"] {
    opacity: 0;
    position: absolute;
  }

  .color-swatch {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 5px;
    cursor: pointer;
    position: relative;
    border: 2px solid transparent;
    transition: border-color 0.2s ease;
    align-items: center;
  }

  .color-swatch .checkmark {
    display: none;
  }
  .check {
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 10px;
  }

  .color-name {
    padding-left: 25px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
  .color-swatch input[type="checkbox"]:checked ~ .check .checkmark {
    display: block;
  }
  .color-swatch .checkmark {
    display: none;
  }

  .color-swatch input[type="checkbox"]:checked ~ .check .checkmark {
    display: block;
  }
  iconify-icon {
    align-self: center;
    justify-self: center;
  }
  @media (max-width:768px){
    .shoping{
      padding: 0 8px;
    }
    .filter{
      display: none;
    }
    .products-container{
      flex: 0 0 100%;
      display: grid;
      max-width: 100%;
      grid-template-columns: repeat(2,1fr);
      gap: 2px;
      
    }
  }

  /* Set the icon color to black for Cream and White */
</style>
