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
    let diag;
    let input;
    let addAttach;

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
    diag = $('#diag')
    input = $('#textaddAttach')
    addAttach = $('#addAttachment')

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

    let arr = res.attachment;
    let body = ``
    for (let i=0;i<arr.length;i++){
        body=body + `<br><br><h5>Name : <span style="font-weight: 400;font-size: medium">${arr[i].attachmentName}</span></h5>
<br><h5>Data : <span  style="font-weight: 400;font-size: medium">${arr[i].data}</span></h5>
<button class="btn btn-danger deleteAttach pull-right" id="${i}" name="${arr[i].attachmentName}">Delete</button><br><br><hr>`
    }

    attachDiv.append(body)

    let btn = $('.deleteAttach')
    btn.click(deleteAttach)

    let arr1 = JSON.parse(res.diag).diagnostics[0].alerts
    console.log(arr1)
    let body1= ``
    for (let i=0 ; i<arr1.length;i++){
        body1 = body1 + `<br><h6 class="text-center">${arr1[i]}</h6>
<br>`
    }
    diag.append(body1)

    addAttach.click(function () {
        let d = input.val()
        if (d == ""){
            console.log("Empty input")
        }
        else{
            let q = {
                data:d,
                beaconName:res.data.beaconName
            }
            $.post('/setAttach',q,(data)=>{
                console.log("Attachment Done")
                console.log(data)
                res.attachment.push(data)
                localStorage.setItem("BeaconInfo",JSON.stringify(res))
                console.log(data)
                location.reload()
            })
        }
    })
})

function deleteAttach(eve){
    let id = $(this).attr('id')
    let name = $(this).attr('name')
    console.log(id)
    console.log(name)
    let det={
        attachName:name
    }
    $.post('/deleteAttach',det,(res)=>{
        console.log(res)
        let arr = JSON.parse(localStorage.getItem("BeaconInfo"))
        arr.attachment.splice(id,1)
        console.log(arr)
        localStorage.setItem("BeaconInfo",JSON.stringify(arr))
        location.reload()
    })
}