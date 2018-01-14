const router = require('express').Router();
const beacon = require('../../beaconsManagement/beacons')
const isUndefined = require("is-undefined");
const base64 = require('base-64')
const utf = require('utf8')
const empty = require('is-empty')

router.post('/',(req,res)=>{
    let details = {
        beaconName:req.body.beaconName,
        projectId:'neural-myth-191906',
        token:req.session["tokens"].access_token
    };
    beacon.getinfoPerBeacon(details).then(data=>{
        console.log("DATA ->>>>>>>>>>>>>>>" + data)
        let body = JSON.parse(data)
            let det = {
                pI:'neural-myth-191906',
                token:req.session["tokens"].access_token
            }
            beacon.NamespacesList(det).then(d1=>{
                console.log(d1)
                let b1 = JSON.parse(d1)
                console.log(b1)
                let NameS= b1.namespaces[0].namespaceName.replace('namespaces/','')
                console.log(NameS)
                let det = {
                    beaconName:req.body.beaconName,
                    pI:'neural-myth-191906',
                    nT:NameS+"/string",
                    token:req.session["tokens"].access_token
                }
                beacon.getAttachmentDetails(det).then(d2=>{
                    let det={
                        beaconName:req.body.beaconName,
                        pI:'neural-myth-191906',
                        token:req.session["tokens"].access_token,
                        pageSize:'10',
                        pageToken:'',
                        alertFilter:''
                    }
                    let en;
                    console.log(d2)
                    if (!empty(JSON.parse(d2))){
                        let de = JSON.parse(d2)
                        en = de.attachments;
                        for (let i=0 ; i<en.length;i++){
                            let encoded = en[i].data;
                            let bytes = base64.decode(encoded);
                            let text = utf.decode(bytes);
                            en[i].data = text
                        }
                    }else{
                        en = []
                    }
                    beacon.dia(det).then(d3=>{
                        console.log("Diaognistics ------------------------")
                        console.log(d3)
                        let result = {
                            data:body,
                            attachment:en,
                            diag:d3
                        }
                        console.log("RESULT------------------")
                        console.log(result)
                        //rendering
                        res.send(result)
                    })
                })
            })
        })
    });
module.exports = router;