const axios = require('axios');

axios.post('http://localhost:3000/create', {
    url: 'https://ddc.gg/heeha/',
}).then(function (response) {
    console.log(response.data);
    
})