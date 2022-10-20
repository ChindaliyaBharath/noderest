let express = require ('express');
let app = express();
// for reading value from dotenv
let dotenv = require('dotenv');
dotenv.config()

// For login purpose
var morgan = require('morgan');
let fs = require('fs');
let port = process.env.PORT || 5466;
let cors = require('cors');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.MongoLive;
let bodyParser = require('body-parser')
let db;

//  middle ware
app.use(morgan('short',{stream:fs.createWriteStream('./app.logs')}));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get('/',(req,res) =>{
    res.send('This is From express db')
})

// List of category collection
app.get('/category',(req,res) =>{
    // res.send('This is From home express app code of bharath')
    db.collection('category').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

// list of account collection
app.get('/account',(req,res) =>{
 let query ={};
 let loginId = Number(req.query.loginId);
 let categoryname = Number(req.query.categoryname);
 if (loginId){
    query = {login_id:loginId}
 }else if (categoryname){
    query = {"categoryTypes.category_id":categoryId}
 }
    db.collection('account').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

// Filters

app.get('/filter/:loginId',(req,res) =>{
    let query = {};
    let loginId = Number(req.params.loginId);
    let categoryId = Number(req.query.categoryId);
    if (categoryId){
        query = {
            "loginTypes.login_id":loginId,
            "categories.category_id":categoryId
        }
    }
    db.collection('account').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
})



// List of account w r t account
app.get('/Mainsubcat',(req,res) =>{
    // res.send('This is From home express app code of bharath')
    db.collection('account').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})
})


// Account card details
app.get('/account/:id',(req,res) =>{
    // let id = mongo.ObjectId(req.params.id)
    let id = Number(req.params.id)
    db.collection('account').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})
    

app.get('/cards/:id',(req,res) =>{
    // res.send('This is From home express app code of bharath')
    db.collection('cards').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})



app.post('/category',(req,res) =>{
console.log(req.body);
db.collection('category').insert(req.body,(err,result) =>{
    if (err) throw err;
    res.send('Account login')
})

})


app.post('/account',(req,res)=>{
    if (Array.isArray(req.body.id)){
        db.collection('account').find(account_id,{$in:req.body.id}).toArray((err,result) =>{
            if(err) throw err;
            res.send(result)
        })     
        
    }else{
            res.send('invalid Password')
        
    }
})


app.get('/account',(req,res) =>{
    let email = req.query.email
    let query = {};
    if (email){
        // query= {email:email}
        query={email}
    }
    db.collection('account').find(query).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})



app.put('/updateaccount/:id',(req,res)=>{
    let aid = Number(req.params.id);
    db.collection('account').updateOne(
        {accountid : aid},
        {
            $set:{
                "status": req.body.status,
                "location_name" : req.body.location_name,
                "date":req.body.date
            }
        },(err,result) => {
            if(err) throw err;
            res.send('account Updated')
        }
    )
})


app.delete('/deleteAccount/:id',(req,res)=> {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('account').deleteOne({_id:Object_id("634edc23e6c125ed9a3af80d")}),(err,result) =>{
        if (err) throw err;
        res.send('account delected')
    }
}) 


// connection with mongo 

MongoClient.connect(mongoUrl,(err,client)=> {
    if(err) console.log(`Error while connecting`);
   db = client.db('hdfc')
    app.listen(port,() => {
        console.log(`Listing to port ${port}`)
    })
})



