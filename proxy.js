const cors = require('cors');
const express = require('express');
const request = require('request');
const app = express();
app.use(cors());

const port = Number(process.env.PORT || 8080);
const apiServerHost = (process.env.ELASTICSEARCH_URL || 'http://127.0.0.1:9200');
const user = process.env.ELASTIC_USER;
const password = process.env.ELASTIC_PASSWORD;
const auth = 'Basic ' + new Buffer.from(`${user}:${password}`).toString('base64');

const pipeRequest = (req, res) => {
	req.pipe(request({
		url: apiServerHost + req.url,
		headers: {
			'Authorization': auth,
			'accept-encoding': 'none'
		},
		rejectUnauthorized: false,
	}, function(err, res, body) {
	})).pipe(res);
}

app.get('/ping', (req, res) => {
	res.status(200).send({
		body: {
			status: 'success',
			result: 'Proxy alive'
		}
	})
});

app.post('/:index/_search', (req, res, body) => {
	pipeRequest(req, res);
});

app.post('/:index/_msearch', (req, res, body) => {
	pipeRequest(req, res);
});

// Server Listen
app.listen(port, function () {
	console.log(`Elastic proxy running in port ${port}`);
});
