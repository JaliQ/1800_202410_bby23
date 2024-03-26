const axios = require('axios');

let response = null;
new Promise(async (resolve, reject) => {
    try {
        response = await axios.get('https://yahoo-finance127.p.rapidapi.com/multi-quote/btc,tsla,eth', {
            headers: {
                'X-RapidAPI-Key': 'dd54c567bdmshbc2da4da544ff1bp1ffc40jsn2708e9551e62',
                'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
            },
        });
    } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
    } if (response) {
        // success
        const json = response.data;
        console.log(json);
        resolve(json);
    }
})

