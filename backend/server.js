const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 4000;
const todoRoutes = express.Router();

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/tcs-todos', { useNewUrlParser: true });
const connection = mongoose.connection;

todoRoutes.route('/').get(function (req, res) {
  Todo.find(function( err, todos){
    if (err) {
      console.log(err)
    } else {
      res.json(todos)
    }
  })
})

todoRoutes.route('/:id').get(function ( req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo){
    if(err){
      console.log(err)
    } else{
      res.json(todo)
    }
  })
})

todoRoutes.route('/update/:id').post( function (req, res) {
  Todo.findById(req.params.id, function( err, todo){
    if(err){
      res.status(404).send("data is not found");
    }else {
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_description = req.body.todo_description;
      todo.todo_status = req.body.todo_status;

      todo.save().then( todo => {
        res.json('Todo Updated')
      })
      .catch(err => {
        res.status(400).send('Update not possible')
      })
    }
  })
})

todoRoutes.route('/add').post( function( req, res) {
  let todo = new Todo(req.body);  
  todo.save().then( todo => {
    res.status(200).json({'todo': 'todo added successfully'})
  })
  .catch(err => {
    res.status(400).send(' adding new data failed')
  })
})

todoRoutes.route('/delete/:id').delete( function( req, res) {
  Todo.findByIdAndDelete(req.params.id, (err, data)=>{
    if(err){
      res.status(404).send("data is not found");
    } else{
      res.json('Todo deleted')
    }
  })
})

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, function(){
  console.log('Server is running on port '+ port)
})