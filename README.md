# KECE449 Computer Networks Project1
## 2017171030 전기전자공학부 박문성
### 1. restServer_get.js
```js
if(req.url==="/"){
    res.writeHead(200);
    res.write('Hello Node.js!!');
    res.end();
}
```
if request url is finished with just slash, response with printing "hello node js!!"


```js
if(req.url==="/about"){
    res.writeHead(200);
    res.end(fs.readFileSync('about.html'));
}
```
if request url is finished with '/about', response ends with reading html file


```js
if(req.url==="/photo"){
    fs.readFile("photo.jpg", function(err, data){
        res.writeHead(200);
        res.write(data);
        res.end();    
    });
}
```
when reading the html, html request the photo by url, so read the photo file from the same directory

### 2. about.html
```html
<html>
    <head>
        <title>Munseong Park</title>
        </head>
    <body>
        <h1>Computer Network Project</h1>
        <p>Name: Munseong Park <br>
        Student Number: 2017171030
        </p>
        <img src="/photo" width="400px">
    </body>
</html>
```
rename title, add header, add paragraph and add the photo with width 400px


### 3. restServer_post.js
```js
if(req.method == 'POST'){
		req.on('data', function(chunk){
				var data = queryString.parse(chunk.toString());
				console.log("name: " + "%s" + "\nnumber: " + "%d",data.name, data.number);
				res.writeHead(200, {'Content-Type' : 'text/html'});
				res.end('name : ' + data.name + '\nstudent number : ' + data.number);
		});
}
```
when client requests data, store the parsed data and print at both console and client 

#### POSTMAN screenshot
![image](https://user-images.githubusercontent.com/43840486/169691355-96b71316-9e62-4b2e-924b-6549ce1a3375.png)
requests are conducted by the POSTMAN

### 4. restServer_put.js
the 4, 5 js modules are implemented with POSTMAN
```js
if(req.method == 'PUT'){
  req.on('data', function(chunk){
    var temp = queryString.parse(chunk.toString()); // temp variable for storing client's request
      if(!data){
        console.log("initial data...");
        data = temp;
      }
```
when the input is initial, the stored data is null, so print the message at console and update data

```js
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
```
when only one part of the data is requested, only requested part should be updated
the updating behavior is implemented by the global variable and the temp variable
#### POSTMAN screenshot
![image](https://user-images.githubusercontent.com/43840486/169691896-b04b3726-1835-4224-8076-80c868a2fc5c.png)

### 5. restServer_delete.js
To create the data to delete, add the put module on top of the delete module
```js
if(!data){
  console.log("no data to delete...");
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end("no data to delete...");
}
```
when no data but deleting someting, do nothing and print the message

```js
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
```
partition the case for when not all data is requested to delete
when client requests the data that doesn't exist, print error on console
#### POSTMAN screenshot
![image](https://user-images.githubusercontent.com/43840486/169692089-97107e66-ecc8-4afb-bd97-ccba3d8b5269.png)
