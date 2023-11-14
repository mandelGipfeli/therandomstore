import axios from 'axios'

const getUsers = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://dummyjson.com/users?limit=100')
        .then((data) => {
            resolve(data.data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

const getUser = (id: number) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://dummyjson.com/user/${id}`)
        .then((data) => {
            resolve(data.data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
    
export { getUsers, getUser }
