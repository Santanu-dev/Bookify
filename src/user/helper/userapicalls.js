import { API } from "../../Backend"

export const findOrdersForUser = (userId, token) => {
    return fetch(`${API}/user/order/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        if(res.error){
            return res.error;
        }else{
            return res.json()
        }
    }).catch(err => console.log(err));
}

export const getOrderStatus = (userId, token, transId) => {
    return fetch(`${API}/order/status/${userId}/${transId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}