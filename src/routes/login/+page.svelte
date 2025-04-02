<!-- src/routes/login/+page.svelte -->
<script>
    import { auth, initializeCSRF, login } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    
    let email = '';
    let password = '';
    let error = '';
    
    onMount(async () => {
        await initializeCSRF(fetch);
    });
    
    async function handleSubmit() {
        error = '';
        const success = await login(email, password, fetch);
        if (!success) {
            error = 'Login failed. Please check your credentials.';
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    {#if error}
        <div class="error">{error}</div>
    {/if}
    
    <input type="email" bind:value={email} placeholder="Email">
    <input type="password" bind:value={password} placeholder="Password">
    <button type="submit">Login</button>
</form>