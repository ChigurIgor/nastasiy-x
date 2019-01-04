const http=require('http');
const PORT = process.env.PORT || 5000;

http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end('<!doctype><html><head><meta charset="utf-8"><title>Osnovy Node.JS</title></head><body><h1>Osnovy node js</h1></body></html>');
}).listen(PORT,()=>console.log("server rabotaet"));