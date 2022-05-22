const http = require('http');
var queryString = require('querystring');
var data;

http.createServer((req,res)=>{
 // Write your own codes
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
            if(!data){
                console.log("no data to delete...");
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.end("no data to delete...");
            }
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
        /*
            first put, no data
        */
        });
    }

}).listen(8080, function(){
    console.log('waiting on 8080.'); 
});

/*
    1. put으로 데이터입력
    2. delete
        delete할 데이터가 남아 있는지
        1. delete할 데이터를 올바르게 입력
            delete할 데이터를 undefined로 변경
            1. name만 delete 
                조건문: 1.name만 입력되었는지
                    내부 조건문. 올바르게 입력되었는지
            2. number만 delete
                    올바르게 입력되었는지
            3. both delete           
                    둘 중 하나라도 다른 게 있는지



*/