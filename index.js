const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')

// create server
const app = express()

// serve our api route (custom talking cow)
app.get('/api/cow/:say', cors(), async(req, res, next) => {
	try{
		const text = req.params.say
		const moo = cowsay.say({text})
		res.json({moo})
	} catch(err){
		next(err)
	}
})

// serve base route that returns hello world cow
app.get('/api/cow/', cors(), async(req, res, next) => {
	try {
		const moo = cowsay.say({text: 'Hello World!' })
		res.json({moo})
	} catch(err){
		next(err)
	}
})

// choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Using ${PORT}`)
})
