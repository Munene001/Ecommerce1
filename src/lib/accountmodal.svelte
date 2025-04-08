<script>
    import Icon from "@iconify/svelte";
    import { goto } from "$app/navigation";
	let showModal = false;
	let dialog;
    

	function openModal() {
		if (!showModal) {
			showModal = true;
			dialog.showModal();
		}
	}

	function closeModal() {
		showModal = false;
		dialog.close();
	}
    function navigateToAccount(){
        goto('/register');
    }
    function navigateLogin(){
        goto('/login');
    }

</script>

<!-- Trigger: Account Icon -->
<div
	on:click={openModal}
	on:mouseover={openModal}
	style="cursor: pointer; display: inline-block;"
    role
>
	<!-- Replace with your actual icon -->
    <Icon icon="bi:person" />
</div>

<!-- Modal -->
<dialog
	bind:this={dialog}
	on:close={closeModal}
	on:click={(e) => {
		if (e.target === dialog) closeModal();
	}}
>
	<div class="modal-content">
		<h2>My Account</h2>
		<p class="subtext">Sign in for a more personalized experience</p>
		<div class="auth-buttons">
			<button on:click={navigateLogin}>Log In</button>
			<button on:click={navigateToAccount}>Create Account</button>
		</div>
		<hr />
		<div class="menu-buttons">
			<button on:click={() => console.log('Orders')}>Orders</button>
			<button on:click={() => console.log('Favourites')}>Favourites</button>
			<button on:click={() => console.log('Account Settings')}>Account Settings</button>
		</div>
		<hr />
		<!-- Close Button -->
		<button autofocus on:click={closeModal}>Close</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.4em;
		border: none;
		padding: 0;
        position: absolute;
        left: 90;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	.modal-content {
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}
	h2 {
		margin: 0;
	}
	.subtext {
		font-size: 0.9em;
		color: #555;
	}
	.auth-buttons {
		display: flex;
		gap: 1em;
	}
	.menu-buttons {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
	button {
		background: #eee;
		border: none;
		padding: 0.5em 1em;
		border-radius: 4px;
		cursor: pointer;
	}
	button:hover {
		background-color: #ddd;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
