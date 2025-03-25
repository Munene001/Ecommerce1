<script>
  import { once } from "lodash-es";
  import Icon from "@iconify/svelte";

  export let product = {
    productname: "",
    description: "",
    price: 0,
    status: "",
    discountprice: 0,
    images: [],
    productdescriptions: [],
  };
  let {
    images = [],
    productname,
    description,
    price,
    discountprice,
    status,
    productdescriptions,
  } = product;
  let currentIndex = 0;
  let touchStartx = 0;

  function selectImage(index) {
    currentIndex = index;
  }
  function handleTouch(event) {
    if (event.touches.lenght > 1) return;
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

  $: if (product) {
    console.log("Product is in fullviewport", product);
  }
  let activeTab = "desc";
</script>

{#if product}
  <div class="product-container">
    <div class="pronto">
      <div class="image">
        <div class="main-image" ontouchstart={handleTouch}>
          <img
            src={images[currentIndex]?.imageurl}
            alt="Product view {currentIndex + 1}"
            loading="lazy"
            draggable="false"
          />
        </div>
        <div class="thumbnails">
          {#each images as image, index}
            <button
              class:active={index === currentIndex}
              onclick={() => selectImage(index)}
              aria-label="show image{index + 1}"
              aria-current={index === currentIndex}
            >
              <img
                src={image.imageurl}
                alt=""
                role="presentation"
                loading="lazy"
                draggable="false"
              /></button
            >
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
      <div class="check">
        <div class="arithmetic"><span>-</span><span>1</span><span>+</span></div>
        <button class="incart">Add to Cart</button>
      </div>

      <div class="xtra">
        <button class="extra"
          ><span><Icon icon="ph:heart-thin" /></span>Add to wishlist</button
        >
        <button class="extra">
          <span><Icon icon="material-symbols-light:share-outline" /></span>Share
          Product
        </button>
      </div>
    </div>
  </div>
{:else}
  <p>No product available</p>
{/if}
<div class="desc-review">
  <div class="btn-section">
    <button
      class="desc-reviewbtn"
      class:active={activeTab === "desc"}
      onclick={() => (activeTab = "desc")}>Full Description</button
    >
    <button
      class="desc-reviewbtn"
      class:active={activeTab === "additional_information"}
      onclick={() => (activeTab = "additional_information")}
      >Additional Information</button
    >
    <button
      class="desc-reviewbtn"
      class:active={activeTab === "reviews"}
      onclick={() => (activeTab = "reviews")}>Reviews</button
    >
  </div>
  <div class="desc-reviewctn">
  {#if activeTab === "desc"}
    <div>
      {productdescriptions[0]?.short_description}
    </div>
  {:else if activeTab === "additional_information"}
    <div>{productdescriptions[0]?.additional_information}</div>
  {:else}
    <div>Product review</div>
  {/if}
  </div>
</div>

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
    flex: 0 0 40%;
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
    padding: 15px 69px;
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
  .desc-reviewctn{
    font-weight: 400;
    line-height: 24px;
    color: rgb(0, 0, 0);

  }
  .desc-reviewbtn.active{
    color: black;
  }
  .btn-section{
    border-bottom: 1px solid lightgray;
    padding-bottom: 4px;
    display: flex;
    gap: 15px;
  }
</style>
