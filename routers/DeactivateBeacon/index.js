const router = require('express').Router()
const beacon = require('../../beaconsManagement/beacons')
const empty = require('is-empty')
router.post('/',(req,res)=>{

    let bn = req.body.beaconName
    let details={
        beaconName:bn,
        pI:'neural-myth-191906',
        token:req.session["tokens"].access_token
    }
    beacon.deactivateBeacon(details).then(data=>{
        console.log("Data : -------------> " + data + "successfully deactivated")

        // Not able to understand what went wrong
        if (empty(data)){
            res.send("success")
        }
        else{
            res.send("fail")
        }
    })
})
module.exports = router;