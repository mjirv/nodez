var http = require('http')
var url = require('url')

var port = process.argv[2]

var server = http.createServer(function (req, res) {
	if (req.method=="GET") {
		var requrl = url.parse(req.url, true)
		if(requrl.pathname=='/api/parsetime') {
			var jsonObject = {
				hour: 0,
				minute: 0,
				second: 0
			}
			var date = new Date(Date.parse(requrl.query.iso))

			jsonObject.hour = date.getHours()
			jsonObject.minute = date.getMinutes()
			jsonObject.second = date.getSeconds()
			
			jsonObject = JSON.stringify(jsonObject)
			res.end(jsonObject)
		}
		else if (requrl.pathname=='/api/unixtime') {
			date = Date.parse(requrl.query.iso)
			var jsonObject = {
				unixtime: date
			}
			jsonObject = JSON.stringify(jsonObject)
			res.end(jsonObject)
		}
	}

})

server.listen(port)