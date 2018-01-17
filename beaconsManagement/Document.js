
let register = function (det,db) {
    return new Promise((resolve)=>{
        const collection = db.collection('BM')
        collection.insertOne(det).then((result)=>{
            resolve(result)
        })
    })
};
module.exports.reg = register;