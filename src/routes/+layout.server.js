// src/routes/+layout.server.js
export async function load({ fetch }) {
    const authResponse = await fetch('http://127.0.0.1:8000/api/auth/check', {
        credentials: 'include'
    });
    
    const authData = await authResponse.json();
    
    return {
        initialAuth: authData
    };
}