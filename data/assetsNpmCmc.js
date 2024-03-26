const CoinMarketCap = require('coinmarketcap-api')

const apiKey = 'ef2c2f7c-d21a-4720-80ab-5fb284d79ffc'
const client = new CoinMarketCap(apiKey)

client.getTickers().then(console.log).catch(console.error)
// client.getTickers({id: 1}).then(console.log).catch(console.error)
// client.getIdMap({symbol: 'BTC,ETH'}).then(console.log).catch(console.error)
// client.getGlobal().then(console.log).catch(console.error)
// client.getIdMap({limit: 5}).then(console.log).catch(console.error)
// console.log("IN ASSETSNPM: client")
// client.getMetadata({symbol: 'BTC'}).then(console.log).catch(console.error)

// const options = {
//     mode: 'no-cors',
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8",
//         // 'X-CMC_PRO_API_KEY': 'ef2c2f7c-d21a-4720-80ab-5fb284d79ffc'

//     },
//     body: JSON.stringify({
//         a: 10,
//         b: 20,
//     }),
// };
// fetch(client, options)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error(error);
//     });