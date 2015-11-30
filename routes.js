var request = require('request')
var dbConnect = require('./util/dbConnect.js')
var saveRecord = require('./util/saveRecord.js')
var readRecord = require('./util/readRecord.js')

module.exports = function(app) {
app.get('/',function(req,res){
	res.sendFile(__dirname+'/views/login.html')
})

app.get('/login',function(req,res){
	res.redirect('https://www.facebook.com/dialog/oauth?scope=public_profile,email&state=/profile&redirect_uri=http://localhost:3000/callback&response_type=code&client_id=186643975012747')
})

app.get('/callback',function(req,res){
	
	
	request('https://graph.facebook.com/v2.5/oauth/access_token?client_id=186643975012747&client_secret=554936659a310b6834594636d2d7ade7&redirect_uri=http://localhost:3000/callback&code='+req.query.code,function(error,response,body){
		body=JSON.parse(body)
		access_token=body.access_token
		request('https://graph.facebook.com/me?fields=id,name,gender,email&access_token='+access_token,function(error,response,body){
				console.log(error)
				body=JSON.parse(body)
				id=body.id
				dbConnect(function(err,db){
					if(err) console.log(err)
					saveRecord(db,{id:id},{$set:{access_token:access_token}},function(err,result){
						if(err) console.log(err)
						else
							{console.log(result)
							res.render('profile.ejs',{user:{id:body.id,name:body.name,email:body.email,gender:body.gender}})
							}
					})
				})
		})

		})	
})

app.get('/profile',function(req,res){
	
		dbConnect(function(err,db){
			readRecord(db,{id:req.query.id},function(err,doc){
				if(err) console.log(err)
				else
					{
						request('https://graph.facebook.com/me?fields=name,gender,email&access_token='+doc.access_token,function(error,response,body){
								body=JSON.parse(body)
								res.render('profile.ejs',{user:{id:body.id,name:body.name,email:body.email,gender:body.gender}})
							})
					}
			})
		})
})
}