<script>
  import Header from "$lib/header.svelte";
  import Productminiview from "../../lib/productminiview.svelte";
  import Navigationbar from "../../lib/navigationbar.svelte";
  import { onMount } from "svelte";

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

  let selectedCategories = [];
  let selectedSizes = [];
  let selectedColors = [];

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
  });

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

  function updatePrice(event, type) {
    if (type === "min") minPrice = +event.target.value;
    if (type === "max") maxPrice = +event.target.value;
    debounceApplyFilters();
  }
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
      <input
        type="range"
        min="0"
        max="20000"
        value={minPrice}
        oninput={(e) => updatePrice(e, 'min')}
      />
      <input
        type="range"
        min="0"
        max="20000"
        value={maxPrice}
        oninput={(e) => updatePrice(e, 'max')}
      />
      <p>{minPrice} - {maxPrice} KSH</p>
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
        <label>
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
  }
  .filter {
    flex: 0 0 30%;
  }
  .filtergroup {
    margin-bottom: 15px;
  }
  .filtergroup label {
    display: block;
    margin: 5px 0;
  }
  .products-container {
    flex: 0 0 70%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>