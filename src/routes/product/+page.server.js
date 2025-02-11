export async function load({params, fetch}){
    const{id} = params;
    const API_URL = 'http://27.0.0.1:8001/api/product/${id}/';

    try {
        const response = await fetch(API_URL);

        if (!response.ok){
            throw new Error("Failed to fetch product");
        }
        const product = await response.json();
        return {product};

        
    } catch (error) {
        console.error("Error loading product:", error);
        return { product: null };
        
    }


}