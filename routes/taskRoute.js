var express = require('express');
var router = express.Router();
var taskData = require('../apiData')
const taskController = require("../controller/taskController")


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



// router.put('/tasks/:id',taskController.updateTask)

// router.delete('/tasks/:id',taskController.deleteTask)

router.route('/tasks')
        // .get(taskController.loadData)
        .post(taskController.addTask)

router.route('/tasks/:id')
        .get(taskController.getTaskById)
        .put(taskController.updateTask)
        .delete(taskController.deleteTask)
                        

module.exports = router