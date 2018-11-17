import  axios from 'axios'

export async function getPetStatus() {
    try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    console.log(response.data)
    } catch(error) {
        console.log('error', error)
    }

}

// Post Time stamps
// startTime: Unit time stamp for stsart time
// endtime: End time
export async function setTimestamp(startTime, endTime) {
    const body = {}
}

// 