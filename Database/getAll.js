const getAll = require('../beaconsManagement/Document')

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'BM';

MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    getAll.getAll(db).then(res=>{
        console.log("GetAll ---------------------->")
        console.log(res)
    })


    client.close();
})