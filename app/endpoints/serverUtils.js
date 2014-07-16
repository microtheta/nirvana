module.exports = getRequestData = function (request){
	if(request.method === 'GET'){
		url = require('url');
		var url_parts = url.parse(request.url,true);
		var queryParamObj = url_parts.query;
		// Now you have object of querystring
		//  you can use it to manipulate your response
		return queryParamObj;
		response.end(JSON.stringify(queryParamObj));
	}
	else if(request.method === 'POST'){
		var body = '';
		request.on('data',function(data){
			 body += data;
			 if(body.length > 1e6) {
				body = "";
				// FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
				response.writeHead(413, {'Content-Type': 'text/plain'}).end();
				request.connection.destroy();
			}
		});
		request.on('end', function () {
			POST = JSON.parse(body);
			return POST;
		 response.end(JSON.stringify(POST));
		});
	}
}