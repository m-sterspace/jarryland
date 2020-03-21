const http = require('http');
const https = require('https');

var fs = require('fs');
const path = require('path');

let pathy = './.env'; //look for a ".env" file next to this one with connection string
let abs = path.join(__dirname, pathy);
console.log(abs);
let constr = fs.readFileSync(abs, 'utf8');
console.log(constr)

let apipath = './.env.api'; //look for a ".env" file next to this one with connection string
let absapipath = path.join(__dirname, apipath);
console.log(absapipath);
let apiKey = fs.readFileSync(absapipath, 'utf8');
console.log(apiKey)

var options = {
    host: 'ipv4bot.whatismyipaddress.com',
    port: 80,
    path: '/'
};

let currentIP = "";

const getAndPostIP = () => {
    http.get(options, function (res) {
        console.log("status: " + res.statusCode);


        res.on("data", function (chunk) {
            console.log(chunk.toString());
            const ip = chunk.toString();
            if (ip !== currentIP) {
                currentIP = ip;
                const postData = JSON.stringify({ ipaddress: ip+":25566" });
                console.log(postData);
                const newOpts = {
                    hostname: 'jarryland.azurewebsites.net',
                    port: 443,
                    path: '/api/general/ip',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': postData.length,
                        'api-key': apiKey
                    }
                };
                console.log('sending https request:')
                let req = https.request(
                    newOpts,
                    newRes => {
                        console.log('statusCode:', newRes.statusCode);
                        console.log('headers:', newRes.headers);
                        newRes.on('data', (d) => {
                            console.log(JSON.parse(d.toString()));
                        });
                    }
                );

                req.on('error', (e) => {
                    console.error(e);
                });
                req.write(postData);
                req.end();
            }

        });
    }).on('error', function (e) {
        console.log("error: " + e.message);
    });
};

getAndPostIP();//do it immediately the first time to make debuggin easier

setInterval(
    getAndPostIP,
    30000
);