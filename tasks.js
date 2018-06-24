module.exports = {
  getTask,
  addTask,
  deleteTask,
  updateTask
};


function getTask(req,res){
  var createAtDate = req.query.createAtDate;
  var doneAtDate = req.query.doneAtDate;
  var params = [];
  
  sqlQuery = 'SELECT taskId, taskName, isDone FROM tasks WHERE 1=1 '
  
  if(createAtDate && !doneAtDate){
    sqlQuery += ' AND createdAt = ?';
    params.push(createAtDate);
  }
  
  if(doneAtDate && !createAtDate){
    sqlQuery += ' AND doneAt = ?';
    params.push(doneAtDate);
  }
  
  s= connection.query(sqlQuery,params, (err,rows)=>{    
    if(err)throw err;
    if(rows && rows.length>0){
      res.send(rows);
      console.log(rows)
    }else{
      res.send("No Tasks to Display. Enjoy!");
    }
  });  
}

function addTask(req,res){
  
  params=[req.body.taskName];
  sqlQuery = "INSERT INTO tasks (taskName, isDone) values (?)";

  connection.query(sqlQuery, params, (err,result)=>{
    if(err) throw err;
    if(result){
      console.log("INSERT RESULT--->>", result);
      res.send("Successfully Added Task");
    }
  });
}

function deleteTask(req,res){
  var taskId = req.body.taskId;

  sqlQuery = 'DELETE FROM tasks WHERE taskId = ?';
  params = [taskId];

  connection.query(sqlQuery, params, (err,result)=> {
    if(err)throw err;
    if(result){
      console.log("DELETE RESULT---->>>>", result);
      res.send("Successfully Deleted Task");
    }
  })  
}

function updateTask(req,res){
  var taskId = req.body.taskId;
  var taskName = req.body.taskName;
  var isDone = req.body.isDone;

  var params = [];
  var sqlQuery = 'UPDATE tasks set taskId = '+taskId+' ';

  if(taskName){
    sqlQuery += ', taskName = ? ';
    params.push(taskName);   
  }

  if(isDone){
    sqlQuery += ', isDone = ? ';
    params.push(isDone);
  }

  sqlQuery += 'WHERE taskId = ? ';
  params.push(taskId);

  connection.query(sqlQuery, params , (err,result)=>{
    if(err) throw err;
    if(result){
      console.log("UPDATE RESULT----->>>>",result);
      res.send("Successfully Updated Task");
    }
  })

}