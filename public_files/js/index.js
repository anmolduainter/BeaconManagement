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
        console.log(res)
    })
}
