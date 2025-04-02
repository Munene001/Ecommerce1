<script>
  import { fromStore } from 'svelte/store';

  

  
  import { auth } from '$lib/stores/auth';
    export let data;

    $auth = {
        user:data.initialAuth.user,
        authenticated:data.initialAuth.authenticated,
        loading:false
    };
</script>
<slot/>