const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
 // Write your own codes
    fs.readFile('./about.html', function(error, data) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(data);
    })
    if(req.url==="/photo"){
        fs.readFile('photo.jpg', function(err, data){
            console.log('picture loading...');
            res.writeHead(200, {'Content-Type' : 'image/jpg'});
            res.write(data);
            res.end();    
        });
    }

;
}).listen(8080, function(){
    console.log('server running on 8080.'); 
});