<script>
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment"; 
    import Header from "../../lib/header.svelte";
  
    let email = "";
    let password = "";
    let errorMessage = "";
  
    async function handleLogin() {
      errorMessage = "";
      try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({email, password})
        });
        
        if (response.ok) {
          const data = await response.json();
          if (browser) {
            localStorage.setItem("authToken", data.token);
          }
          goto("/account");
        } else {
          const errorData = await response.json();
          errorMessage = errorData.message || "Login failed";
        }
      } catch (error) {
        errorMessage = "An error occurred. Please try again.";
      }
    }
  </script>
  <Header/>
  
  <form on:submit|preventDefault={handleLogin}>
    <input type="email" bind:value={email} required placeholder="Email" />
    <input type="password" bind:value={password} required placeholder="Password" />
    <button type="submit">Login</button>
  </form>
  <div>Dont have an account go to<a href="/register" aria-label = "register">Sign Up</a></div>
  
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}