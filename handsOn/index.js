var mongoose =require('mongoose');
const express =require('express');
const app=express()
const port=3000

var bodyparser =require('body-parser')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));
mongoose.connect('mongodb://localhost/hands_on',{useNewUrlParser:true});
var db =mongoose.connection
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("connected to the database")
});

var kittySchema = new mongoose.Schema({
    name:String,
    uid:Number,
    age:Number,
    family:String,
    friends : [{name:String ,uid:Number}]

})

var Kitten =mongoose.model('Kitten',kittySchema);
app.post('/insertKitty',function(req,res){
    var fluffy=new Kitten({name: req.body.name,age:req.body.age,family:req.body.family,
    friends:[{name:req.body.senderName,uid:req.body.senderUid}]});
    fluffy.save(function(err,fluffy){
        if(err){
            console.error(err)
            return res.send('Error in Inserting Kitten')
        }
        return res.send('Kidden added Successfully')
    })
})
app.listen(port,()=>console.log('Example app listening on port ${port}!'))