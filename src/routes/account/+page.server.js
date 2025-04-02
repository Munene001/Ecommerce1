import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
    const { initialAuth } = await parent();
    
    if (!initialAuth.authenticated) {
        throw redirect(303, '/login');
    }
    
    return {
        user: initialAuth.user
    };
}