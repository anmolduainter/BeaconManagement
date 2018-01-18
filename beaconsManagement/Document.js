
let register = function (det,db) {
    return new Promise((resolve)=>{
        const collection = db.collection('BM')
        collection.insertOne(det).then((result)=>{
            console.log("INSERT-------------------")
            console.log(result)
            resolve(result)
        })
    })
};

let removeOne = function(det , db){
    return new Promise((resolve)=>{
        const collection = db.collection('BM')
        collection.deleteOne(det).then((result)=>{
            console.log("DELETE -------------------")
            console.log(result)
            resolve(result)
        })
    })
}

module.exports.reg = register;
module.exports.removeOne = removeOne