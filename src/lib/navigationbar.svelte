<script>
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";

  function navigateToSearch(){
    goto("/search");
  }
  function navigateToShop(){
    goto("/shop");
  }
  function navigateToAccount(){
    goto("/account");
  }
  

</script>

<div class="navbar">
  <button on:click={navigateToShop}
    ><Icon icon="streamline:store-1" style="font-size:27px" /><span>shop</span
    ></button
  >
  <button on:click={navigateToSearch}
    ><Icon icon="iconamoon:search-thin" style="font-size:28px" /><span
      >search</span
    ></button
  >
  <button
    ><Icon
      icon="material-symbols-light:filter-list"
      style="font-size:29px;"
    /><span>filter</span></button
  >
  <button on:click={navigateToAccount}
    ><Icon icon="bi:person" style="font-size:28px" /><span>account</span
    ></button
  >
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  @media (min-width: 768px) {
    .navbar {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .navbar {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1000;
      height: 9vh;
      width: 100%;
      background-color: white;
      border-top: 1px solid rgba(128, 128, 128, 0.5);
      align-items: center;
    }
    .navbar button {
      text-decoration: none;
      border: none;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: rgb(73, 69, 69);
    }

    .navbar span {
      text-align: center;
      font-size: 9px;
      line-height: 13.5px;
      margin-top: 10px;
    }
  }
</style>
