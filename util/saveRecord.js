var dbConnect=require('./dbConnect.js')
var MongoClient=require('mongodb').MongoClient

var saveRecord=function(db,record,update,cb){
	db.collection('fbusers').update(record,update,{upsert:true},function(err,doc){
		if (err){
			 cb(err,null)
		} else {
			 cb(null,"Record saved successfully")
		}
	})
}

module.exports=saveRecord