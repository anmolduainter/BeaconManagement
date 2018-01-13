$(function(){
    let deact =$('.deactivate')
    let act = $('.activate')
    let info = $('.moreInfo')

    // Will do at last
     let decom = $('.decommissioned')
     act.click(activate)
     deact.click(deactivate)
    info.click(moreInfo)


});

function deactivate(eve){
    let id = $(this).parent().parent().attr('id')
    let query = {beaconName : id}
    console.log(id)
     console.log("clicked")
    $.post('/deactivate',query,(res)=>{
        console.log(res)
        if(res=="success"){
            console.log("Okay")
            location.reload()
        }
        else{
            console.log(" Not Okay")
            location.reload()
        }
    })
}
function activate(eve) {
    let id = $(this).parent().parent().attr('id')
    let query = {beaconName : id}
    console.log(id)
    console.log("clicked")
    $.post('/activate',query,(res)=>{
        if(res=="success"){
            console.log("Okay")
            location.reload()
        }
        else{
            console.log(" Not Okay")
            location.reload()
        }
    })
}

function moreInfo(eve){
    let id = $(this).parent().parent().attr('id')
    let query = {beaconName: id}
    console.log(id)
    $.post('/getInfo',query,(res)=>{
        //console.log(res)
        console.log(res)
        let container = $(this).parent().parent();
        container.empty();
        let body = `
            <div class="row">
                <div class="col">
                    <br>
                    <h6>Beacon Name : <span>${res.data.beaconName}</span></h6>
                    <br>
                    <h6>Advertised ID : <span>${res.data.advertisedId.id}</span></h6>
                    <br>
                    <h6>Advertised Type : <span>${res.data.advertisedId.type}</span></h6>
                    <br>
                    <h6>Place ID : <span>${res.data.placeId}</span></h6>
                    <br>
                    <h6>Latitude : <span>${res.data.latLng.latitude}</span></h6>
                    <br>
                    <h6>Longitude : <span>${res.data.latLng.longitude}</span></h6>
                    <br>
                    <h6>ExpectedStability : <span>${res.data.expectedStability}</span></h6>
                    <br>
                    <h6>Position : <span>${res.data.properties.position}</span></h6>
                </div>
                <div class="col">
                    <h5>Status : <span>${res.data.status}</span></h5>
                </div>
            </div>        
        `

        container.append(body)

    })}

// <div class="col">
//     <h5>Attachments</h5>
//     <br>
//     <br>
//     <h6>Name : <span>${res.attachment.attachments[0].attachmentName}</span></h6>
// <br>
// <br>
// <h6>Data : <span>${res.attachment.attachments[0].data}</span></h6>
// </div>
