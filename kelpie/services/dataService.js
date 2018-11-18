import axios from "axios";

// Pet mood and temperment at current time
export async function getPetStatus() {
  try {
    const response = await axios.get(
      "https://limitless-meadow-89301.herokuapp.com/pets?name=child1"
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

// Validate user code
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
    console.log(response.data)
    return response.data == "Code invalid!" ? false : true;
  } catch (error) {
    return error;
  }
}

//Send time stamps for
export async function setTimestamp(startTime, endTime) {
  if(startTime && endTime) {
      const difference = endTime - startTime + "";
      console.log('time difference',difference);
      try {
          const response = await axios({
              method: "post",
              url: "https://limitless-meadow-89301.herokuapp.com/users",
              params: {
                  time: difference,
                  name: "child1",
                  locations: "Central Tech TDSB - Service Location"
              }
          });
          console.log("response from timestamp", response.data);
      } catch (error) {
          console.log("error", error);
          return error;
      }
  }
  
}
