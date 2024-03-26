const axios = require('axios');

console.log("in assetsCMC")

// var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map";
// const options = {
//   mode: 'no-cors',
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json;charset=UTF-8",
//     'X-CMC_PRO_API_KEY': 'ef2c2f7c-d21a-4720-80ab-5fb284d79ffc'

//   },
//   body: JSON.stringify({
//     a: 10,
//     b: 20,
//   }),
// };
// fetch(url, options)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

let response = null;
// async function getData(){
   new Promise(async (resolve, reject) => {
    try {
      response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
        headers: {
          "mode": "no-cors",
          'X-CMC_PRO_API_KEY': 'ef2c2f7c-d21a-4720-80ab-5fb284d79ffc',
        },
      });
    } catch(ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }
    if (response) {
      // success
      const json = response.data;
      console.log(json);
      resolve(json);
    }
  });
// }

