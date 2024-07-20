var express = require('express');
var router = express.Router();
const taskController = require("../controller/taskController")

// router.put('/tasks/:id',taskController.updateTask)

// router.delete('/tasks/:id',taskController.deleteTask)

router.route('/tasks')
        .get(taskController.getTask)
        .post(taskController.addTask)

router.route('/tasks/:id')
        .get(taskController.getTaskById)
        .put(taskController.updateTask)
        .delete(taskController.deleteTask)
                        

module.exports = router