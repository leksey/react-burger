const API_BASE_URL = "https://norma.nomoreparties.space/api";

export function getIngredients() {
    return fetch(`${API_BASE_URL}/ingredients`)
     .then(checkResponse)
}
 
export function sendOrder(body) {
    return fetch(`${API_BASE_URL}/orders`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
     .then(checkResponse )
}

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};