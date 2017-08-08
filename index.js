var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Tweets Search Engine' });
});
/* GET Userlist page. */
var global2;
router.post('/userlist', function(req, res) {
    var db = req.db;
     var userName = req.body.username;
     global2=userName;
    var collection = db.get('tweets');
    console.log(global2);
    collection.find({'text' : new RegExp(userName,"i")},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs, global2
        });
    });
});
/* Renders search form */
var global;
router.get('/comments/:id', function(req, res) {
     var db =req.db;
    console.log("Fetching data based on the id");
     var collection =db.get('tweets');
     var userID=parseInt(req.params.id);
     global=userID;
     console.log(userID);
    collection.find({'id': userID},function(e,docs){
        console.log(docs.length);
        res.render('comments', { "title": "User" , "docs" : docs });
     });
});
/* POST to Add User Service */
router.post('/comments', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    console.log("Posting comment to particular ID");

    // Set our collection
    var collection = db.get('tweets');
    var userID = parseInt(global);
    var userComment=req.body.Comment;
    console.log(userID + "  " + userComment);
    // var type=typeof(userID);
    // console.log("Type of ID passed:"+type+"and Value:"+userID);
    // console.log(userComment);

    var query={"id":userID};
    var query1={"$set":{"comment":userComment}};

    

    // Submit to the DB
    collection.update(query,query1, false, false, function(err){
        res.redirect("/comments");
    });
        res.redirect("/"); 
    });
    


module.exports = router;
