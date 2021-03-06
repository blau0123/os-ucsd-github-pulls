const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const getAllPRs = require('./pulls.js');

// create server
const app = express()

cache = {}

// serve static files from react frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// get the github api data and check with cache
app.get('/api/data', async function(req, res){
	// if cache was updated > 10 min ago
	if (!cache["data"] || (cache["time"] && (new Date()).getTime() - cache["time"].getTime() > 10 * 60 * 1000)){
		cache["data"] = await getAllPRs();
		cache["time"] = new Date();
		console.log("info was updated!");
	}
	else{
		console.log("no new info!");
	}
	res.send(cache["data"]);
})

// choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`We stan port ${PORT}`)
})
