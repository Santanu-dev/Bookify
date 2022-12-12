export const addProductsToCart = (product, next) => {
    let cart = []

    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.push({
            ...product
        })

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
}

export const loadCart = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}

export const removeFromCart = (productId) => {
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, index) => {
            if(product._id === productId){
                cart.splice(index, 1);
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
}

export const empyCart = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart");
        next();
    }
}