$(function () {

    let adType = $('#adType')
    let adId = $('#adid')
    let placeId = $('#Place-Id')
    let lat = $('#lat')
    let lon = $('#lon')
    let eS = $('#ES')
    let status = $('#status')
    let name = $('#name')
    let desc = $('#Desc')
    let prop = $('#Prop')
    let btn = $('#register')

    let loader = $('#loader')

    loader.hide()

    let a = localStorage.getItem("InfoMap")
    console.log(a)
        let j = JSON.parse(a)
        console.log(j)
        placeId.val(j.placeId)
        lat.val(j.location.lat)
        lon.val(j.location.lng)

    btn.click(function () {
        let det={
            adType: adType.val(),
            adid: adId.val(),
            status: status.val(),
            placeId: placeId.val(),
            lat: lat.val(),
            lon: lon.val(),
            name: name.val(),
            eS: eS.val(),
            desc: desc.val(),
            prop: prop.val()
        }

        // let det={
        //     adType: "EDDYSTONE",
        //     adid: "ILOVEMYINDIA1234",
        //     status: "ACTIVE",
        //     placeId:"ChIJTxax6NoSkFQRWPvFXI1LypQ",
        //     lat: "47.6693771",
        //     lon: "47.6693771",
        //     name: "1",
        //     eS: "STABLE",
        //     desc: "My own reg beacon",
        //     prop: "enteryway"
        // };

        loader.show()

        $.post('/regBeacon',det,(res)=>{
            console.log(res);
            loader.hide()
            if (res === "ERROR"){
                alert("Something went wrong , Please check your details")
            }
            else{
                window.location=document.referrer;
            }
        })
    })
});