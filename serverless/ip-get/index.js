const homedataApi = require('../_internal/homedata');
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    try{
        let response = await homedataApi.getHomeData();
        context.res = {
            // status: 200, /* Defaults to 200 */
            headers: { 'Content-Type': 'application/json' },
            body: {res: response}
        };
    }catch(err){
        context.res = {
             status: 500, /* Defaults to 200 */
            headers: { 'Content-Type': 'application/json' },
            body: {err: err}
        };
    }
};