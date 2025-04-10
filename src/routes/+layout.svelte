<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment"; 
  

  let token = browser ? localStorage.getItem("authToken") || "" : "";
  let isAuthenticated = false;

  async function validateToken() {
    if (!token) return false;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Error validating token", error);
      return false;
    }
  }

  onMount(async () => {
    if (!browser) return;
    isAuthenticated = await validateToken();
    if (isAuthenticated && window.location.pathname === "/login") {
      goto("/account");
    } else if (!isAuthenticated && window.location.pathname === "/account") {
      goto("/login");
    }
  });
</script>
<slot />