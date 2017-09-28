"use strict"

let express = require('express');
let app = express();
let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use(express.static(__dirname + "/../client"));

let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

app.get('/studentInfo', (request, response)=>{
  let students = mongoUtil.students();
  students.find().toArray( (err, docs) => {
     console.log(JSON.stringify(docs));
     response.json(docs);
  });

});
app.get('/studentInfo/:enrl_no', (request, response) =>{
    let StudentEnroll = request.params.enrl_no;
    let marks = mongoUtil.students();
    marks.find({enrl_no : StudentEnroll}).limit(1).next((err, doc) =>{
                  if(err){
                    response.sendStatus(400);
 }
         console.log("Student doc", doc);
            response.json(doc);
});
});
app.post('/studentInfo/:enrl_no/marks', jsonParser, (request, response) =>{
	let StudentEnroll = request.params.enrl_no;
    let students = mongoUtil.students();
    let newMarks = request.body.marks || {};
  let query = {enrl_no : StudentEnroll};
  let update = {$push: {marks: newMarks}};

  students.findOneAndUpdate(query, update, (err, res) => {
    if(err){
      response.sendStatus(400);
    }
    response.sendStatus(201);
  });
});
app.post('/studentInfo/new', jsonParser, (request, response)=>{
  let students = mongoUtil.students();
  let newStudent = request.body|| {};
  students.insert(newStudent, (err, doc) => {
      console.log(request.body);
  if(err){
    response.sendStatus(400);
    console.log("Heloo");
  }
  response.json(doc);
})
});
  
app.listen(8181, ()=>{
     console.log("Server is running on port 8181");
});
