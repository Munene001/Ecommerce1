<script>
  import { goto } from "$app/navigation";
  import Icon from "@iconify/svelte";
  let searchQuery = "";
  let categories = ["All", "Men", "Women", "Shoes", "Bags", "Hats", "Belts", "Accesories"];
  let selectedCategory = "Select Category";
  let showDropdown = false;

  function handleSearch() {
    console.log(
      'searching for "${searchQuery]" in category "${selectedCategory}"'
    );
  }
  function toggleDropdown() {
    showDropdown = !showDropdown;
  }
</script>

<div class="shopnow">
  <div class="shopnowtxt">
    DELIVERIES ARRIVE WITHIN 2 TO 3 BUSINESS DAYS! PLACE YOUR ORDER NOW @
  </div>
</div>
<div class="mainheader">
  <div class="logo"><h1>Cloyta</h1></div>
  <div class="middle">
    <div class="search-container">
      <span class="search-icon">
        <Icon icon="iconamoon:search-thin" />
      </span>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search for you favourite product"
        on:input={handleSearch}
      />
      <div class="dropdown">
        <button class="category" on:click={toggleDropdown}
          >{selectedCategory}
          <Icon icon="material-symbols-light:arrow-drop-down" />
        </button>
        {#if showDropdown}
          <div class="dropdown-content">
            {#each categories as category}
              <div>
                <button
                  on:click={() => {
                    selectedCategory = category;
                    showDropdown = false;
                  }}
                >
                  {category}
                </button>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="right">
    <div class="cart">
      <a href="/checkout" aria-label="Go to checkout">
        <Icon icon="raphael:cart" />
      </a>
    </div>

    <div class="wishlist">
      <a href="/wishlist" aria-label="Go to wishlist">
        <Icon icon="tabler:heart" />
      </a>
    </div>

    <div class="account">
      <a href="/account" aria-label="Go to account">
        <Icon icon="bi:person" />
      </a>
    </div>
  </div>
</div>
<div class="route">
  <div class="allcategories">
    <p>All Categories</p>
    <span class="down"><Icon icon="solar:alt-arrow-down-linear" /></span>
  </div>
  <div class="pageroute">
    <div class="routeitem">
      <a href="/" aria-label="Go to home">
        HOME
      </a>
    </div>
    <div class="routeitem">
      <a href="/shop" aria-label="Go to shop">
        SHOP
      </a>
    </div>
    <div class="routeitem">
      <a href="/checkout" aria-label="Go to checkout">
        CHECKOUT
      </a>
    </div>
    <div class="routeitem">
      <a href="/about" aria-label="Go to about">
        ABOUT
      </a>
    </div>
    <div class="routeitem">
      <a href="/contact" aria-label="Go to contact">
        CONTACT
      </a>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  .shopnow {
    height: 38px;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .shopnowtxt {
    color: #ffffff;
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    font-family: Jost, sans-serif;
  }
  .mainheader {
    height: 84px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid grey;
  }
  .mainheader .logo,
  .mainheader .middle,
  .mainheader .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    flex: 0 0 21%;
    background-color: #ffffff;
    font-size: 28px;
  }
  .middle {
    flex: 0 0 56%;
    background-color: #ffffff;
  }
  .right {
    flex: 0 0 23%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
  }
  .right a {
    color: black;
  }
  .search-container {
    display: flex;
    align-items: center;
    height: 46px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }

  input[type="text"] {
    flex: 0 0 72%;
    padding: 0.5rem;
    border: none;
    height: 100%;
    box-sizing: border-box;
    outline: none;
    border-right: 1px solid #ccc;
  }

  .dropdown {
    flex: 0 0 28%;
    position: relative;
    height: 100%;
  }
  .category {
    cursor: pointer;
  }
  .dropdown-content {
    min-width: 160px;
    z-index: 1;
  }
  .search-icon {
    margin-right: 10px;
    font-size: 20px;
    margin-left: 5px;
  }
  .cart {
    font-size: 25px;
    margin-left: 90px;
    line-height: 32px;
    cursor: pointer;
  }
  .wishlist {
    font-size: 27px;
    margin-left: 30px;
    line-height: 32px;
    cursor: pointer;
  }
  .account {
    font-size: 27px;
    margin-left: 30px;
    line-height: 32px;
    cursor: pointer;
  }
  .route {
    height: 56px;
    border-bottom: 1px solid grey;
    display: flex;
    flex-direction: row;
  }
  .route .allcategories,
  .route .pageroute {
    display: flex;
    align-items: center;
  }
  .allcategories {
    flex: 0 0 22%;
    border-right: 1px solid gray;
    font-size: 17px;
    line-height: 25px;
    margin-left: 30px;
  }
  .down{
    margin-left: 120px;
  }
  .routeitem{
    margin-left: 60px;
  }
  .routeitem a{
    text-decoration: none;
    color: #000000;
  }
</style>
