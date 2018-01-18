const router = require('express').Router()
const beacon = require('../../beaconsManagement/beacons')
const reg = require('../../beaconsManagement/Document')
const base64 = require('base-64');
const isUndefined = require("is-undefined");

const utf8 = require('utf8');

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'BM';

router.post('/',(req,res)=>{

    let text = req.body.adid;
    let bytes = utf8.encode(text);
    let encoded = base64.encode(bytes);
    console.log(encoded);

    let det={
        token:req.session["tokens"].access_token,
        projectId:'neural-myth-191906',
        adtype:req.body.adType,
        adid:encoded,
        status:req.body.status,
        placeId:req.body.placeId,
        lat:req.body.lat,
        lon:req.body.lon,
        name:req.body.name,
        eS:req.body.eS,
        desc:req.body.desc,
        prop:req.body.prop
    };
    beacon.register(det).then(data=>{
        console.log("REGSITER------------------------------------->")
        console.log(data)

        if (!isUndefined(data.error)){
            if (data.error.code === 400 || data.error.code === 404 || data.error.code === 409){
                res.send("ERROR")
            }
        }
        else{
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                reg.reg(data,db).then(d1=>{
                   console.log("---------------------------------> MONGO DB ")
                   console.log(d1)
                    res.send("Success")
                });
                client.close();
            });
        }
        //res.send(data.error.code)
    })
});

module.exports = router;