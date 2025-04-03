<script>
    import Header from "../../lib/header.svelte";
    import { goto } from "$app/navigation";

    let username = "";
    let email = "";
    let password = "";
    let passwordConfirmation = ""; // Add this line
    let errorMessage = "";
    let isLoading = false;

    async function registerAccount() {
        if (password !== passwordConfirmation) { // Client-side validation
            errorMessage = "Passwords don't match";
            return;
        }

        isLoading = true;
        errorMessage = "";
        
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    username, 
                    email, 
                    password,
                    password_confirmation: passwordConfirmation // Match Laravel's expected field name
                })
            });

            if (response.ok) {
                goto("/login");
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message || "Registration failed";
            }
        } catch (error) {
            errorMessage = "An error occurred. Please try again";
            console.error("Registration error:", error);
        } finally {
            isLoading = false;
        }
    }
</script>

<Header />

<form on:submit|preventDefault={registerAccount}>
    <input type="text" bind:value={username} required placeholder="Username" />
    <input type="email" bind:value={email} required placeholder="Email" />
    <input type="password" bind:value={password} required placeholder="Password" />
    <input type="password" bind:value={passwordConfirmation} required placeholder="Confirm Password" />
    <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Sign Up'}
    </button>
</form>

{#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
{/if}