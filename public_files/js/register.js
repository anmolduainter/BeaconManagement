$(function () {

    let adType = $('#adType')
    let adId = $('#adid')
    let placeId = $('#place-id')
    let lat = $('#lat')
    let lon = $('#lon')
    let eS = $('#ES')
    let status = $('#status')
    let name = $('#name')
    let desc = $('#desc')
    let prop = $('#Prop')
    let btn = $('#register')

    btn.click(function () {
        // let det={
        //     adType: adType.val(),
        //     adid: adId.val(),
        //     status: status.val(),
        //     placeId: placeId.val(),
        //     lat: lat.val(),
        //     lon: lon.val(),
        //     name: name.val(),
        //     eS: eS.val(),
        //     desc: desc.val(),
        //     prop: prop.val()
        // }

        let det={
            adType: "EDDYSTONE",
            adid: "ILOVEMYINDIA",
            status: "ACTIVE",
            placeId:"ChIJTxax6NoSkFQRWPvFXI1LypQ",
            lat: "47.6693771",
            lon: "47.6693771",
            name: "1",
            eS: "STABLE",
            desc: "My own reg beacon",
            prop: "enteryway"
        }
        $.post('/regBeacon',det,(res)=>{
            console.log(res)
        })
    })
});