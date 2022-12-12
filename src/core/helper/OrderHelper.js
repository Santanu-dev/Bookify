import { API } from '../../Backend'

export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/placeOrder/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({orderData})
    }).then(res => {
        return res.json();
    })
    .catch((err) => console.log(err));
}

export const updateOrderStatus = (userId, orderId, token, status) => {
    console.log(JSON.stringify({"status" : status}))
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({"status" : status})
    }).then(res => {
        return res.json();
    })
    .catch((err) => console.log(err));
}