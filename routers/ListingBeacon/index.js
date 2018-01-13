const router = require('express').Router();
const beacon = require('../../beaconsManagement/beacons')
const isUndefined = require("is-undefined");
router.get('/',(req,res)=>{
    console.log("List : " + isUndefined(req.session["tokens"]))
    if (!isUndefined(req.session["tokens"])) {
        let det = {
            q: '',
            pT: '',
            pS: '10',
            projectId: 'neural-myth-191906',
            token: req.session["tokens"].access_token
        }
        beacon.listBeacons(det).then((data) => {
         //   console.log(data)
            let data1 = JSON.parse(data)
            console.log(data1)
            let allBeacons = data1.beacons;
            let totalCount = data1.totalCount;
            console.log(allBeacons)
            console.log(totalCount)
            res.render('index',{listingbeacon:true,allBeacons:allBeacons,tC:totalCount,loggedIn:true})
        })
    }
});
module.exports = router