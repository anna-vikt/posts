class Api {
    #baseUrl;
    #headers;

    constructor({baseUrl, headers}) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
        return res.ok? res.json() : res.json().then(err => Promise.reject(err))
    }

    getAllInfo() {
        return Promise.all([this.getPostsList(), this.getUserInfo()])
    }

    getPostsList() {
        return fetch(`${this.#baseUrl}/posts`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getUserInfo () {
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    changeLikePostStatus(postID, like) {
        return fetch(`${this.#baseUrl}/posts/likes/${postID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponse)
    }

    deletePost(postID) {
        return fetch(`${this.#baseUrl}/posts/${postID}`, {
            method: 'DELETE',
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getPostById(idPost) {
        return fetch(`${this.#baseUrl}/posts/${idPost}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getInfoPost(idPost) {
        return Promise.all([this.getPostById(idPost), this.getUserInfo()])
    }

    addNewPost({image, title, text}) {
        return fetch(`${this.#baseUrl}/posts`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify({image, title, text})
        })
            .then(this.#onResponse);
    }

}


const api = new Api ({
    baseUrl: 'https://api.react-learning.ru/v2/group-11',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOGFhMzk3MTIxODM4ZjI4Y2MiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ1LCJleHAiOjE3MTAzMzg0NDV9.kZEWWebomQEcFQ3JyjUuF8l3B_o5sLselfMazIwH6VM'
    }
}
)

// api.getPostsList()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// api.getUserInfo()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

export default api;