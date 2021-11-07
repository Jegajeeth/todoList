// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var items =["wake up","brush your teeth","have a Coffie"];
var todo=[]
app.use(bodyParser.urlencoded({extended:"true"}))
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/",function(req,res){
  var today = new Date();
  var opt = {
    weekday: "long",
    day: "numeric",
    month: "short"
  }
  var day = today.toLocaleString("en-us",opt);
  res.render("list",{
    tday : day,
    item : items
  });
});

app.post("/",function(req,res){
  if(req.body.button === "work"){
    todo.push(req.body.input);
    res.redirect("/work");
  }else{
    items.push(req.body.input);
    res.redirect("/");
  }
})


app.get("/work",function(req,res){
  res.render("list",{
    tday:"work to do",
    item:todo
  })
})

app.get("/about",function(req,res){
  res.render("about");
})



app.listen(3000,function(){
  console.log("server started at port 3000");
})
