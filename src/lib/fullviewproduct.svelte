<script>
  import { once } from "lodash-es";
  import Icon from "@iconify/svelte";
  import Recentlyview from "./recentlyview.svelte";
  import Cartadd from "./cartadd.svelte";
  import { onMount, beforeUpdate } from "svelte";
  import { browser } from "$app/environment";

  export let product = {
    productname: "",
    description: "",
    price: 0,
    status: "",
    discountprice: 0,
    images: [],
    productdescriptions: [],
    productsizes: [],
    product_id: "",
  };

  let {
    images = [],
    productname,
    description,
    price,
    discountprice,
    status,
    productdescriptions,
    productsizes,
    product_id
  } = product;

  let currentIndex = 0;
  let activeTab = "desc";
  let selectedSizeId = null;
  let cartQuantity = 0;
  let showPopup = false;
  let cart = [];

  // Safe cart access
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (e) {
      console.error("Error loading cart:", e);
      return [];
    }
  }

  // Sync cart state for current product
  function syncCartState() {
    cart = getCart();
    if (productsizes.length === 1 && !selectedSizeId) {
      selectSize(productsizes[0].size_id);
    } else if (selectedSizeId) {
      const item = cart.find((i) => i.product_id === product_id && i.size_id === selectedSizeId);
      cartQuantity = item ? item.quantity : 0;
    } else {
      cartQuantity = 0;
    }
  }

  $: if (product) {
    syncCartState();
    console.log("Product is in fullviewport", product);
  }

  onMount(() => {
    if (browser) {
      syncCartState();
    }
  });

  beforeUpdate(() => {
    if (product && product.product_id !== product_id) {
      syncCartState();
    }
  });

  function selectImage(index) {
    currentIndex = index;
  }

  function handleTouch(event) {
    if (event.touches.length > 1) return;
    const startX = event.touches[0].clientX;
    event.target.addEventListener(
      "touchend",
      (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (diff > 50 && currentIndex < images.length - 1) currentIndex++;
        if (diff < -50 && currentIndex > 0) currentIndex--;
      },
      { once: true }
    );
  }

  function selectSize(sizeId) {
    if (!product_id) return;
    selectedSizeId = sizeId;
    const item = cart.find((i) => i.product_id === product_id && i.size_id === sizeId);
    cartQuantity = item ? item.quantity : 0;
  }

  function addToCart() {
    if (!browser) return; // Only run on client
    try {
      if (!product_id) {
        console.error("No product ID available");
        return;
      }
      if (productsizes.length > 1 && !selectedSizeId) {
        alert("Please select a size");
        return;
      }
      const sizeIdToAdd = productsizes.length === 1 ? productsizes[0].size_id : selectedSizeId;
      if (!sizeIdToAdd) return;

      const sizeObj = productsizes.find((s) => s.size_id === sizeIdToAdd);
      const existingItemIndex = cart.findIndex(
        (item) => item.product_id === product_id && item.size_id === sizeIdToAdd
      );
      const currentQty = existingItemIndex === -1 ? 0 : cart[existingItemIndex].quantity;

      if (currentQty >= sizeObj.stock_quantity) {
        alert(`Only ${sizeObj.stock_quantity} ${sizeObj.size} available`);
        return;
      }

      if (existingItemIndex === -1) {
        cart.push({ product_id, size_id: sizeIdToAdd, quantity: 1 });
        cartQuantity = 1;
      } else {
        cart[existingItemIndex].quantity++;
        cartQuantity++;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      showPopup = true;
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error in addToCart:", error);
    }
  }

  function incrementQuantity() {
    addToCart(); // Reuse addToCart logic
  }

  function decrementQuantity() {
    if (!browser) return; // Only run on client
    try {
      if (!product_id) return;
      if (productsizes.length > 1 && !selectedSizeId) {
        alert("Please select a size");
        return;
      }
      const sizeIdToAdd = productsizes.length === 1 ? productsizes[0].size_id : selectedSizeId;
      if (!sizeIdToAdd || cartQuantity <= 0) return;

      const existingItemIndex = cart.findIndex(
        (item) => item.product_id === product_id && item.size_id === sizeIdToAdd
      );

      if (existingItemIndex !== -1 && cart[existingItemIndex].quantity > 0) {
        cart[existingItemIndex].quantity--;
        cartQuantity--;
        if (cart[existingItemIndex].quantity === 0) {
          cart.splice(existingItemIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.error("Error in decrementQuantity:", error);
    }
  }
</script>

{#if product && product.product_id}
  <div class="product-container">
    <div class="pronto">
      <div class="image">
        <div class="main-image" on:touchstart={handleTouch}>
          <img
            src={images[currentIndex]?.imageurl || "fallback-image.jpg"}
            alt="Product view {currentIndex + 1}"
            loading="lazy"
            draggable="false"
          />
        </div>
        <div class="thumbnails">
          {#each images as image, index}
            <button
              class:active={index === currentIndex}
              on:click={() => selectImage(index)}
              aria-label="show image{index + 1}"
              aria-current={index === currentIndex}
            >
              <img
                src={image.imageurl || "fallback-image.jpg"}
                alt=""
                role="presentation"
                loading="lazy"
                draggable="false"
              />
            </button>
          {/each}
        </div>
      </div>
    </div>
    <div class="action">
      <div class="productname">{productname}</div>
      <div class="pricer">
        {#if discountprice}
          <div class="price">{price}</div>
          <div class="discount">{discountprice}</div>
        {:else}
          <div class="price-lone">{price}</div>
        {/if}
      </div>
      <div class="description">{description}</div>
      <div class="status">{status}</div>
      <div class="sizer">
        <p class="titler">Size guide (pick a size)</p>
        <div class="spec">
          {#each productsizes as size}
            <button
              class="size"
              class:active={selectedSizeId === size.size_id}
              on:click={() => selectSize(size.size_id)}
            >
              {size.size} ({size.stock_quantity} left)
            </button>
          {/each}
        </div>
      </div>
      <div class="check">
        <div class="arithmetic">
          <span on:click={decrementQuantity} role>-</span>
          <span>{cartQuantity}</span>
          <span on:click={incrementQuantity} role>+</span>
        </div>
        <button class="incart" on:click={addToCart}>Add to Cart</button>
      </div>
      {#if showPopup}
        <div class="cart-popup">
          Item added to cart! ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
        </div>
      {/if}
      <div class="xtra">
        <button class="extra">
          <span><Icon icon="ph:heart-thin" /></span>Add to wishlist
        </button>
        <button class="extra">
          <span><Icon icon="material-symbols-light:share-outline" /></span>Share Product
        </button>
      </div>
    </div>
    <div class="farleft"><Recentlyview currentProduct={product} /></div>
  </div>
{:else}
  <p>No product available</p>
{/if}

<div class="desc-review">
  <div class="btn-section">
    <button class="desc-reviewbtn" class:active={activeTab === "desc"} on:click={() => (activeTab = "desc")}>
      Full Description
    </button>
    <button class="desc-reviewbtn" class:active={activeTab === "additional_information"} on:click={() => (activeTab = "additional_information")}>
      Additional Information
    </button>
    <button class="desc-reviewbtn" class:active={activeTab === "reviews"} on:click={() => (activeTab = "reviews")}>
      Reviews
    </button>
  </div>
  <div class="desc-reviewctn">
    {#if activeTab === "desc"}
      <div>{productdescriptions[0]?.short_description || "No description available"}</div>
    {:else if activeTab === "additional_information"}
      <div>{productdescriptions[0]?.additional_information || "No additional info"}</div>
    {:else}
      <div>Product review</div>
    {/if}
  </div>
</div>
<Cartadd />

<style>
  .product-container {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
  }
  .pronto {
    flex: 0 0 43%;
  }
  .image {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .main-image {
    width: 100%;
    height: 600px;
    object-fit: scale-down;
  }
  .main-image img {
    width: 100%;
    height: 100%;
    border: 1px solid gray;
  }
  .thumbnails {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }
  .thumbnails button {
    height: 77px;
    width: 77px;
    padding: 0;
    border: none;
    background-color: transparent;
    box-sizing: border-box;
  }

  .thumbnails button img {
    height: 77px;
    width: 77px;
    object-fit: cover;
  }
  .action {
    flex: 0 0 42%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 20px 30px;
    box-sizing: border-box;
  }
  .pricer {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .price {
    text-decoration: line-through;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
  }
  .price-lone {
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
  }
  .discount {
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
  }
  .productname {
    font-size: 28px;
    font-weight: 400;
    line-height: 33.6px;
  }
  .description {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
  .status {
    display: inline-block;
    width: fit-content;
    padding: 2px 8px;
    background-color: #f1fbef;
    color: #52bd9d;
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    white-space: nowrap;
  }
  .check {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
  .arithmetic {
    display: inline-flex;
    width: fit-content;
    padding: 15px 15px;
    gap: 45px;
    align-items: center;
    border: 1px solid black;
  }
  .incart {
    background-color: black;
    color: white;
    padding: 15px 99px;
    font-size: 14px;
  }
  .xtra {
    display: flex;
    flex-direction: row;
    gap: 10px;
    border-bottom: 1px solid lightgray;
    padding-bottom: 40px;
  }
  .extra {
    display: flex;

    align-items: center;
    background-color: transparent;
    border: none;
  }
  .desc-review {
    padding: 30px 20px;
    box-sizing: border-box;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .desc-reviewbtn {
    border: none;
    background-color: transparent;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    color: rgb(136, 134, 134);
  }
  .desc-reviewctn {
    font-weight: 400;
    line-height: 24px;
    color: rgb(0, 0, 0);
  }
  .desc-reviewbtn.active {
    color: black;
  }
  .btn-section {
    border-bottom: 1px solid lightgray;
    padding-bottom: 4px;
    display: flex;
    gap: 15px;
  }
  .farleft {
    flex: 0 0 15%;
  }
  .sizer {
    display: flex;
    flex-direction: column;
  }
  .size {
    border: 1px solid black;
    padding: 10px 25px;
  }
  .titler {
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
  }
  .spec {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  @media (max-width: 768px) {
    .product-container {
      display: flex;
      flex-direction: column;
      padding: 10px 10px;
      box-sizing: border-box;
    }
    .pronto {
      flex: 0 0 100%;
    }
    .action {
      flex: 0 0 100%;
      padding: 20px 0px;
      gap: 10px;
    }
    .farleft {
      flex: 0 0 100%;
    }
    .check {
      display: none;
    }
    .thumbnails button {
      height: 58px;
      width: 58px;

      box-sizing: border-box;
    }

    .thumbnails button img {
      height: 58px;
      width: 58px;
    }
    .main-image {
      width: 100%;
      height: auto;
      max-height: 500px;
      object-fit: scale-down;
    }
    .main-image img {
      width: 100%;
      height: auto;
      max-height: 600px;
      border: 1px solid gray;
    }
    .desc-reviewbtn {
      border: none;
      background-color: transparent;
      font-size: 17px;
      font-weight: 500;
      line-height: 25px;
      color: rgb(136, 134, 134);
    }
  }
</style>