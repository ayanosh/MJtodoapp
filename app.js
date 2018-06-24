var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
// var morgan = require('morgan')

var tasks = require('./routes/tasks');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

connection = mysql.createConnection({
  host        : 'localhost',
  user        : 'root',
  password    : 'mayankjoshi',
  database    : 'todoappmj'
})

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected");
})

app.get("/getTasks", tasks.getTask);
app.post("/addTasks", tasks.addTask);
app.put("/updateTasks", tasks.updateTask);
app.delete("/deleteTasks", tasks.deleteTask);



app.locals.title = "MY APPS";

app.listen(3000);
