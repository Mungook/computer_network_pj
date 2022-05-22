const http = require('http');
var queryString = require('querystring');
var data;   // global variable for storing client's data

http.createServer((req,res)=>{
    if(req.method == 'PUT'){
        req.on('data', function(chunk){
            var temp = queryString.parse(chunk.toString()); // temp variable for storing client's request
            /* when the input is initial, the stored data is null, so print the message at console and update data */
            if(!data){
                console.log("initial data...");
                data = temp;
            }
            /* when only one part of the data is requested, only requested part should be updated */
            /* the updating behavior is implemented by the global variable and the temp variable */
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
    
     

}).listen(8080, function(){
    console.log('waiting on 8080.'); 
});