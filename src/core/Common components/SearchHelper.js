import { API } from '../../Backend'

export const getSearchedProducts = (searchItem) => {
    return fetch(`${API}/search/results/products?s=${searchItem}`, {
        method: 'GET'
    }).then( res => {
        return res.json();
    })
    .catch(err => console.log(err));
}