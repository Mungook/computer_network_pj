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
    
     

}).listen(8080, function(){
    console.log('waiting on 8080.'); 
});


/* 1. nan
        4가지
        1. nan 없는경우
        2. 하나씩 있는 경우
        3. 둘다 nan인 경우
        
    2. nan 없다 = 두 값 다 변경 
    

    if(기존에 no data)
        // if(nan 둘 중 하나라도)
        //    1. nan name
        //    2. nan number
    else -> 바뀐값만 대입
        // if(nan 둘 중 하나라도)
            1. nan name
                name은 예전값, number는 최신값
            2. nan number
                name은 최신값, number는 예전값

    nan 없는 정상 값 입력시
    data = temp 하면 되겟지?
    하고 프린트
    
    
    
    
*/

