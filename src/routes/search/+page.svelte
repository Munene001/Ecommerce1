<script>
    import Header from "$lib/header.svelte";
    import Navigationbar from "$lib/navigationbar.svelte";
    import Icon from "@iconify/svelte";
    /**
   * @type {{ focus: () => void; }}
   */
    let input;
    $: if (input) input.focus();
    function handleSearch(){
        console.log("search for product in database");
    }

</script>
<Header/>
<div class="quiz">
    What are you looking for?
</div>
<div class="sear">
    <input
          type="text"
          bind:this={input}
          placeholder="Search for you favourite product"
          on:input={handleSearch}
          

        />
        <button on:click={handleSearch}><Icon icon="iconamoon:search-thin" style="font-size:22px" /></button>
</div>
<Navigationbar/>
<style>
    :global(body) {
      margin: 0;
      padding: 0;
    }
    
    .quiz{
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        padding: 0px 13px;
        margin-top: 28px;
    }
    .sear{
        padding: 0px 13px;
        margin-top: 18px;
        display: flex;
        flex-direction: row;

    }
    .sear input{
        width: 90%;
        border: none;
        border-bottom: 2px solid rgba(128, 128, 128, 0.2);
        outline: none;
        padding-bottom: 9px;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;

        
        
    }
    .sear input:focus{
        border: none;
        
        border-bottom: 2px solid rgba(128, 128, 128, 0.2);
    }
    .sear button{
        background-color: transparent;
        border: none;
        padding-bottom: 9px;
    }
</style>