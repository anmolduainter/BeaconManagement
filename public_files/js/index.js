let loader;

$(function(){
    let deact =$('.deactivate')
    let act = $('.activate')
    let info = $('.moreInfo')
    loader = $('#loader')
    loader.hide()
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
    loader.show(10)
    $.post('/deactivate',query,(res)=>{
        console.log(res)
        loader.hide(10)
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
    loader.show(10)
    $.post('/activate',query,(res)=>{
        loader.hide(10)
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
    loader.show(10)
    console.log(id)
    $.post('/getInfo',query,(res)=>{
        //console.log(res)
        console.log(res)
        loader.hide(10)
        localStorage.setItem("BeaconInfo",JSON.stringify(res))
        window.location.href = '/info.html'
    })}
