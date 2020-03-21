const homedataApi = require('../_internal/homedata');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    try{
        const secretsecret = process.env.API_KEY;
        if(!secretsecret){
            throw Error('No Server Side API KEY');
        }
        if(!req.headers || !req.headers['api-key'] ){
            console.log(req.headers);
            throw Error('No Auth header')
        }
        if(req.headers['api-key'] !== secretsecret){
            throw Error('Unauthorized')
        }

        const response = await homedataApi.postHomeData(req.body);
        context.res = {
            // status: 200, /* Defaults to 200 */
            headers: { 'Content-Type': 'application/json' },
            body: {res: response}
        };
    }catch(errr){
        context.res = {
             status: 500, /* Defaults to 200 */
            headers: { 'Content-Type': 'application/json' },
            body: {err: errr.toString()}
        };
    }

    
};