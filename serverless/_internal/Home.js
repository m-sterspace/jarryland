const mongoose = require('mongoose');
const mongo = require('../_connections/mongo');

const Schema = new mongoose.Schema(
    {
        id: mongoose.Types.ObjectId,

        ipaddress: String,

    }
);

//the models are now gotten dynamically as we are dealing with multiple Mongo connections and 
//the models are dependent on the connections. Uses a default database name, but also allows 
//you to get a model for a different db if you need to. Avoids errors with trying to fetch the
//models before mongoose is connected.
const GetModel = async dbName => {
    if(!dbName) dbName = 'homeservice'
    const dbConnection = await mongo.getDbConnection(dbName);
    if(!dbConnection) {throw Error("DB Couldn't Connect")}
    const model = dbConnection.model('Home', Schema);
    return model;
}
module.exports =  {GetModel,Schema};