<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  export let data; // Receive isAuthenticated from load
  let isAuthenticated = data.isAuthenticated;

  // Fallback for client-side navigation not caught by load
  onMount(async () => {
    if (!browser) return;
    // Optionally revalidate token if needed
    if (isAuthenticated && window.location.pathname === '/login') {
      const redirectParam = new URLSearchParams(window.location.search).get('redirect');
      const target = redirectParam?.startsWith('/') ? redirectParam : '/account';
      await goto(target);
    }
  });
</script>

<slot />