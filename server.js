const express =require('express')
const mongoose =require('mongoose')
const app =express()
const port = 5000
const person = require("./models/personSchema")
app.use(express.json())
//app.use('/',require("./routes/userRoutes.js"));


//connect to mongoDB user: saidahmed2210   password:sa79440677    collection:myFirstDatabase
const dbURI="mongodb+srv://saidahmed2210:<sa79440677>@mongosaid.dwskb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log("connected"))
.catch((err) => console.log(err));

//create array
const arrayOfPeople = [
    {name: "walid",
      age: 49,
      favoriteFoods: ["magloub", "marka", "burritos"], },
    {name: "wael",
      age: 65,
      favoriteFoods: ["magloub", "chorba", "burritos"],},
    { name: "sihem", age: 21, favoriteFoods: ["ijamargez", "pizaa"] },
    { name: "Maha", age: 33, favoriteFoods: ["ijamargez", "omllet", "burritos"] },
    { name: "Mohamed", age: 19, favoriteFoods: ["ijamargez", "pizaa"] },
    { name: "ali", age: 6, favoriteFoods: ["ijamargez", "pizaa", "burritos"] },
  ];

  //create and save
  app.get("/addOnePerson",(req, res)=>{
    const person =new Person({
        name:"name",
        age:150,
        favoriteFoods: ["food1","food2","food3"],
    });
    person.save()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err));
  });

  //create Many records
  app.get("/addManyPeople", (req, res)=>{
    Person.create(arrayOfPeopl)
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err));
  });

  //display all
  app.get("/all", (req, res)=>{
    Person.find()
    .then((result)=> res.send(result))
    .catch((err)=>console.log(err))
  });

  //display with aspecific name
  app.get("/person/:name", (req, res)=>{
    Person.find({name: req.params.name})
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
  });

  //find one person (favoritefood)
  app.get("/foods/:food", (req, res)=>{
    const food=req.params.food;
    Person.findOne({favoriteFoods:food})
    .then((result)=> res.send (result))
    .catch((err)=> console.log(err));
  });

  //find by id
  app.get("/person/id/:id", (req, res)=>{
    const personId = req.params.id;
    Person.findById({_id:personId})
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err));
  });

  //find person and update()
  app.get("/updates", function (req, res){
    const personName = {name: "walid"};
    const update = {age:20};
    mongoose.set("useFindAndModify",false);
    Person.findOneAndUpdate(personName,update, {new:true})
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
  });

  //delete many
  app.get("/remove/:name", function (req, res) {
    Person.find({ name: req.params.name })
      .remove()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  });

  //search query
  app.get("/foods-burritos", function (req, res) {
    Person.find({ favoriteFoods: "burritos" }) 
      .limit(2) 
      .sort({ name: 1 }) 
      .select({ name: true, favoriteFoods: true }) 
      .exec() 
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  });


app.listen(port,()=>console.log("listen inport 5000"))