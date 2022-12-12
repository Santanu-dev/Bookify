import { API } from "../../Backend";

export const getAllProducts = (p) => {
    return fetch(`${API}/products?p=${p}`, {
        method: 'GET'
    }).then( res => {
        return res.json();
    })
    .catch(err => console.log(err));
}