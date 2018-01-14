const router = require('express').Router()
const beacon = require('../../beaconsManagement/beacons')

router.post('/',(req,res)=>{

    let det={
        token:req.session["tokens"].access_token,
        projectId:'neural-myth-191906',
        adtype:req.body.adType,
        adid:req.body.adid,
        status:req.body.status,
        placeId:req.body.placeId,
        lat:req.body.lat,
        lon:req.body.lon,
        name:req.body.name,
        eS:req.body.eS,
        desc:req.body.desc,
        prop:req.body.prop
    }

    beacon.register(det).then(data=>{
        console.log(data)
        res.send(data)
    })

});

module.exports = router