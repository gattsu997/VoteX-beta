require('dotenv').config();
var alert = require('alert');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose=require('mongoose');
const voterModel = require("./models/user")
const localStorage = require("localStorage");


//CONNECTION TO MONGO

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err) throw err
    console.log("Connected to mongo")
});


app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/src/index.html");
});

app.use(express.static(__dirname+"/public"));
app.use("/public", express.static(__dirname + "/public"));




//DATA ROUTE TO SEND THE DATA VOTER DETAILS

app.post("/data", (req, res)=>{
    
   voterModel.findOne({vname:req.body.user,vid:req.body.vid}, function (err, docs) {
    if (err){
      res.redirect("/");
        console.log("Does not Exist !!!");
        
    }
    else {

      if(req.body.aname==="admin" && req.body.aid==="000")
      {   console.log(req.body);
        res.redirect("https://cloud.mongodb.com/v2/5f40ad4ef7372007f316883a#/metrics/replicaSet/6390e940f484d21cf8fd8542/explorer/project/voters/find")
      }
      else{
        console.log(req.body.vname+" "+req.body.vid)
      res.redirect("http://localhost:3004/");
      }
        
    }
})
})

//handler for /mongo route   TO SEND THE ADMIN DATA

app.post("/mongo",(req,res)=>{

  if(req.body.aname==="admin"&&req.body.aid==="000")
  {
    console.log("Admin logged in!!!");
    res.redirect("https://cloud.mongodb.com/v2/5f40ad4ef7372007f316883a#/metrics/replicaSet/6390e940f484d21cf8fd8542/explorer/project/voters/find");
  }
  else
    res.redirect("/");
});

//NODEMON IS NOT INSTALLED SO WRITE THE CODE AND RESTART THE SERVER TO SEE THE CHANGES






























module.exports = app;
