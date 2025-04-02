import { writable } from "svelte/store";
import { browser } from "$app/environment";

function getCookie(name) {
    if (!browser) return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const auth = writable({
    user: null,
    authenticated: false,
    loading: true,
});

export async function initializeCSRF(fetch) {
    if (!browser) return;
    
    try {
        await fetch("http://127.0.0.1:8000/api/sanctum/csrf-cookie", {
            credentials: "include",
            mode: 'cors'
        });
    } catch (error) {
        console.error("CSRF initialization failed:", error);
    }
}

export async function login(email, password, fetch) {
    try {
        // Ensure CSRF cookie is set
        await initializeCSRF(fetch);
        
        const xsrfToken = getCookie('XSRF-TOKEN');
        if (!xsrfToken) throw new Error('Missing CSRF token');

        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": xsrfToken,
                "X-Requested-With": "XMLHttpRequest"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        return await checkAuth(fetch);
    } catch (error) {
        console.error('Login error:', error);
        auth.set({
            user: null,
            authenticated: false,
            loading: false
        });
        return false;
    }
}
// Logout function
export async function logout(fetch) {
  await fetch("http://localhost:8000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  auth.set({
    user: null,
    authenticated: false,
    loading: false,
  });
}
