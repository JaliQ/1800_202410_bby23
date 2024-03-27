// const axios = require('axios');

// let response = null;
// // async function getData(){
//    new Promise(async (resolve, reject) => {
//     try {
//       response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
//         headers: {
//           "mode": "no-cors",
//           'X-CMC_PRO_API_KEY': 'ef2c2f7c-d21a-4720-80ab-5fb284d79ffc',
//         },
//       });
//     } catch(ex) {
//       response = null;
//       // error
//       console.log(ex);
//       reject(ex);
//     }
//     if (response) {
//       // success
//       const json = response.data;
//       console.log(json);
//       resolve(json);
//     }
//   });
// // }

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map'

fetch(url, {
  method: 'POST',
  headers: {
    'mode': 'no-cors',
    'X-CMC_PRO_API_KEY': 'ef2c2f7c-d21a-4720-80ab-5fb284d79ffc',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
},
})
  .then((res => res.json()))
  .then((data) => {
    console.log(data)
  })
  .catch((err) => reject(err));

