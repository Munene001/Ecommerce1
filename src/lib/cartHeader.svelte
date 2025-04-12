<!-- CartHeader.svelte -->
<script>
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation"; // Use SvelteKit's navigation
    import { browser } from "$app/environment"; // Check if running in browser
  
    let cart = [];
    let totalItems = 0;
  
    // Initialize cart from localStorage
    function loadCart() {
      try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      } catch (e) {
        console.error("Error loading cart:", e);
        cart = [];
        totalItems = 0;
      }
    }
  
    // Only run client-side code in the browser
    onMount(() => {
      if (browser) {
        loadCart(); // Initial load
        window.addEventListener("cartUpdated", loadCart); // Listen for updates
        return () => window.removeEventListener("cartUpdated", loadCart); // Cleanup
      }
    });
  
    function navigateToCheckout() {
      if (browser) {
        goto("/cart"); // Use SvelteKit navigation instead of window.location
      }
    }
  </script>
  
  <div class="cart">
    <a href="/checkout" aria-label="Go to checkout" on:click|preventDefault={navigateToCheckout}>
      <Icon icon="raphael:cart" />
      {#if totalItems > 0}
        <span class="cart-count">{totalItems}</span>
      {/if}
    </a>
  </div>
  
  <style>
    .cart {
      font-size: 25px;
      margin-left: 90px;
      line-height: 32px;
      cursor: pointer;
      position: relative;
    }
    .cart-count {
      position: absolute;
      top: -15px;
      right: -5px;
      background-color: red;
      color: white;
      border-radius: 70%;
      padding: 1px 3px;
      font-size: 16px;
    }
    a {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }
  </style>