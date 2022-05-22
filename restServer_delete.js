const http = require('http');
var queryString = require('querystring');
var data;

http.createServer((req,res)=>{
    if(req.method == 'PUT'){
        req.on('data', function(chunk){
            var temp = queryString.parse(chunk.toString());
            if(!data){
                console.log("initial data...");
                data = temp;
            }
            else{
                if(temp.name == undefined && temp.number != undefined){
                    data.number = temp.number;
                }
                else if(temp.name != undefined && temp.number == undefined){
                    data.name = temp.name;                    
                }
                else{
                    data = temp;
                }
            }
            console.log("name: " + "%s" + "\nnumber: " + "%d",data.name, data.number);
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end('name : ' + data.name + '\nstudent number : ' + data.number);
        });
    }

    if(req.method == 'DELETE'){
        req.on('data', function(chunk){
            var temp = queryString.parse(chunk.toString());
            /* when no data but deleting someting, do nothing and print message */
            if(!data){
                console.log("no data to delete...");
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.end("no data to delete...");
            }
            /* partition the case for when not all data is requested to delete*/
            /* when client requests the data that doesn't exist, print error on console */
            else{
                if(temp.name == undefined && temp.number != undefined){
                    if(data.number == temp.number){
                        data.number = undefined;
                    }
                    else{
                        console.log("wrong number...");
                    }
                }
                else if(temp.name != undefined && temp.number == undefined){
                    if(data.name == temp.name){
                        data.name = undefined;
                    }
                    else{
                        console.log("wrong name...");
                    }                    
                }
                else{
                    if((data.name == temp.name) && (data.number == temp.number)){
                        data.name = undefined;
                        data.number = undefined;
                    }
                    else{
                        console.log("wrong name and number...");
                    }
                }
                console.log("name: " + "%s" + "\nnumber: " + "%d",data.name, data.number);
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.end('name : ' + data.name + '\nstudent number : ' + data.number);
            }
        });
    }

}).listen(8080, function(){
    console.log('waiting on 8080.'); 
});