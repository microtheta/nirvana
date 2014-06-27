
module.exports = function(request, response,grunt) {
	var file = './app/endpoints/data/userdata.json';
	response.end(grunt.file.read(file))
}