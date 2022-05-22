const http = require('http');
var queryString = require('querystring');

http.createServer((req,res)=>{
 // Write your own codes
    if(req.method == 'POST'){
        req.on('data', function(chunk){
            //console.log(chunk.toString());
            var data = queryString.parse(chunk.toString());
            console.log("name: " + "%s" + "\nnumber: " + "%d",data.name, data.number);
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end('name : ' + data.name + '\nstudent number : ' + data.number);
        });
    }
}).listen(8080, function(){
    console.log('server running on 8080.'); 
});

