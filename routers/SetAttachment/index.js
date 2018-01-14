const router = require('express').Router()
const beacon = require('../../beaconsManagement/beacons')
const base64 = require('base-64')
const utf = require('utf8')
router.post('/',(req,res)=>{
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
        let text = req.body.data;
        var bytes = utf.encode(text);
        var encoded = base64.encode(bytes);
        let det = {
            token: req.session["tokens"].access_token,
            projectId :'neural-myth-191906',
            data:encoded,
            beaconName:req.body.beaconName,
            nT:NameS+'/string'
        }
        beacon.setAttachment(det).then(data=>{
            console.log("SetAttach---------------------->")
            console.log(data)
            res.send(data)
        })
    })
});
module.exports = router