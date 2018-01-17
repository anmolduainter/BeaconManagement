$(function () {

    let adType = $('#adType')
    let adId = $('#ad')
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
        let det={
            adType: adType.val(),
            adid: adId.val(),
            status: status.val(),
            placeId: placeId.val(),
            lat: lat.val(),
            lon: lon.val(),
            name: name.val(),
            eS: eS.val(),
            desc: des.val(),
            prop: prop.val()
        }

        $.post('/register',det,(res)=>{

        })
    })
});