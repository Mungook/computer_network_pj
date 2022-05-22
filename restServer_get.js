const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    console.log(req.url);

    if(req.url==="/"){
        res.writeHead(200);
        res.write('Hello Node.js!!');
        res.end();
    }

    if(req.url==="/about"){
        res.writeHead(200);
        res.end(fs.readFileSync('about.html'));
        console.log("html loading...");
    }

    if(req.url==="/photo"){
        console.log("photo loading...");
        fs.readFile("photo.jpg", function(err, data){
            res.writeHead(200);
            res.write(data);
            res.end();    
        });
    }

}).listen(8080, function(){
    console.log('server running on 8080.'); 
});
