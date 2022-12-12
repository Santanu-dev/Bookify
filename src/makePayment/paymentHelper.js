import { API } from '../Backend'

export const getToken = (userId, token) => {
    return fetch(`${API}/payment/gettoken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then( res => {
        return res.json();
    })
    .catch(err => console.log(err));
}

export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}/make/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then( res => {
        return res.json();
    })
    .catch(err => console.log(err));
}


export const getProductForPayment = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err))
 }
