import  axios from 'axios'

export async function getPetStatus() {
    try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    } catch(error) {
        console.log('error', error)
    }

}