const router = require('express').Router()
const beacon = require('../../beaconsManagement/beacons')
router.post('/',(req,res)=>{
    let det = {
        attachName:req.body.attachName,
        pI: 'neural-myth-191906',
        token: req.session["tokens"].access_token
    }
    beacon.deleteAttachment(det).then(data=>{
        console.log(data)
        res.send(data)
    })
});
module.exports = router