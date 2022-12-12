import { API } from "../../Backend";

//category api calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
}

export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

export const getACategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {return console.log(err)});
}

export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
}

export const removeCategories = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}


//product api calls
export const addProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(res => {
        return res;
    })
    .catch(err =>  console.log(err) );
}

export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

export const getAllProductsNow = () => {
    return fetch(`${API}/all/products`, {
        method: 'GET'
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err))
}

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
}

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }})
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
}

export const getAllOrders = (userId, token) => {
    return fetch(`${API}/order/allOrders/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err))
}

export const getAllUsers = (userId, token) => {
    return fetch(`${API}/user/allUsers/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err))
}