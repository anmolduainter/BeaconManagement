$(function(){

    let beaconName;
    let AI;
    let AT;
    let status;
    let Lat;
    let Lon;
    let ES;
    let attachDiv;
    let PI;
    let Pos;

    beaconName = $('#beaconName')
    AI = $('#AI')
    AT = $('#AT')
    status = $('#Sta')
    Lat = $('#Lat')
    Lon = $('#Lon')
    ES = $('#ES')
    PI = $('#PI')
    Pos = $('#POS')
    attachDiv = $('#attachments')

    let res = JSON.parse(localStorage.getItem("BeaconInfo"))
    console.log(res)

    beaconName.text(res.data.beaconName)
    AI.text(res.data.advertisedId.id)
    AT.text(res.data.advertisedId.type)
    status.text(res.data.status)
    Lat.text(res.data.latLng.latitude)
    Lon.text(res.data.latLng.longitude)
    ES.text(res.data.expectedStability)
    PI.text(res.data.placeId)
    Pos.text(res.data.properties.position)

    let arr = res.attachment.attachments;
    let body = ``
    for (let i=0;i<arr.length;i++){
        body=body + `<h5>Name : <span  style="font-weight: 400;font-size: medium">${arr[i].attachmentName}</span></h5>
<br><h5>Data : <span  style="font-weight: 400;font-size: medium">${arr[i].data}</span></h5><br>`
    }

    attachDiv.append(body)

})