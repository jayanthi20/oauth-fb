var dbConnect=require('./dbConnect.js')
var MongoClient=require('mongodb').MongoClient

var saveRecord=function(db,record,cb){
	db.collection('fbusers').findOne(record,{access_token:1,_id:0},function(err,doc){
		if (err){
			 cb(err,null)
		} else {
			console.log('doc'+doc)
			 cb(null,doc)
		}
	})
}

module.exports=saveRecord