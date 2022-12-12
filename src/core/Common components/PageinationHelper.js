import { API } from '../../Backend'

export const getTotalBooksInDB = () => {
    return fetch(`${API}/products/count`, {
        method: "GET"
    }).then(count => {return count.json()})
    .catch(err => console.log(err))
}