const axios = require('axios');

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

