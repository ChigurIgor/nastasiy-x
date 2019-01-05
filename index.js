const express = require("express");
const bodyParser= require("body-parser");
const PORT = process.env.PORT || 5000;

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://madcat:masterminde+1@ds153380.mlab.com:53380/nastasiy";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
// создаем объект MongoClient и передаем ему строку подключения









mongoClient.connect(function(err, client){
    const db = client.db("nastasiy");

    const cursor = db.collection("items").find();
        cursor.each(function(err, doc) {

            console.log(doc);

        });
});








const app=express();
// let server = require('http').Server(app);

app.use(bodyParser.json());

const products=[
    {
        id:1,
        name:'phone',
        price:100
    },
    {
        id:2,
        name:'phone2',
        price:200
    },
    {
        id:3,
        name:'phone3',
        price:300
    },
    {
        id:4,
        name:'phone4',
        price:400
    }
];


app.get('/',(req,res)=>res.send("Hi4"));
app.get('/products',(req,res)=>res.json(products));
app.post('/products',(req,res)=>{
    products.push(req.body);
    res.json(req.body);
});
app.put("/products/:id",(req,res)=>{
   const product=products.find(p=>p.id=== +req.params.id);
   const productIndex= products.indexOf(product);
   const newProduct={...product,...req.body};
   products[productIndex]=newProduct;

    createItem(11,"nameph",200);
   res.json({sucsess: true});
});

app.delete("/products/:id",(req,res)=>{
    const product=products.find(p=>p.id=== +req.params.id);
    const productIndex= products.indexOf(product);
    products.splice(productIndex,1);
    res.json({sucsess: true});
});

// server.listen(PORT,()=>console.log("server rabotaet"));
// app.listen(5000,()=> console.log("listening 5000"));
app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});




function createItem(id,name,price){
    mongoClient.connect(function(err, client){
        const db = client.db("nastasiy");

        const collection = db.collection("items");
        let item = {name: "Tom", id:"2", price: 700};
        collection.insertOne(item, function(err, result){

            if(err){
                return console.log(err);
            }
            console.log(result.ops);
            client.close();
        });
    });
}