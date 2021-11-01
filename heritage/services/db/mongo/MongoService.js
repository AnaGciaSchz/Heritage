const MongoClient = require('mongodb').MongoClient;


exports.listDatabases = async () => {
    client = getClient();
    await client.connect();
    let databasesList = await client.db().admin().listDatabases();

    const dbs = [];
    let cont = 0;

    databasesList.databases.forEach(db => {
        dbs[cont] = db.name;
        cont++;
    });
    return dbs;

}