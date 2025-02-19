import { goto } from "$app/navigation"; 



export function openProductPage(product_id) {
    if (!product_id) {
        console.log("product is missing");
        return;
    }
    goto(`/product/${product_id}`);
}
