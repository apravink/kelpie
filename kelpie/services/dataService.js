import axios from "axios";

export async function getPetStatus() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(response.data);
  } catch (error) {
    console.log("error", error);
  }
}

// Post hatchCode

export async function validateUser(hatchCode) {
  try {
    const response = await axios({
      method: "post",
      url: "https://limitless-meadow-89301.herokuapp.com/locations",
      data: { hatchCode },
      params: {
        code: hatchCode
      }
    });
    return response.data == "Code invalid!" ? false : true;
  } catch (error) {
    return error;
  }
}

// Post Time stamps
// startTime: Unit time stamp for stsart time
// endtime: End time
export async function setTimestamp(startTime, endTime) {
  const difference = endTime - startTime + '';
  try {
    const response = await axios({
      method: "post",
      url: "https://limitless-meadow-89301.herokuapp.com/users",
      param: {
        time: difference,
        name: "child1",
        locations: "Central Tech TDSB - Service Location"
      }
    });
    console.log('response from timestamp',response.data)
  } catch (error) {
    console.log(error);
    return error;
  }
}
