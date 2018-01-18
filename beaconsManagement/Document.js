
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

let removeAll = function (db) {
    return new Promise((resolve)=>{
        db.collection('BM').deleteMany({},function (err,result) {
            resolve(result)
        });
    })
}

let getAll = function (db) {
    return new Promise((resolve)=>{
        db.collection('BM').find({}).toArray((err,data)=>{
            resolve(data)
        })
    })
}

module.exports.reg = register;
module.exports.removeOne = removeOne
module.exports.removeAll = removeAll
module.exports.getAll = getAll