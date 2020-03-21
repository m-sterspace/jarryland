
const mongoose = require('mongoose');

let connected = false;

mongoose.Promise = global.Promise;
//subscribe to the disconnected event and try to connect again
mongoose.connection.on('disconnected', () => {
  console.log('');
  console.log('Mongoose default connection disconnected');
  let waitTime = 20;
  console.log("Trying to reconnect in " + waitTime + 's');
  setTimeout(connect, waitTime * 1000);//wait 30s then try to connect again.
});

mongoose.connection.on('connected', () => {
  console.log('db connected')
  connected = true;
});


const connect = () => {
  let constr = process.env.MONGO_STRING;
  let newUrlParser = process.env.URL_PARSER || true;

  if (!constr) {//if not set from an env variable, try to read it from a .gitignore'd private file for dev purposes
    console.log("no con string set and no local env file.");
  }
  else {
    console.log('con string from: env');
  }

  console.log('use new url parser: ' + newUrlParser);
  mongoose.connect(constr, { useNewUrlParser: newUrlParser, useFindAndModify: false, autoReconnect: false })
    .then(con => {
      console.log('db connected.');
    })
    .catch(err => { console.log('Unable to connect to db.'); console.log(err); });
}

const getDbConnection = async dbName => {
  try {
    if (!connected) {
      console.log('attempting to get ' + dbName + ' connection but not currently connected to mongo, will add to the event queue');
      mongoose.connection.on('connected', dbConInfo => {
        console.log(dbConInfo);
        return mongoose.connection.useDb(dbName);
      })
    }
    else {
      return mongoose.connection.useDb(dbName);
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

connect();
module.exports = {
  connect,
  mongoose,
  getDbConnection
};