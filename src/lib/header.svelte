<script>
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
    let showModal = false;
    let searchQuery = "";
    let categories = [
      "All",
      "Men",
      "Women",
      "Shoes",
      "Bags",
      "Hats",
      "Belts"
      
    ];
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
  
    const links = [
      {
        label: "Home",
        url: "/",
      },
      {
        label: "Shop",
        url: "/shop",
      },
      {
        label: "Men",
        url: "/men",
      },
      {
        label: "Women",
        url: "/women",
      },
      {
        label: "Checkout",
        url: "/checkout",
      },
      {
        label: "About",
        url: "/about",
      },
      {
        label: "Contact",
        url: "/contact",
      },
    ];
    const sidecategories = [
      {
        label: "All",
        url: "/shop",
      },
      {
        label: "Men",
        url: "/men",
      },
      {
        label: "Women",
        url: "/women",
      },
      {
        label: "Shoes",
        url: "/shoes",
      },
      {
        label: "Hats",
        url: "/hats",
      },
      {
        label:"Bags",
        url:"/bags"
      },
      {
        label: "Belts",
        url: "/belts",
      },
      
    ];
  </script>
  
  <div class="shopnow">
    <div class="shopnowtxt">
      DELIVERIES ARRIVE WITHIN 2 TO 3 BUSINESS DAYS! PLACE YOUR ORDER NOW @ <a
        href="/shop"
        style="text-decoration: none; color:white">SHOP</a
      >
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
        <a href="/" aria-label="Go to home"> HOME </a>
      </div>
      <div class="routeitem">
        <a href="/shop" aria-label="Go to shop"> SHOP </a>
      </div>
      <div class="routeitem">
        <a href="/men" aria-label="Go to MEN"> MEN </a>
      </div>
      <div class="routeitem">
        <a href="/women" aria-label="Go to WOMEN"> WOMEN </a>
      </div>
      <div class="routeitem">
        <a href="/checkout" aria-label="Go to checkout"> CHECKOUT </a>
      </div>
      <div class="routeitem">
        <a href="/about" aria-label="Go to about"> ABOUT </a>
      </div>
      <div class="routeitem">
        <a href="/contact" aria-label="Go to contact"> CONTACT </a>
      </div>
    </div>
  </div>
  <div class="mainheadermobile">
    <button class="menu" on:click={(e) => (showModal = true)}
      ><Icon icon="mdi-light:menu" /></button
    >
  
    <div class="head"><h1>Cloyta</h1></div>
    <div class="cartmobile">
      <a href="/checkout" aria-label="Go to checkout">
        <Icon icon="raphael:cart" />
      </a>
    </div>
  </div>
  {#if showModal}
    <div class="pops">
      <div class="popsheader">
        <div class="logo2"><h1>Cloyta</h1></div>
        <button class="close" on:click={(e) => (showModal = false)}
          ><Icon icon="ic:round-close" /></button
        >
      </div>
      <div class="x" style="padding-bottom: 20px; border-bottom: 2px solid rgba(128, 128, 128, 0.2);">
        <div class = "sidemenutitle">Main Menu</div>
        <div>
          {#each links as link}
            <button class="sidemenu" on:click={(e) => {goto(link.url); showModal=false}}
              >{link.label}</button
            >
          {/each}
        </div>
      </div>
      <div class="x" style="padding-bottom: 20px; border-bottom: 2px solid rgba(128, 128, 128, 0.2);">
        <div class = "sidemenutitle">Categories</div>
        <div>
          {#each sidecategories as sidecategory}
            <button class="sidemenu" on:click={(e) => {goto(sidecategory.url); showModal=false}}
              >{sidecategory.label}</button
            >
          {/each}
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    :global(body) {
      margin: 0;
      padding: 0;
    }
    .shopnow {
      height: 38px;
      background-color: #1a4845;
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
      z-index: 20;
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
    .down {
      margin-left: 120px;
    }
    .routeitem {
      margin-left: 60px;
    }
    .routeitem a {
      text-decoration: none;
      color: #000000;
    }
    .mainheadermobile {
      display: none;
    }
    .pops {
      display: none;
    }
    @media (max-width: 768px) {
      .shopnow {
        height: 56px;
        text-align: center;
      }
      .route {
        display: none;
      }
      .mainheader {
        display: none;
      }
      .mainheadermobile {
        height: 56px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid gray;
        justify-content: space-between;
        padding: 0 12px;
        position: relative;
      }
      .menu {
        font-size: 31px;
        border: none;
        outline: none;
        cursor: pointer;
      }
      .cartmobile {
        font-size: 31px;
      }
      .cartmobile a {
        text-decoration: none;
        color: #000000;
      }
      .head {
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
      }
      .pops {
        display: block;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 290px;
        background-color: white;
        z-index: 20;
        border: 2px solid grey;
        font-size: 60px;
        border: none;
        max-height: 100vh;
        overflow-y: auto;
      }
      .popsheader {
        height: 62px;
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 20px;
        border-bottom: 2px solid rgba(128, 128, 128, 0.2);
      }
      .logo2 {
        line-height: 24px;
        font-weight: 400;
        font-size: 16px;
      }
      .close {
        border: none;
        cursor: pointer;
        font-size: 21px;
      }
      .sidemenutitle{
        font-weight: 600;
        line-height: 21px;
        font-size:14px;
        margin-top: 20px;
        padding-left: 20px;
      }
      .sidemenu{
        display: flex;
        flex-direction: column;
        border: none;
        cursor: pointer;
        text-decoration: none;
        background-color: white;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        margin-top: 15px;
        padding-left: 20px;
      }
    }
  </style>
  