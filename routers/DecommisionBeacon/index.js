const router = require('express').Router()
const beacon = require('../../beaconsManagement/beacons')
const removeOne = require('../../beaconsManagement/Document')
const empty = require('is-empty')
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'BM';

router.post('/',(req,res)=>{

    let bn = req.body.beaconName
    let details={
        beaconName:bn,
        pI:'neural-myth-191906',
        token:req.session["tokens"].access_token
    }
    beacon.decommission(details).then(data=>{
        console.log("Data : -------------> " + data + "successfully deactivated")

        // Not able to understand what went wrong
        if (empty(data)){
            // res.send("success")
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                reg.removeOne(det,db).then(d1=>{
                    console.log("---------------------------------> MONGO DB ")
                    console.log(d1)
                    res.send("Success")
                });
                client.close();
            });
        }
        else{
            res.send("fail")
        }
    })
})
module.exports = router;