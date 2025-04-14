export async function load({ url, fetch, depends }) {
    // This key can be used to invalidate the load function
    depends('app:auth');
  
    // Skip auth check during SSR - only check on client
    if (typeof window === 'undefined') {
      
    }
  
    const token = localStorage.getItem('authToken') || '';
    let isAuthenticated = false;
  
    async function validateToken() {
      if (!token) return false;
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response.ok;
      } catch (error) {
        console.error('Error validating token:', error);
        return false;
      }
    }
  
    isAuthenticated = await validateToken();
  
    const pathname = url.pathname;
    const redirectParam = url.searchParams.get('redirect');
    const protectedRoutes = ['/account', '/checkout', '/dashboard', '/wishlist'];
  
    const storedRedirect = sessionStorage.getItem('originalRedirect');
    const finalRedirect = redirectParam || storedRedirect || '/account';
  
    if (isAuthenticated && pathname === '/login') {
      throw redirect(307, finalRedirect);
    }
    else if (!isAuthenticated && protectedRoutes.includes(pathname)) {
      sessionStorage.setItem('originalRedirect', pathname);
      throw redirect(307, `/login?redirect=${encodeURIComponent(pathname)}`);
    }
}