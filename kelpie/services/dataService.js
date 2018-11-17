import  axios from 'axios'

export async function getPetStatus() {
    try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    console.log(response.data)
    } catch(error) {
        console.log('error', error)
    }

}

// Post hatchCode 

export async function validateUser( hatchCode ) {
    try {
        const body = {}
        return await axios({
            method: 'post',
            url: '',
            data: body
        });
    } catch(error) {
        console.log(error)
        return error;
    }
}

// Post Time stamps
// startTime: Unit time stamp for stsart time
// endtime: End time
export async function setTimestamp(startTime, endTime) {
    console.log('startTime', typeof startTime, 'endtime', endTime)
    
    // const response = await axios({
    //   method: "post",
    //   url: "https://limitless-meadow-89301.herokuapp.com/user",
    //   data: 
    // });
}

// 