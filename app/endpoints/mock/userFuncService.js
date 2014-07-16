
module.exports = function(request, response,grunt) {
	response.end(JSON.stringify(getRequestData(request)));
}