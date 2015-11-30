var app = require('express')()


app.set('view engine', 'ejs');

require('./routes')(app)

app.listen(3000,function()
{
	
	console.log('server started')
})