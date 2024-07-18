var express = require('express');
var router = express.Router();
var taskData = require('../apiData')
const taskController = require("../controller/taskController")

router.get('/', function (req, res, next) {
    res.send('respponse with resorce')
});



router.get('/tasks', (req, res) => {
    dataStore.loadData((err, data) => {
        if (err) {
            return res.status(500).send("Internal Error")
        }
        res.send(data)
    })
})



router.post('/tasks', function (req, res) {

    taskData = req.body
    const validationError = taskController.validateTask(taskData)
    if (validationError) {
        return res.status(400).send(validationError)
    }

    taskController.addTask(taskData, (err) => {
        if (err) {
            return res.status(500).send("Internal Server error")
        }
        res.status(200).send("Task stored successfully")
    })

})

router.get('/tasks/:id', (req, res) => {
    let Id = req.params.id
    taskController.getTaskById(Id, (err, data) => {
        res.send(data)
    })

})

router.put('/tasks/:id', (req, res) => {
    let Id = req.params.id;
    const { title, description, completed, priority } = req.body;
    let updatedTask = req.body

      if (isNaN(Id)) {
        return res.status(400).json({ error: "Invalid task id" });
      }

      const validationError = taskController.validateTask(updatedTask)
      if (validationError) {
          return res.status(400).send(validationError)
      }

      
    taskController.updateTask(Id, updatedTask,(err,data)=>{

       return res.send(data)
    })
})

   
  
  
  


module.exports = router