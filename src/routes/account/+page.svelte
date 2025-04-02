!-- src/routes/account/+page.svelte -->
<script>
    import { auth, logout } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    
    export let data;
    
    async function handleLogout() {
        await logout(fetch);
        goto('/login');
    }
</script>

<h1>Welcome, {$auth.user?.name}</h1>
<p>Email: {$auth.user?.email}</p>

<button on:click={handleLogout}>Logout</button>
    