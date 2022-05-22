const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{

    /* if request url is finished with /, just response printing "hello node js" */
    if(req.url==="/"){
        res.writeHead(200);
        res.write('Hello Node.js!!');
        res.end();
    }

    /* if request url is finished with '/about', response end with reading html file */
    if(req.url==="/about"){
        res.writeHead(200);
        res.end(fs.readFileSync('about.html'));
    }

    /* when reading html, html request photo, so read photo file from the same directory */
    if(req.url==="/photo"){
        fs.readFile("photo.jpg", function(err, data){
            res.writeHead(200);
            res.write(data);
            res.end();    
        });
    }

}).listen(8080, function(){             // listening on port 8080
    console.log('waiting on 8080.'); 
});
